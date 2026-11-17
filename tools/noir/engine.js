// ===================== WESTHAVEN NOIR ENGINE =====================
// Estética: negro profundo / blanco hueso, acento azul rey, wireframes 3D serios, luces volumétricas, bloom, grano.
const W=1080,H=1920;const cv=document.getElementById('c');const ctx=cv.getContext('2d');
const BLUE='#2346E8',BLUE2='#5C7BFF',BONE='#ECE8E1',INK='#F2F0EC',CHAR='#16161A',BLK='#050507';
const SERIF="'Cormorant', serif",CAPS="'Cinzel', serif",MONO='"DejaVu Sans Mono", monospace';
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),lerp=(a,b,t)=>a+(b-a)*t,prog=(t,a,b)=>clamp((t-a)/(b-a));
const eIO=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2, eOut=t=>1-Math.pow(1-t,3), eIn=t=>t*t*t;
const eOutExpo=t=>t>=1?1:1-Math.pow(2,-10*t), eInExpo=t=>t<=0?0:Math.pow(2,10*t-10);
const vis=(t,a,b,fi=.35,fo=.35)=>Math.min(eIO(prog(t,a,a+fi)),eIO(1-prog(t,b-fo,b)));
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function off(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}

// ---------- theme ----------
let TH={bg:BLK,line:'rgba(235,235,240,.85)',dim:'rgba(235,235,240,.25)',fill:'rgba(10,10,14,.92)',txt:INK,dark:true};
function setTheme(dark){TH=dark?{bg:BLK,line:'rgba(232,232,238,.9)',dim:'rgba(232,232,238,.22)',fill:'rgba(8,8,11,.94)',txt:INK,dark:true}
  :{bg:BONE,line:'rgba(22,22,26,.85)',dim:'rgba(22,22,26,.18)',fill:'rgba(236,232,225,.96)',txt:CHAR,dark:false}}

// ---------- 3D ----------
let CAM={yaw:0,pitch:.08,dist:4.2,f:1500,cx:W/2,cy:H*.5,scale:1};
function P(x,y,z){const cy=Math.cos(CAM.yaw),sy=Math.sin(CAM.yaw);let X=x*cy+z*sy,Z=-x*sy+z*cy;const cp=Math.cos(CAM.pitch),sp=Math.sin(CAM.pitch);let Y=y*cp-Z*sp;Z=y*sp+Z*cp;
  const d=CAM.dist+Z;const k=CAM.f/d*CAM.scale;return [CAM.cx+X*k,CAM.cy-Y*k,d]}
function poly(pts,close){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));if(close)ctx.closePath()}
// lathe: profile [[r,y],...]; draws rings + meridians, back half dimmer
function lathe(prof,ox,oy,oz,o={}){const seg=o.seg||40,mer=o.mer??12,lw=o.lw||2;
  if(o.fill){ctx.fillStyle=o.fill;for(let i=0;i<prof.length-1;i++){const pts=[];for(let k=0;k<=seg;k++){const a=k/seg*Math.PI*2;pts.push(P(ox+prof[i][0]*Math.cos(a),oy+prof[i][1],oz+prof[i][0]*Math.sin(a)))}
    for(let k=seg;k>=0;k--){const a=k/seg*Math.PI*2;pts.push(P(ox+prof[i+1][0]*Math.cos(a),oy+prof[i+1][1],oz+prof[i+1][0]*Math.sin(a)))}poly(pts,1);ctx.fill()}}
  ctx.lineWidth=lw;ctx.strokeStyle=o.col||TH.line;
  for(const [r,y] of prof){if(r<.002)continue;const pts=[];for(let k=0;k<=seg;k++){const a=k/seg*Math.PI*2;pts.push(P(ox+r*Math.cos(a),oy+y,oz+r*Math.sin(a)))}poly(pts);ctx.stroke()}
  for(let m=0;m<mer;m++){const a=m/mer*Math.PI*2+(o.rot||0);const pts=prof.map(([r,y])=>P(ox+r*Math.cos(a),oy+y,oz+r*Math.sin(a)));const z=pts.reduce((s,p)=>s+p[2],0)/pts.length;ctx.globalAlpha*=z>CAM.dist?.35:1;poly(pts);ctx.stroke();ctx.globalAlpha/= (z>CAM.dist?.35:1)}}
