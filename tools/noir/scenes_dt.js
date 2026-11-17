// ===== WESTHAVEN NOIR · "El trader que dura no persigue" (day trading) =====
// Tiempos en segundos de la VOZ (silencedetect) + V (lead-in). Editar por video.
const V=0.2, v=x=>x+V, END=v(52.27)+2.6;
window.DURATION=END;
buildCaps([[0.0,2.26,'El trader que dura no persigue.'],[2.99,3.5,'Espera.'],[4.95,8.11,'Mientras todos entran en la primera vela verde de la apertura…'],[8.81,11.42,'él ya tenía su nivel marcado desde anoche.'],
 [12.14,12.95,'No por suerte.'],[13.5,14.08,'Por plan.'],[15.37,18.32,'Esperar es una ventaja que nadie quiere pagar…'],[18.88,20.91,'porque no se ve en una captura de pantalla.'],
 [22.0,24.06,'Disciplina es hacer lo aburrido…'],[24.45,25.78,'cuando nadie te aplaude.'],[26.86,30.62,'Es no tocar el botón de comprar después de tres pérdidas seguidas.'],[31.58,34.42,'Es cerrar la operación donde dijiste que la cerrarías.'],
 [35.34,36.37,'Es perder pequeño…'],[36.77,37.84,'para seguir en el juego.'],[39.11,41.62,'Los que viven del trading no tienen más suerte.'],[42.28,43.77,'Tienen más tiempo dentro.'],
 [44.55,45.31,'Y el mercado…'],[45.78,47.49,'solo le paga al que se queda.']].map(([a,b,s])=>[v(a),v(b),s]));

function cam(o){CAM=Object.assign({yaw:0,pitch:.08,dist:4.2,f:1500,cx:W/2,cy:H*.5,scale:1},o)}
function candles2D(x0,y0,n,w,gap,hs,t,a=1,hiLast=true){ctx.save();ctx.globalAlpha*=a;for(let i=0;i<n;i++){const x=x0+i*(w+gap),h=hs[i],last=i===n-1;
  ctx.strokeStyle=last&&hiLast?BLUE2:TH.line;ctx.lineWidth=3;if(last&&hiLast){ctx.shadowColor=BLUE2;ctx.shadowBlur=30;ctx.fillStyle='rgba(35,70,232,.55)';ctx.fillRect(x,y0-h,w,h)}
  ctx.strokeRect(x,y0-h,w,h);ctx.beginPath();ctx.moveTo(x+w/2,y0-h-30);ctx.lineTo(x+w/2,y0-h);ctx.moveTo(x+w/2,y0);ctx.lineTo(x+w/2,y0+24);ctx.stroke();ctx.shadowBlur=0}ctx.restore()}
function opening(lt,t,pull=0){cam({yaw:-.35+lt*.06,pitch:.06,dist:5.2+pull,cy:1300});
  const g=.85+.15*Math.sin(t*1.3);gothicWindow(540,330,430,780,1,g);lightRays(540,420,430,1350,1,t);floor(t,1300,.55,.15);
  ctx.save();ctx.globalCompositeOperation='source-over';const sh=ctx.createRadialGradient(540,1305,10,540,1305,260);sh.addColorStop(0,'rgba(0,0,0,.85)');sh.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=sh;ctx.fillRect(240,1240,600,140);ctx.restore();
  human(0,0,{helmet:true,s:1.08,fill:'rgba(5,5,8,.9)',lw:1.7});motes(t,.8)}

