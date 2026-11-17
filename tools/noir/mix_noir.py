# Westhaven Noir mix: voz + música oscura "slowed" original (~70 BPM, re menor) + SFX sincronizados.
# Uso: python3 mix_noir.py voz.mp3 timeline.json salida.wav [--sin-musica]
#   --sin-musica: solo voz + SFX (versión TikTok, para agregar el sonido tendencia desde la app)
#   timeline.json sale de: node render_noir.js timeline scenes_X.js timeline.json
#   (cuts -> whoosh en cada corte, hits -> boom/thud/bell/tick/shutter, drops -> silencia la batería)
import sys, json, subprocess, numpy as np, wave
from scipy.signal import butter, sosfilt, fftconvolve
sr=48000; vpath,tlpath,outp=sys.argv[1:4]; NOMUS='--sin-musica' in sys.argv; TL=json.load(open(tlpath))
T=TL['dur']; N=int(sr*T); t=np.arange(N)/sr; rng=np.random.default_rng(7)
raw=subprocess.run(['ffmpeg','-v','error','-i',vpath,'-ac','1','-ar',str(sr),'-f','s16le','-'],capture_output=True).stdout
vr=np.frombuffer(raw,np.int16).astype(float)/32768; voice=np.zeros(N); o=int(TL['voice_offset']*sr); n=min(len(vr),N-o); voice[o:o+n]=vr[:n]
def lp(x,f,o=2):return sosfilt(butter(o,f,'low',fs=sr,output='sos'),x)
def hp(x,f,o=2):return sosfilt(butter(o,f,'high',fs=sr,output='sos'),x)
def bp(x,a,b):return sosfilt(butter(2,[a,b],'band',fs=sr,output='sos'),x)
def env(n,a,d):x=np.arange(n)/sr;return np.minimum(1,x/max(a,1e-4))*np.exp(-x/d)
def add(buf,sig,at,g=1.):
    i=int(at*sr)
    if i<0 or i>=N:return
    k=min(len(sig),N-i);buf[i:i+k]+=sig[:k]*g
def reverb(x,dur=3.5,wet=.35,pre=.03):
    n=int(sr*dur);ir=rng.standard_normal(n)*np.exp(-np.arange(n)/sr*3/dur*2.3);ir=lp(ir,5000);ir[:int(pre*sr)]=0;ir/=np.sqrt((ir**2).sum())
    return x*(1-wet)+fftconvolve(x,ir)[:len(x)]*wet*2.2
muted=lambda x:any(a<=x<b for a,b in TL['drops'])
# ---------- música ----------
bpm=70;beat=60/bpm;bar=beat*4
mid=lambda m:440*2**((m-69)/12)
CH=[[50,53,57,62],[46,50,53,58],[41,45,48,53],[45,49,52,57]]  # Dm Bb F A
pad=np.zeros(N);keys=np.zeros(N);bass=np.zeros(N);drm=np.zeros(N)
for bi in range(int(T/bar)+1):
    s=bi*bar;ch=CH[bi%4];n=int(sr*(bar+1.5));x=np.arange(n)/sr
    e=np.minimum(1,x/1.2)*np.minimum(1,np.maximum(0,(bar+1.5-x))/1.5)
    sig=np.zeros(n)
    for m in ch:
        for d in(-.08,.08):f=mid(m)*2**(d/12);sig+=2*((x*f+rng.random())%1)-1
    add(pad,sig*e*.06,s)
    f=mid(ch[0]-24);add(bass,(np.sin(2*np.pi*f*x)+.25*np.sin(2*np.pi*2*f*x))*np.minimum(1,x/.05)*np.exp(-x/2.2)*.5,s)
    # piano grave, arpegio lento
    for k,m in enumerate([ch[0]-12,ch[2],ch[3],ch[1]+12]):
        f=mid(m);nn=int(sr*3);xx=np.arange(nn)/sr;tone=sum(np.sin(2*np.pi*f*h*xx)*a*np.exp(-xx*(1.2+h*.8)) for h,a in[(1,1),(2,.4),(3,.18),(4,.08)])
        add(keys,tone*np.minimum(1,xx/.004)*.16,s+k*beat)