function sphereProf(r,cy,n=10,cut=0){const p=[];for(let i=0;i<=n;i++){const a=-Math.PI/2+Math.PI*i/n;p.push([r*Math.cos(a),cy+r*Math.sin(a)])}return p}
// tube between two 3D points
function tube(a,b,r0,r1,o={}){const n=o.n||6,seg=o.seg||14;const d=[b[0]-a[0],b[1]-a[1],b[2]-a[2]];const L=Math.hypot(...d);const u=d.map(v=>v/L);
  let t=Math.abs(u[1])<.9?[0,1,0]:[1,0,0];let v1=[u[1]*t[2]-u[2]*t[1],u[2]*t[0]-u[0]*t[2],u[0]*t[1]-u[1]*t[0]];const l1=Math.hypot(...v1);v1=v1.map(x=>x/l1);const v2=[u[1]*v1[2]-u[2]*v1[1],u[2]*v1[0]-u[0]*v1[2],u[0]*v1[1]-u[1]*v1[0]];
  ctx.lineWidth=o.lw||1.6;ctx.strokeStyle=o.col||TH.line;
  for(let i=0;i<=n;i++){const s=i/n,r=lerp(r0,r1,s);const c=[a[0]+d[0]*s,a[1]+d[1]*s,a[2]+d[2]*s];const pts=[];for(let k=0;k<=seg;k++){const q=k/seg*Math.PI*2;pts.push(P(c[0]+(v1[0]*Math.cos(q)+v2[0]*Math.sin(q))*r,c[1]+(v1[1]*Math.cos(q)+v2[1]*Math.sin(q))*r,c[2]+(v1[2]*Math.cos(q)+v2[2]*Math.sin(q))*r))}poly(pts);ctx.stroke()}
  for(let k=0;k<6;k++){const q=k/6*Math.PI*2;const e=(c,r)=>P(c[0]+(v1[0]*Math.cos(q)+v2[0]*Math.sin(q))*r,c[1]+(v1[1]*Math.cos(q)+v2[1]*Math.sin(q))*r,c[2]+(v1[2]*Math.cos(q)+v2[2]*Math.sin(q))*r);const p0=e(a,r0),p1=e(b,r1);ctx.beginPath();ctx.moveTo(p0[0],p0[1]);ctx.lineTo(p1[0],p1[1]);ctx.stroke()}}
// humanoid (meters, feet at y=0). pose: {arm:0..1 raise, step:0..1 walking phase, head:yaw, helmet:bool, kneel}
function human(x,z,o={}){const col=o.col||TH.line,lw=o.lw||1.6,s=o.s||1;const ph=o.step||0;const sw=Math.sin(ph*Math.PI*2)*(o.walk?0.35:0);
  const Y=v=>v*s,X=v=>x+v*s,Z=v=>z+v*s;
  // legs
  for(const sd of[-1,1]){const hip=[X(.1*sd),Y(.92),Z(0)];const knee=[X(.11*sd),Y(.5),Z(sw*sd*.25)];const ank=[X(.11*sd),Y(.06),Z(sw*sd*.35)];tube(hip,knee,.075*s,.055*s,{col,lw});tube(knee,ank,.055*s,.04*s,{col,lw})}
  lathe([[0,.88],[.15,.9],[.16,1.0],[.14,1.12],[.15,1.26],[.19,1.4],[.2,1.46],[.08,1.5],[0,1.5]].map(([r,y])=>[r*s,y*s]),x,0,z,{col,lw,mer:10,seg:28,fill:o.fill});
  for(const sd of[-1,1]){const sh=[X(.2*sd),Y(1.43),Z(0)];const ar=o.arm||0;const el=[X(.25*sd),Y(lerp(1.15,1.45,ar)),Z(-sw*sd*.2+lerp(0,.2,ar))];const wr=[X(.27*sd),Y(lerp(.9,1.7,ar)),Z(-sw*sd*.3+lerp(0,.25,ar))];tube(sh,el,.05*s,.04*s,{col,lw});tube(el,wr,.04*s,.032*s,{col,lw})}
  tube([X(0),Y(1.5),Z(0)],[X(0),Y(1.58),Z(0)],.045*s,.045*s,{col,lw,n:2});
  if(o.helmet){lathe(sphereProf(.17*s,Y(1.74),12),x,0,z,{col,lw,mer:12,seg:30,fill:o.fill,rot:o.head||0});
    // porthole facing camera
    const c=P(X(0),Y(1.74),Z(.17*s));ctx.save();ctx.strokeStyle=o.accent||BLUE;ctx.lineWidth=3;ctx.shadowColor=BLUE2;ctx.shadowBlur=18;ctx.beginPath();ctx.ellipse(c[0],c[1],CAM.f/c[2]*CAM.scale*.085*s,CAM.f/c[2]*CAM.scale*.085*s,0,0,7);ctx.stroke();ctx.restore()}
  else lathe(sphereProf(.115*s,Y(1.7),10),x,0,z,{col,lw,mer:10,seg:26,fill:o.fill,rot:o.head||0})}
