#!/usr/bin/env python3
"""Analiza el audio (y los cortes) de un video corto, sin servicios de paga.

Uso: python3 analizar_audio.py video.mp4 [--json salida.json]

Mide:
- BPM y regularidad del beat de la música
- Curva de energía (volumen) por segundo y dónde están los "drops"
- Cuánto tiempo hay voz hablando vs. solo música/silencio, y ritmo de la voz (sílabas/seg aprox.)
- Brillo del sonido (centroide espectral) y presencia de graves
- Cortes de imagen (cambios de escena) y qué tanto caen sobre el beat
No transcribe letras ni identifica canciones: el nombre del sonido se toma de la página del video.
"""
import json, subprocess, sys, tempfile, os
import numpy as np
from scipy import signal

SR = 22050

def load_audio(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768

def stft_mag(x, n=2048, hop=512):
    f, t, Z = signal.stft(x, SR, nperseg=n, noverlap=n - hop, boundary=None)
    return f, t, np.abs(Z)

def tempo(onset, hop_t):
    o = onset - onset.mean()
    ac = np.correlate(o, o, 'full')[len(o) - 1:]
    lags = np.arange(len(ac)) * hop_t
    valid = (lags >= 60 / 200) & (lags <= 60 / 60)
    if not valid.any():
        return None, 0.0
    i = np.argmax(np.where(valid, ac, -np.inf))
    bpm = 60 / lags[i]
    strength = float(ac[i] / (ac[0] + 1e-9))
    # preferir rango 80-170 típico de redes
    while bpm < 80: bpm *= 2
    while bpm > 170: bpm /= 2
    return round(bpm, 1), round(strength, 3)

def scene_cuts(path):
    r = subprocess.run(['ffmpeg', '-v', 'info', '-i', path, '-vf', "select='gt(scene,0.30)',showinfo", '-an', '-f', 'null', '-'],
                       capture_output=True, text=True)
    cuts = []
    for line in r.stderr.splitlines():
        if 'pts_time:' in line:
            try: cuts.append(float(line.split('pts_time:')[1].split()[0]))
            except Exception: pass
    return cuts

def main():
    path = sys.argv[1]
    x = load_audio(path)
    dur = len(x) / SR
    f, t, M = stft_mag(x)
    hop_t = t[1] - t[0]
    # energía por segundo (dB)
    sec = int(dur)
    rms = [20 * np.log10(np.sqrt(np.mean(x[i * SR:(i + 1) * SR] ** 2)) + 1e-9) for i in range(max(sec, 1))]
    # onset (flujo espectral) -> beat
    flux = np.maximum(0, np.diff(M, axis=1)).sum(0)
    flux = np.convolve(flux, np.ones(3) / 3, 'same')
    bpm, beat_strength = tempo(flux, hop_t)
    # voz: energía en banda 300-3400 Hz con modulación silábica 3-8 Hz
    band = (f >= 300) & (f <= 3400)
    venv = M[band].sum(0)
    venv = venv / (venv.max() + 1e-9)
    b, a = signal.butter(2, [2.5 / (0.5 / hop_t), 9 / (0.5 / hop_t)], 'band')
    mod = signal.filtfilt(b, a, venv) if len(venv) > 20 else venv
    win = int(1 / hop_t)
    voice_frames = []
    for i in range(0, len(mod) - win, win):
        seg = mod[i:i + win]
        voice_frames.append(float(np.std(seg)) > 0.04)
    voz_pct = round(100 * np.mean(voice_frames), 1) if voice_frames else 0
    peaks, _ = signal.find_peaks(mod, height=0.03, distance=int(0.12 / hop_t))
    voz_seg = max(1e-9, sum(voice_frames))
    silabas_seg = round(len(peaks) / voz_seg, 2)
    # brillo y graves
    cent = float((f[:, None] * M).sum(0).mean() / (M.sum(0).mean() + 1e-9))
    graves = float(M[f < 150].sum() / (M.sum() + 1e-9))
    # drops: subidas de energía > 6 dB de un segundo a otro
    drops = [i for i in range(1, len(rms)) if rms[i] - rms[i - 1] > 6]
    # cortes vs beat
    cuts = scene_cuts(path)
    sync = None
    if bpm and cuts:
        period = 60 / bpm
        beat_times = t[signal.find_peaks(flux, distance=max(1, int(period * 0.7 / hop_t)))[0]]
        if len(beat_times):
            d = [min(abs(c - beat_times)) for c in cuts]
            sync = round(100 * np.mean(np.array(d) < 0.08), 1)
    out = {
        'duracion_s': round(dur, 1),
        'bpm_musica': bpm, 'fuerza_beat_0a1': beat_strength,
        'voz_hablando_pct': voz_pct, 'silabas_por_seg_aprox': silabas_seg,
        'volumen_db_por_segundo': [round(v, 1) for v in rms],
        'drops_de_energia_seg': drops,
        'centroide_espectral_hz': round(cent), 'proporcion_graves': round(graves, 3),
        'cortes_de_escena_seg': [round(c, 2) for c in cuts], 'cortes_por_minuto': round(60 * len(cuts) / max(dur, 1), 1),
        'cortes_sobre_el_beat_pct': sync,
    }
    js = json.dumps(out, ensure_ascii=False, indent=1, default=float)
    if '--json' in sys.argv:
        open(sys.argv[sys.argv.index('--json') + 1], 'w').write(js)
    print(js)

if __name__ == '__main__':
    main()
