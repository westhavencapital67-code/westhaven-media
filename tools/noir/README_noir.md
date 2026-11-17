# Westhaven Noir: plantilla de video

Este es el formato oficial desde el 16 nov 2026. Sustituye al formato "Profundidad" (submarino y caricaturesco), que ya no se usa.

Referencia favorita: @c.o.r.e.labs. El toque propio de Westhaven es el **azul rey** (#2346E8 y #5C7BFF).

## Estética

- **Paleta.** Negro profundo (#050507) y blanco hueso (#ECE8E1). Las escenas alternan entre oscuras y claras. El único color de acento es el azul rey: nada de verde, rojo, emojis ni dibujos animados.
- **Personajes.** Wireframes 3D serios: humanoides, piezas de ajedrez, reloj de bolsillo, reloj de arena, velas y ventanas góticas. El buzo es la mascota, sereno y con el ojo de buey azul encendido.
- **Luz.** Rayos volumétricos azules, velas, bloom, viñeta, grano y polvo flotando.
- **Tipografía.**
  - Palabra clave en Cinzel (versalitas romanas) que entra con desenfoque y sale disolviéndose en partículas.
  - Frases secundarias en Cormorant itálica.
  - Subtítulos discretos en Cormorant itálica de 54 px a y=1470, con la palabra actual en blanco y brillo azul.
- **Movimiento.**
  - Todo con aceleración y desaceleración (eIO, eOutExpo).
  - Push-in lento de 3.5 % por escena.
  - Cortes tipo "whip" vertical de 0.32 s con desenfoque de movimiento real (acumulación de 5 subframes) y un destello azul o blanco.
- **Cierre.** Sin logo. Se vuelve a la composición inicial (loop), aparece la frase final en itálica y hay un fundido a negro.
- **Duración.** 50–70 s, con el gancho en los primeros 1–2 s.

## Archivos

| archivo | qué hace |
|---|---|
| `fonts.css` | Cinzel y Cormorant embebidas (base64) |
| `engine.js` | Motor: cámara 3D, lathe/tube, `human()`, `gothicWindow`, `lightRays`, `candle`, `pocketWatch`, KING/PAWN/HOURGLASS, `keyword`, `serifLine`, subtítulos, post y transiciones |
| `scene_noir.html` | Carga el motor y el archivo de escenas indicado en `?s=` |
| `scenes_demo.js` | Ejemplo completo ("El dinero viejo no corre"). Cópialo como `scenes_<tema>.js` para cada video |
| `render_noir.js` | `stills`, `video` (por partes) y `timeline` (exporta cortes y hits para la mezcla) |
| `mix_noir.py` | Voz más música original oscura "slowed" (70 BPM, re menor: pads, piano grave, sub, kick lento, reverb) más SFX: whoosh en cada corte, boom, thud, campana, tic, obturador |

## Reglas técnicas

- No uses `ctx.filter='blur()'` sobre humanoides o piezas 3D: cada línea se desenfoca por separado y el render se congela. Para desvanecer, usa alpha y desplazamiento.
- Las palabras clave se reducen solas hasta 760 px de ancho (zona segura).

## Flujo por video

1. **Guion.** Tono de superación personal y disciplina financiera, frases cortas con pausas. Fórmula: gancho (verdad incómoda) → contraste → 3 definiciones ("Disciplina es…") → giro → cierre en loop que repite la primera frase.
2. **Voz.**
   - Principal: ElevenLabs, voz **"Nestor - Deep Calm Narrator"** con modelo Eleven v4. Empieza el texto con `[calmado] [serio]` y usa `[pausa]` y `[pausa larga]`; la última frase va con `[susurro]`.
   - Respaldo gratuito: Chatterbox con exaggeration 0.3–0.4, usando `voz_referencia_westhaven_narrador.mp3`.
3. **Tiempos.** Corre `ffmpeg -i voz.mp3 -af silencedetect=n=-38dB:d=0.28 -f null -` y anota el inicio y el fin de cada frase.
4. **Escenas.** Copia `scenes_demo.js`, ajusta los tiempos `v(x)` y define:
   - una escena por idea (2–6 s), alternando escenas oscuras y claras;
   - una palabra clave grande por escena;
   - `HITS` y `DROPS`.
5. **Revisión de fotogramas.** `node render_noir.js stills scenes_X.js '[1,4,...]'` y arma una hoja de contacto. Verifica:
   - que ningún texto se encime;
   - que nada quede a menos de 60 px de los bordes;
   - que los subtítulos no tapen al personaje.
6. **Render.** Lanza dos procesos en paralelo, `video scenes_X.js 0 F/2 partA` y `video scenes_X.js F/2 99999 partB`. Luego `concat -c copy`.
7. **Audio.** `node render_noir.js timeline scenes_X.js timeline.json`, después `python3 mix_noir.py voz.mp3 timeline.json mix.wav`.
8. **Exportar.** Mux con `-af "acompressor=threshold=-20dB:ratio=3:attack=5:release=150:makeup=4,alimiter=limit=0.8:level=false,loudnorm=I=-14:TP=-1.5:LRA=11"`, AAC a 192k y `-movflags +faststart`. Sin el compresor queda en −15 LUFS.
9. **QC antes de publicar.**
   - Ningún frame negro salvo el fundido final.
   - −14 LUFS ±1.
   - La duración del video coincide con el audio.
   - La voz se entiende sobre la música.
   - Texto legible en el celular.
   - Sin logo.