// labels like a lab readout
function tag(x,y,txt,a=1,side=1){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=TH.dark?'rgba(232,232,238,.55)':'rgba(22,22,26,.55)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+side*60,y-40);ctx.lineTo(x+side*150,y-40);ctx.stroke();
  ctx.font=`500 22px ${MONO}`;ctx.fillStyle=TH.dark?'rgba(232,232,238,.8)':'rgba(22,22,26,.8)';ctx.textAlign=side>0?'left':'right';ctx.fillText(txt,x+side*156,y-34);ctx.fillStyle=BLUE;ctx.fillRect(x-4,y-4,8,8);ctx.restore()}
// perspective grid floor
function floor(t,y0=1250,a=1,spd=0){ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=TH.dim;ctx.lineWidth=1.4;const vx=W/2,vy=y0-420;
  for(let i=-14;i<=14;i++){ctx.beginPath();ctx.moveTo(vx+i*20,vy+40);ctx.lineTo(vx+i*260,H+200);ctx.stroke()}
  for(let j=0;j<16;j++){const k=((j+t*spd)%16)/16;const y=lerp(vy+40,H+200,Math.pow(k,2.2));ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}ctx.restore()}
// gothic arch window with tracery + volumetric light
function gothicWindow(cx,top,w,h,a=1,glow=1){ctx.save();ctx.globalAlpha*=a;const L=cx-w/2,R=cx+w/2,spring=top+w*.55,bot=top+h;
  const arch=()=>{ctx.beginPath();ctx.moveTo(L,bot);ctx.lineTo(L,spring);ctx.quadraticCurveTo(L,top+w*.08,cx,top);ctx.quadraticCurveTo(R,top+w*.08,R,spring);ctx.lineTo(R,bot);ctx.closePath()};
  if(glow>0){const g=ctx.createLinearGradient(0,top,0,bot);g.addColorStop(0,`rgba(92,123,255,${.55*glow})`);g.addColorStop(1,`rgba(35,70,232,${.18*glow})`);arch();ctx.fillStyle=g;ctx.fill()}
  ctx.strokeStyle=TH.line;ctx.lineWidth=4;arch();ctx.stroke();ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,top);ctx.lineTo(cx,bot);ctx.moveTo(L,spring+40);ctx.lineTo(R,spring+40);ctx.stroke();
  for(const ox of[-w/4,w/4]){ctx.beginPath();ctx.arc(cx+ox,spring-10,w/8,Math.PI,0);ctx.stroke()}ctx.beginPath();ctx.arc(cx,top+w*.33,w/9,0,7);ctx.stroke();ctx.restore()}