const SCENES=[
 {t0:0,t1:v(2.75),dark:1,draw:(lt,t)=>{opening(lt,t);keyword('NO PERSIGUE',250,v(.9),v(2.55),t,{size:108,glow:26})}},
 {t0:v(2.75),t1:v(4.75),dark:0,draw:(lt,t)=>{pocketWatch(540,880,300,t*.6+20,1);keyword('ESPERA',330,v(2.9),v(4.55),t,{size:132})}},
 {t0:v(4.75),t1:v(8.55),dark:1,draw:(lt,t)=>{
   candles2D(330,640,5,62,30,[90,140,120,190,330],t,.9);lightRays(670,300,200,700,.6,t);tag(320,470,'09:30 · NUEVA YORK',vis(t,v(5.2),v(8.6)),-1);
   cam({yaw:.55,pitch:.14,dist:7.5,cy:1330,f:1500});floor(t,1330,.7,1.2);
   const r=rng(5);const crowd=Array.from({length:7},(_,i)=>({x:(i-3)*.55+(r()-.5)*.3,z:r()*2.2,p:r()}));
   crowd.sort((a,b)=>b.z-a.z);for(const c of crowd)human(c.x,c.z-lt*.9,{walk:1,step:lt*1.5+c.p,s:.95,fill:'rgba(5,5,8,.85)',lw:1.4});
   keyword('LA APERTURA',300,v(6.6),v(8.35),t,{size:96,ls:12})}},
 {t0:v(8.55),t1:v(11.85),dark:0,draw:(lt,t)=>{const lvl=900;const k=eOutExpo(prog(t,v(8.7),v(9.6)));ctx.save();ctx.setLineDash([18,14]);ctx.strokeStyle=BLUE;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(110,lvl);ctx.lineTo(lerp(110,970,k),lvl);ctx.stroke();ctx.setLineDash([]);
   ctx.font=`500 24px ${MONO}`;ctx.fillStyle=BLUE;ctx.textAlign='right';ctx.globalAlpha=k;ctx.fillText('NIVEL · MARCADO 22:00',970,lvl-18);ctx.globalAlpha=1;
   const hs=[[1180,1060],[1060,1120],[1120,990],[990,1040],[1040,940],[940,975],[975,915]];const n=Math.min(hs.length,Math.floor(prog(t,v(9.0),v(11.2))*hs.length)+1);
   for(let i=0;i<n;i++){const [o,c]=hs[i],x=170+i*105,top=Math.min(o,c),h=Math.abs(o-c);ctx.strokeStyle=CHAR;ctx.lineWidth=3;ctx.strokeRect(x,top,46,h);ctx.beginPath();ctx.moveTo(x+23,top-26);ctx.lineTo(x+23,top);ctx.moveTo(x+23,top+h);ctx.lineTo(x+23,top+h+22);ctx.stroke()}
   ctx.restore();keyword('DESDE ANOCHE',330,v(9.6),v(11.65),t,{size:100,ls:12,col:BLUE})}},
 {t0:v(11.85),t1:v(14.9),dark:1,draw:(lt,t)=>{cam({yaw:.35-lt*.05,pitch:.02,dist:3.9,cy:1360});gothicWindow(540,260,520,900,1,.95);lightRays(540,330,520,1500,1.1,t);
   candle(170,1420,.8,t);candle(910,1420,.8,t+1.3);human(0,0,{helmet:true,s:1.05,fill:'rgba(5,5,8,.92)',lw:1.8});motes(t,1);
   keyword('PLAN',230,v(13.45),v(14.7),t,{size:150,glow:34})}},
 {t0:v(14.9),t1:v(18.6),dark:1,draw:(lt,t)=>{const s=1.9+lt*.05;candle(540,1330,s,t,1);lightRays(540,300,360,1100,.5,t);motes(t,.7);
   keyword('ESPERAR',300,v(15.4),v(18.4),t,{size:120,glow:22});serifLine('una ventaja que nadie quiere pagar',400,v(16.4),v(18.5),t,{italic:1,size:54,a:.75})}},
 {t0:v(18.6),t1:v(21.6),dark:0,draw:(lt,t)=>{const px=540,py=860,pw=380,ph=720;ctx.save();ctx.strokeStyle=TH.line;ctx.lineWidth=5;rr(ctx,px-pw/2,py-ph/2,pw,ph,46);ctx.stroke();
   ctx.lineWidth=2;rr(ctx,px-pw/2+16,py-ph/2+16,pw-32,ph-32,34);ctx.stroke();rr(ctx,px-40,py-ph/2+30,80,18,9);ctx.stroke();
   ctx.beginPath();for(let i=0;i<=60;i++){const x=px-150+i*5,y=py+120-i*1.2-Math.sin(i*.7)*10-Math.sin(i*.23)*18;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.strokeStyle=CHAR;ctx.lineWidth=3;ctx.stroke();
   const shot=v(20.0);const k=eOutExpo(prog(t,shot,shot+.5));if(t>shot){ctx.strokeStyle=BLUE;ctx.lineWidth=6;const m=lerp(60,14,k);for(const [sx,sy] of[[-1,-1],[1,-1],[1,1],[-1,1]]){const cx=px+sx*(pw/2+m),cy=py+sy*(ph/2+m);ctx.beginPath();ctx.moveTo(cx,cy-sy*70);ctx.lineTo(cx,cy);ctx.lineTo(cx-sx*70,cy);ctx.stroke()}}
   ctx.restore();const fl=1-prog(t,shot,shot+.35);if(t>shot&&fl>0){ctx.fillStyle=`rgba(255,255,255,${fl*.9})`;ctx.fillRect(-100,-100,W+200,H+200)}
   keyword('NO SE VE',300,v(18.9),v(21.4),t,{size:120})}},
 {t0:v(21.6),t1:v(26.4),dark:1,draw:(lt,t)=>{cam({yaw:1.25,pitch:.1,dist:4.4,cy:1320});floor(t,1320,.6,.9);lightRays(760,0,300,1700,.6,t);
   human(0,0,{walk:1,step:lt*.9,s:1.05,fill:'rgba(5,5,8,.9)',lw:1.8});motes(t,.6);
   keyword('DISCIPLINA',260,v(22.0),v(26.2),t,{size:110,glow:28});serifLine('cuando nadie te aplaude',360,v(24.4),v(26.3),t,{italic:1,size:58,a:.75})}},
 {t0:v(26.4),t1:v(31.2),dark:1,draw:(lt,t)=>{
   const L=[v(28.6),v(29.2),v(29.8)];ctx.save();for(let i=0;i<3;i++){const a=eOutExpo(prog(t,L[i],L[i]+.4));if(a<=0)continue;const x=300+i*240,y=600;ctx.globalAlpha=a;ctx.strokeStyle='rgba(232,232,238,.8)';ctx.lineWidth=3;rr(ctx,x-80,y-80,160,160,10);ctx.stroke();
     ctx.strokeStyle=BLUE2;ctx.lineWidth=6;ctx.shadowColor=BLUE2;ctx.shadowBlur=18;const q=46*a;ctx.beginPath();ctx.moveTo(x-q,y-q);ctx.lineTo(x+q,y+q);ctx.moveTo(x+q,y-q);ctx.lineTo(x-q,y+q);ctx.stroke();ctx.shadowBlur=0;
     ctx.font=`500 28px ${MONO}`;ctx.fillStyle='rgba(232,232,238,.85)';ctx.textAlign='center';ctx.fillText('−1R',x,y+130)}ctx.restore();
   tag(150,860,'3 PÉRDIDAS SEGUIDAS',vis(t,v(30.0),v(31.3)),1);
   const bx=540,by=1180,bw=440,bh=130;const pulse=.5+.5*Math.sin(lt*3);ctx.save();ctx.shadowColor=BLUE2;ctx.shadowBlur=20+20*pulse;ctx.strokeStyle=BLUE2;ctx.lineWidth=4;rr(ctx,bx-bw/2,by-bh/2,bw,bh,14);ctx.stroke();ctx.shadowBlur=0;
   ctx.font=`600 52px ${CAPS}`;ctx.letterSpacing='10px';ctx.fillStyle=INK;ctx.textAlign='center';ctx.fillText('COMPRAR',bx,by+18);ctx.restore();
   const k=eIO(prog(t,v(26.9),v(28.3)));const back=eIO(prog(t,v(30.0),v(30.9)));const cxp=lerp(900,610,k)+back*260,cyp=lerp(1500,1235,k)+back*230;
   ctx.save();ctx.translate(cxp,cyp);ctx.fillStyle=INK;ctx.strokeStyle=BLK;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,58);ctx.lineTo(15,45);ctx.lineTo(27,70);ctx.lineTo(37,65);ctx.lineTo(25,41);ctx.lineTo(44,41);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}},
 {t0:v(31.2),t1:v(34.9),dark:0,draw:(lt,t)=>{const tgt=760;ctx.save();ctx.setLineDash([16,14]);ctx.strokeStyle=BLUE;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(110,tgt);ctx.lineTo(970,tgt);ctx.stroke();ctx.setLineDash([]);
   ctx.font=`500 24px ${MONO}`;ctx.fillStyle=BLUE;ctx.textAlign='right';ctx.fillText('TU SALIDA',970,tgt-16);
   const cut=v(33.0);const p=prog(t,v(31.4),cut);const N=80;ctx.beginPath();let last=[0,0];for(let i=0;i<=N*p;i++){const x=120+i*7.4,y=1220-(i/N)*(1220-tgt)+Math.sin(i*.6)*26+Math.sin(i*.21)*40*(1-i/N);i?ctx.lineTo(x,y):ctx.moveTo(x,y);last=[x,y]}
   ctx.strokeStyle=CHAR;ctx.lineWidth=4;ctx.stroke();ctx.restore();if(t>cut){const k=eOutExpo(prog(t,cut,cut+.6));ctx.save();ctx.strokeStyle=BLUE;ctx.lineWidth=6;ctx.beginPath();ctx.arc(last[0],tgt,lerp(120,46,k),0,7);ctx.globalAlpha=k;ctx.stroke();ctx.fillStyle=BLUE;ctx.beginPath();ctx.arc(last[0],tgt,12,0,7);ctx.fill();ctx.restore()}
   keyword('CERRADO',330,v(32.9),v(34.7),t,{size:124})}},
 {t0:v(34.9),t1:v(38.6),dark:1,draw:(lt,t)=>{cam({yaw:.2,pitch:.16,dist:5,cy:1330});floor(t,1330,.55);lightRays(700,0,320,1600,.55,t);
   lathe(KING.map(([r,y])=>[r*1.05,y*1.05]),.8,0,.3,{mer:14,seg:40,lw:2,rot:lt*.3,fill:'rgba(5,5,8,.85)'});ctx.strokeStyle=TH.line;kingCross(.8,0,.3,1.05);
   const b=P(-.3,0,-.2);const fall=eIn(prog(t,v(35.6),v(36.2)));const bounce=Math.sin(prog(t,v(36.2),v(36.7))*Math.PI)*.06*(1-prog(t,v(36.2),v(36.7)));
   ctx.save();ctx.translate(b[0],b[1]);ctx.rotate(-(fall*1.45-bounce));ctx.translate(-b[0],-b[1]);lathe(PAWN.map(([r,y])=>[r*1.1,y*1.1]),-.3,0,-.2,{mer:12,seg:36,lw:2,fill:'rgba(5,5,8,.85)'});ctx.restore();
   keyword('PIERDE PEQUEÑO',300,v(35.3),v(36.6),t,{size:84,ls:10});keyword('SIGUE EN EL JUEGO',300,v(36.75),v(38.4),t,{size:80,ls:10,glow:24})}},
 {t0:v(38.6),t1:v(44.2),dark:0,draw:(lt,t)=>{cam({yaw:0,pitch:.12,dist:4.3,cy:1310});lathe(HOURGLASS.map(([r,y])=>[r*1.25,y*1.25]),0,0,0,{mer:14,seg:44,lw:2.2,rot:lt*.35,fill:'rgba(236,232,225,.55)'});
   const top=P(0,1.25*.62,0),bot=P(0,.08,0);ctx.save();ctx.fillStyle=CHAR;const r=rng(11);for(let i=0;i<70;i++){const ph=(r()+lt*.9)%1;ctx.globalAlpha=.8;ctx.fillRect(top[0]+(r()-.5)*3,lerp(top[1],bot[1]-40,ph),2.5,4)}
   const pile=lerp(30,80,prog(t,v(38.6),v(44.2)));ctx.beginPath();ctx.moveTo(bot[0]-170,bot[1]-6);ctx.quadraticCurveTo(bot[0],bot[1]-6-pile*2,bot[0]+170,bot[1]-6);ctx.closePath();ctx.globalAlpha=.85;ctx.fill();ctx.restore();
   keyword('SUERTE',320,v(39.5),v(41.6),t,{size:124});const sk=eOutExpo(prog(t,v(40.9),v(41.4)));if(t<v(41.65)&&sk>0){ctx.save();ctx.strokeStyle=BLUE;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(250,290);ctx.lineTo(lerp(250,830,sk),290);ctx.stroke();ctx.restore()}
   keyword('TIEMPO DENTRO',320,v(42.25),v(44.0),t,{size:96,col:BLUE,ls:12})}},
 {t0:v(44.2),t1:v(48.3),dark:1,draw:(lt,t)=>{cam({yaw:-.15+lt*.04,pitch:.12,dist:6.2,cy:1330});floor(t,1330,.6);lightRays(540,0,360,1700,.9,t);
   const others=[[-1.3,.6],[1.25,.5],[-.7,1.6],[.8,1.7]];const d=prog(t,v(44.6),v(46.9));
   others.forEach(([x,z],i)=>{const di=clamp(d*1.6-i*.18);if(di>=1)return;ctx.save();ctx.globalAlpha=Math.pow(1-di,1.5);ctx.translate(0,-di*160);human(x,z,{s:.98,fill:'rgba(5,5,8,.8)',lw:1.5});ctx.restore()});
   human(0,-.2,{helmet:true,s:1.05,fill:'rgba(5,5,8,.92)',lw:1.8});motes(t,.9);keyword('EL QUE SE QUEDA',300,v(45.8),v(48.1),t,{size:82,ls:10,glow:30})}},
 {t0:v(48.3),t1:END,dark:1,draw:(lt,t)=>{opening(lt+3,t,eIO(prog(t,v(48.3),END))*1.2);
   serifLine('El trader que dura no persigue.',205,v(48.6),END-.2,t,{italic:1,size:66});serifLine('Espera.',290,v(51.5),END-.2,t,{italic:1,size:72,col:BLUE2})}},
];
window.OVERLAY=t=>{const a=prog(t,END-1.6,END-.15);if(a>0){ctx.fillStyle=`rgba(0,0,0,${eIO(a)})`;ctx.fillRect(0,0,W,H)}};
window.VOICE_OFFSET=V;
window.HITS=[[v(.9),'boom'],[v(2.9),'bell'],[v(6.6),'boom'],[v(9.6),'bell'],[v(13.45),'boom'],[v(15.4),'boom'],[v(20.0),'shutter'],[v(22.0),'boom'],
 [v(28.6),'thud'],[v(29.2),'thud'],[v(29.8),'thud'],[v(33.0),'bell'],[v(36.2),'thud'],[v(40.9),'thud'],[v(42.25),'boom'],[v(45.8),'bell']];
window.DROPS=[[v(26.4),v(31.2)],[v(48.0),END]];