pad=lp(pad,900,4)*(.85+.15*np.sin(2*np.pi*t/7))
def kick():n=int(sr*.6);x=np.arange(n)/sr;return np.tanh(np.sin(2*np.pi*np.cumsum(90*np.exp(-x*18)+42)/sr)*np.exp(-x/.28)*1.6)
def snare():n=int(sr*.5);w=rng.standard_normal(n);return reverb(bp(w,180,4500)*env(n,.001,.09),1.6,.5)
def hat():n=int(sr*.08);return hp(rng.standard_normal(n),7000)*env(n,.0005,.02)*.35
b=0.;i=0
while b<T:
    if not muted(b):
        if i%4==0:add(drm,kick(),b,.9)
        if i%8==6:add(drm,kick(),b+beat*.5,.55)
        if i%4==2:add(drm,snare(),b,.55)
        for h in range(2):add(drm,hat(),b+h*beat/2+(.012 if h else 0),.6 if h else .35)
    b+=beat;i+=1
mus=reverb(pad+keys,4.,.45)+bass+drm*.85
# vinyl/room tone
mus+=lp(rng.standard_normal(N),2500)*.006
# ---------- SFX ----------
sfx=np.zeros(N)
def whoosh(d=.55):
    n=int(sr*d);x=np.linspace(0,1,n);w=rng.standard_normal(n);f=np.geomspace(300,3500,n)
    y=np.concatenate([bp(w[i:i+2400],max(60,f[i]*.6),min(sr/2-100,f[i]*1.4)) for i in range(0,n,2400)])[:n]
    return y*np.sin(np.pi*x)**2*3
def boom():n=int(sr*2.5);x=np.arange(n)/sr;return reverb(np.tanh(np.sin(2*np.pi*np.cumsum(55*np.exp(-x*2)+32)/sr)*np.exp(-x/.9)*2)*.9+lp(rng.standard_normal(n),400)*env(n,.002,.3)*.6,3,.4)
def thud():n=int(sr*.8);x=np.arange(n)/sr;return np.sin(2*np.pi*np.cumsum(80*np.exp(-x*10)+40)/sr)*env(n,.001,.18)+lp(rng.standard_normal(n),1500)*env(n,.0005,.04)*.5
def bell():n=int(sr*4);x=np.arange(n)/sr;f=mid(74);return reverb(sum(np.sin(2*np.pi*f*r*x)*a*np.exp(-x*dk) for r,a,dk in[(1,1,.7),(2.76,.4,1.6),(5.4,.2,3),(.5,.3,.5)])*.5,4,.5)
def tick():n=int(sr*.06);return hp(rng.standard_normal(n),3000)*env(n,.0002,.006)+np.sin(2*np.pi*3200*np.arange(n)/sr)*env(n,.0002,.008)*.4
def shutter():n=int(sr*.25);w=hp(rng.standard_normal(n),1500);e=env(n,.0005,.012);e2=np.roll(env(n,.0005,.02),int(.07*sr));return w*(e+e2)*.9
FX={'boom':(boom,.55),'thud':(thud,.8),'bell':(bell,.35),'tick':(tick,.6),'shutter':(shutter,.8)}
for c in TL['cuts']:add(sfx,whoosh(),c-.3,.33)
for at,k in TL['hits']:f,g=FX[k];add(sfx,f(),at,g)
# ---------- mezcla ----------
ve=np.sqrt(np.convolve(voice**2,np.ones(4800)/4800,'same'));duck=1-.5*np.clip(ve/.04,0,1)
fade=np.minimum(1,t/.15)*np.minimum(1,np.maximum(0,T-t)/2.2)
mix=(voice*1.0+(0 if NOMUS else 1)*mus*.33*duck+sfx*.42)*fade
mix=np.tanh(mix*1.2)/np.tanh(1.2);mix/=np.max(np.abs(mix))*1.08
d=(mix*32767).astype(np.int16);w=wave.open(outp,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes(np.stack([d,d],1).tobytes());w.close()
print('ok',outp,T)