function lightRays(cx,top,spread,len,a=1,t=0){if(a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=a;ctx.filter='blur(14px)';
  for(let i=0;i<7;i++){const x=cx+(i-3)*spread/7;const fl=.6+.4*Math.sin(t*.7+i*1.7);const g=ctx.createLinearGradient(0,top,0,top+len);g.addColorStop(0,`rgba(92,123,255,${.16*fl})`);g.addColorStop(1,'rgba(35,70,232,0)');ctx.fillStyle=g;
    ctx.beginPath();ctx.moveTo(x-14,top);ctx.lineTo(x+14,top);ctx.lineTo(x+70+i*12,top+len);ctx.lineTo(x-30+i*12,top+len);ctx.closePath();ctx.fill()}ctx.restore()}
// dust motes
const MOTES=(()=>{const r=rng(3);return Array.from({length:90},()=>({x:r()*W,y:r()*H,s:1+r()*3,p:r()*6,v:.2+r()*.8}))})();
function motes(t,a=1){ctx.save();ctx.fillStyle=TH.dark?'rgba(200,210,255,.55)':'rgba(30,30,40,.35)';for(const m of MOTES){const y=(m.y-t*12*m.v+H*10)%H;const x=m.x+Math.sin(t*.5+m.p)*14;ctx.globalAlpha=a*(.3+.7*Math.abs(Math.sin(t*.8+m.p)));ctx.beginPath();ctx.arc(x,y,m.s,0,7);ctx.fill()}ctx.restore()}
// candle (2D, glowing)
function candle(x,y,s,t,a=1){ctx.save();ctx.globalAlpha*=a;ctx.fillStyle=TH.dark?'#d8d4cc':'#2a2a30';rr(ctx,x-22*s,y-200*s,44*s,200*s,6*s);ctx.fill();
  const fl=1+.08*Math.sin(t*13)+.05*Math.sin(t*7.3);ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(x,y-240*s,2,x,y-240*s,160*s*fl);g.addColorStop(0,'rgba(255,240,210,.9)');g.addColorStop(.15,'rgba(140,160,255,.35)');g.addColorStop(1,'rgba(35,70,232,0)');ctx.fillStyle=g;ctx.fillRect(x-200*s,y-420*s,400*s,400*s);
  ctx.fillStyle='rgba(255,245,225,.95)';ctx.beginPath();ctx.ellipse(x,y-236*s,9*s,24*s*fl,Math.sin(t*3)*.08,0,7);ctx.fill();ctx.restore()}
// pocket watch
function pocketWatch(cx,cy,R,t,a=1,hm=null){ctx.save();ctx.globalAlpha*=a;ctx.strokeStyle=TH.line;ctx.lineWidth=5;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.stroke();ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,R*.9,0,7);ctx.stroke();
  ctx.beginPath();ctx.arc(cx,cy-R-34,26,0,7);ctx.stroke();rr(ctx,cx-16,cy-R-12,32,16,4);ctx.stroke();
  for(let i=0;i<60;i++){const q=i/60*Math.PI*2;const l=i%5?R*.05:R*.11;ctx.lineWidth=i%5?1.5:4;ctx.beginPath();ctx.moveTo(cx+Math.sin(q)*R*.86,cy-Math.cos(q)*R*.86);ctx.lineTo(cx+Math.sin(q)*(R*.86-l),cy-Math.cos(q)*(R*.86-l));ctx.stroke()}
  ctx.font=`600 ${R*.16}px ${CAPS}`;ctx.fillStyle=TH.txt;ctx.textAlign='center';const rn=['XII','III','VI','IX'];for(let i=0;i<4;i++){const q=i*Math.PI/2;ctx.fillText(rn[i],cx+Math.sin(q)*R*.62,cy-Math.cos(q)*R*.62+R*.055)}
  const sec=hm?hm[2]:t,mn=hm?hm[1]:t/60*5+42,hr=hm?hm[0]:10.2;const hand=(ang,len,w,col)=>{ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.sin(ang)*len,cy-Math.cos(ang)*len);ctx.stroke()};
  hand(hr/12*Math.PI*2,R*.45,8,TH.line);hand(mn/60*Math.PI*2,R*.7,5,TH.line);const st=Math.floor(sec)+eOutExpo(clamp((sec%1)*6));ctx.save();ctx.shadowColor=BLUE2;ctx.shadowBlur=14;hand(st/60*Math.PI*2,R*.8,2.5,BLUE);ctx.restore();
  ctx.fillStyle=BLUE;ctx.beginPath();ctx.arc(cx,cy,8,0,7);ctx.fill();ctx.restore()}
// chess pieces (lathe profiles)
const KING=[[0,0],[.38,0],[.38,.06],[.3,.1],[.32,.16],[.22,.22],[.17,.6],[.16,.9],[.24,.96],[.2,1.02],[.16,1.06],[.22,1.18],[.24,1.26],[.12,1.32],[0,1.34]];
const PAWN=[[0,0],[.34,0],[.34,.06],[.26,.1],[.28,.15],[.18,.2],[.12,.5],[.2,.56],[.12,.6],[.2,.68],[.2,.8],[.14,.88],[0,.9]];
const HOURGLASS=[[0,0],[.42,0],[.42,.06],[.3,.08],[.3,.2],[.06,.62],[.3,1.04],[.3,1.16],[.42,1.18],[.42,1.24],[0,1.24]];
function kingCross(ox,oy,oz,s){const a=P(ox,oy+1.34*s,oz),b=P(ox,oy+1.62*s,oz),c=P(ox-.1*s,oy+1.5*s,oz),d=P(ox+.1*s,oy+1.5*s,oz);ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.moveTo(c[0],c[1]);ctx.lineTo(d[0],d[1]);ctx.stroke()}
// keyword with optional particle dissolve
const KCACHE={};function kwPoints(s,size,font){const k=s+size+font;if(KCACHE[k])return KCACHE[k];const c=off(W,400),x=c.getContext('2d');x.font=`${size}px ${font}`;x.textAlign='center';x.fillStyle='#fff';x.letterSpacing='14px';x.fillText(s,W/2,250);const d=x.getImageData(0,0,W,400).data;const pts=[];
  for(let yy=0;yy<400;yy+=4)for(let xx=0;xx<W;xx+=4)if(d[(yy*W+xx)*4+3]>128)pts.push([xx,yy-250]);return KCACHE[k]=pts}
// ancho máximo 760 px (zona segura TikTok: 160 px a la derecha); la palabra se reduce sola si no cabe
const KFIT={};function fitSize(s,size,font,w,ls){const k=s+size+font+w+ls;if(KFIT[k])return KFIT[k];ctx.save();ctx.font=`${w} ${size}px ${font}`;ctx.letterSpacing=ls+'px';const m=ctx.measureText(s).width;ctx.restore();return KFIT[k]=Math.floor(m>760?size*760/m:size)}
function keyword(s,y,t0,t1,t,o={}){if(t<t0-.05||t>t1+1.2)return;const font=o.font||CAPS,size=fitSize(s,o.size||120,font,o.w||600,o.ls??14),col=o.col||(TH.dark?INK:CHAR);const kin=eOut(prog(t,t0,t0+.6));
  ctx.save();ctx.textAlign='center';ctx.font=`${o.w||600} ${size}px ${font}`;ctx.letterSpacing=(o.ls??14)+'px';
  if(t<t1){ctx.globalAlpha=kin*(o.a??1);ctx.filter=`blur(${(1-kin)*18}px)`;if(o.glow){ctx.shadowColor=o.glowCol||BLUE2;ctx.shadowBlur=o.glow}ctx.fillStyle=col;ctx.translate(W/2,y+(1-kin)*30);ctx.scale(lerp(1.08,1,kin),lerp(1.08,1,kin));ctx.fillText(s,0,0)}
  else{const p=prog(t,t1,t1+1.2);const pts=kwPoints(s,size,`${o.w||600} ${font}`);const r=rng(9);ctx.fillStyle=col;if(o.glow){ctx.shadowColor=o.glowCol||BLUE2;ctx.shadowBlur=8}
    for(const q of pts){const dx=(r()-.5)*260,dy=-r()*220-40;const e=eOut(clamp(p*1.4-r()*.4));ctx.globalAlpha=(1-e)*(o.a??1);ctx.fillRect(q[0]+dx*e,y+q[1]+dy*e,2.6,2.6)}}
  ctx.restore()}
function serifLine(s,y,t0,t1,t,o={}){const a=vis(t,t0,t1,.45,.45);if(a<=0)return;ctx.save();ctx.globalAlpha=a*(o.a??1);ctx.font=`${o.italic?'italic ':''}${o.w||500} ${o.size||64}px ${SERIF}`;ctx.textAlign='center';ctx.fillStyle=o.col||(TH.dark?INK:CHAR);
  const k=eOut(prog(t,t0,t0+.6));ctx.filter=`blur(${(1-k)*10}px)`;ctx.fillText(s,W/2,y+(1-k)*18);ctx.restore()}
// captions (discreet serif, word highlight)
let CAP=[];function buildCaps(SEG){CAP=[];for(const [a,b,txt] of SEG){const w=txt.split(' ');const ch=[];for(let i=0;i<w.length;i+=5)ch.push(w.slice(i,i+5));const tot=w.join(' ').length;let t=a;for(const c of ch){const d=(b-a)*c.join(' ').length/tot;CAP.push([t,t+d,c]);t+=d}}}
function caption(t){let cur=null;for(const c of CAP)if(t>=c[0]-.08&&t<c[1]+.25)cur=c;if(!cur)return;const [a,b,words]=cur;const n=words.length;const wi=Math.min(n-1,Math.floor(prog(t,a,b)*n));
  ctx.save();ctx.font=`italic 500 54px ${SERIF}`;const ws=words.map(w=>ctx.measureText(w).width);const sp=14;const tot=ws.reduce((s,v)=>s+v,0)+sp*(n-1);let x=W/2-tot/2-20;const y=1400;
  ctx.globalAlpha=eOut(prog(t,a-.08,a+.15))*(1-prog(t,b+.1,b+.25));ctx.shadowColor='rgba(0,0,0,.9)';ctx.shadowBlur=18;
  for(let i=0;i<n;i++){ctx.fillStyle=i===wi?(TH.dark?'#FFFFFF':'#0A0A0D'):(TH.dark?'rgba(242,240,236,.55)':'rgba(10,10,13,.5)');if(i===wi&&TH.dark){ctx.shadowColor=BLUE2;ctx.shadowBlur=22}else{ctx.shadowColor='rgba(0,0,0,.6)';ctx.shadowBlur=12}ctx.fillText(words[i],x,y);x+=ws[i]+sp}ctx.restore()}

// ---------- post ----------
const BLOOM=off(270,480),bctx=BLOOM.getContext('2d');
const VIG=(()=>{const c=off(270,480),x=c.getContext('2d');const g=x.createRadialGradient(135,230,70,135,240,300);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.88)');x.fillStyle=g;x.fillRect(0,0,270,480);return c})();
const GRAIN=[];for(let k=0;k<6;k++){const c=off(540,960),x=c.getContext('2d');const r=rng(k+1);for(let i=0;i<9000;i++){x.fillStyle=r()>.5?'rgba(255,255,255,.06)':'rgba(0,0,0,.08)';x.fillRect(r()*540,r()*960,1.4,1.4)}GRAIN.push(c)}
function post(t,dark){bctx.clearRect(0,0,270,480);bctx.filter='blur(6px)';bctx.drawImage(cv,0,0,270,480);ctx.save();ctx.globalCompositeOperation=dark?'screen':'multiply';ctx.globalAlpha=dark?.55:.18;ctx.drawImage(BLOOM,0,0,W,H);ctx.restore();
  ctx.save();ctx.globalAlpha=dark?1:.45;ctx.drawImage(VIG,0,0,W,H);ctx.restore();ctx.drawImage(GRAIN[Math.floor(t*12)%6],0,0,W,H)}

// ---------- timeline driver ----------
// SCENES: [{t0,t1,dark,draw:(lt,t,sc)=>{}}]. Transitions: whip with motion blur (subframe accumulation) of TR seconds at each cut.
const TR=.32;const ACC=off(W,H),actx=ACC.getContext('2d');
function drawSceneAt(sc,t,dy){setTheme(sc.dark);ctx.save();ctx.translate(0,dy);ctx.fillStyle=TH.bg;ctx.fillRect(0,-H,W,H*3);
  const lt=t-sc.t0;const push=1+.035*eIO(prog(t,sc.t0,sc.t1));ctx.translate(W/2,H/2);ctx.scale(push,push);ctx.translate(-W/2,-H/2);sc.draw(lt,t,sc);ctx.restore()}
function frame(t){let i=SCENES.findIndex(s=>t>=s.t0&&t<s.t1);if(i<0)i=t<SCENES[0].t0?0:SCENES.length-1;const sc=SCENES[i];
  const nx=SCENES[i+1];const inCut=nx&&t>sc.t1-TR/2;const pv=SCENES[i-1];const outCut=pv&&t<sc.t0+TR/2;
  if(inCut||outCut){const a=inCut?sc:pv,b=inCut?nx:sc,cut=inCut?sc.t1:sc.t0;actx.clearRect(0,0,W,H);const N=5;
    for(let k=0;k<N;k++){const tt=t+(k-(N-1)/2)/240;const p=clamp((tt-(cut-TR/2))/TR);const e=eIO(p);ctx.setTransform(1,0,0,1,0,0);
      if(e<.5){drawSceneAt(a,Math.min(tt,a.t1-1e-3),-e*2*H*.35)}else{drawSceneAt(b,Math.max(tt,b.t0),(1-e)*2*H*.35)}
      const fl=1-Math.abs(e-.5)*2;if(fl>0){ctx.fillStyle=`rgba(${b.dark?'35,70,232':'255,255,255'},${fl*.18})`;ctx.fillRect(0,0,W,H)}
      actx.globalAlpha=1/(k+1);actx.drawImage(cv,0,0)}
    ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(ACC,0,0);setTheme(t<cut?a.dark:b.dark)}
  else drawSceneAt(sc,t,0);
  ctx.setTransform(1,0,0,1,0,0);caption(t);post(t,TH.dark);
  if(window.OVERLAY)OVERLAY(t)}
window.renderAt=frame;
