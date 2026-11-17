// ===== WESTHAVEN NOIR · escenas del video "El dinero viejo no corre" =====
// Tiempos en segundos de la VOZ (silencedetect) + V (lead-in). Editar por video.
const V=0.2, v=x=>x+V, END=v(51.33)+2.6;
window.DURATION=END;
// subtítulos (inicio, fin, texto) en tiempo de voz
buildCaps([[0.0,1.8,'El dinero viejo no corre.'],[2.7,3.13,'Espera.'],[4.63,7.02,'Mientras todos persiguen la vela verde de hoy…'],[7.68,9.76,'ellos ya compraron hace diez años.'],
 [10.31,11.11,'No por suerte.'],[11.74,12.68,'Por paciencia.'],[14.08,17.12,'La paciencia es una ventaja que nadie quiere pagar…'],[17.7,19.75,'porque no se ve en una captura de pantalla.'],
 [21.11,23.17,'Disciplina es hacer lo aburrido…'],[23.48,24.92,'cuando nadie te aplaude.'],[25.98,29.07,'Es no tocar el botón de comprar a las tres de la mañana.'],[29.98,33.02,'Es cerrar la operación cuando dijiste que la cerrarías.'],
 [33.99,35.1,'Es perder pequeño…'],[35.49,36.62,'para seguir en el juego.'],[38.15,40.95,'Los que construyen fortunas no tienen más suerte.'],[41.64,43.2,'Tienen más tiempo dentro.'],
 [43.96,44.71,'Y el tiempo…'],[45.17,46.91,'solo trabaja para el que se queda.']].map(([a,b,s])=>[v(a),v(b),s]));

function cam(o){CAM=Object.assign({yaw:0,pitch:.08,dist:4.2,f:1500,cx:W/2,cy:H*.5,scale:1},o)}
function candles2D(x0,y0,n,w,gap,hs,t,a=1,hiLast=true){ctx.save();ctx.globalAlpha*=a;for(let i=0;i<n;i++){const x=x0+i*(w+gap),h=hs[i],last=i===n-1;
  ctx.strokeStyle=last&&hiLast?BLUE2:TH.line;ctx.lineWidth=3;if(last&&hiLast){ctx.shadowColor=BLUE2;ctx.shadowBlur=30;ctx.fillStyle='rgba(35,70,232,.55)';ctx.fillRect(x,y0-h,w,h)}
  ctx.strokeRect(x,y0-h,w,h);ctx.beginPath();ctx.moveTo(x+w/2,y0-h-30);ctx.lineTo(x+w/2,y0-h);ctx.moveTo(x+w/2,y0);ctx.lineTo(x+w/2,y0+24);ctx.stroke();ctx.shadowBlur=0}ctx.restore()}
function opening(lt,t,pull=0){cam({yaw:-.35+lt*.06,pitch:.06,dist:5.2+pull,cy:1300});
  const g=.85+.15*Math.sin(t*1.3);gothicWindow(540,330,430,780,1,g);lightRays(540,420,430,1350,1,t);floor(t,1300,.55,.15);
  ctx.save();ctx.globalCompositeOperation='source-over';const sh=ctx.createRadialGradient(540,1305,10,540,1305,260);sh.addColorStop(0,'rgba(0,0,0,.85)');sh.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=sh;ctx.fillRect(240,1240,600,140);ctx.restore();
  human(0,0,{helmet:true,s:1.08,fill:'rgba(5,5,8,.9)',lw:1.7});motes(t,.8)}

const SCENES=[
 {t0:0,t1:v(2.45),dark:1,draw:(lt,t)=>{opening(lt,t);keyword('NO CORRE',250,v(.85),v(2.2),t,{size:112,glow:26})}},
 {t0:v(2.45),t1:v(4.5),dark:0,draw:(lt,t)=>{pocketWatch(540,880,300,t*.6+20,1);keyword('ESPERA',330,v(2.6),v(4.3),t,{size:132})}},
 {t0:v(4.5),t1:v(7.45),dark:1,draw:(lt,t)=>{
   candles2D(330,640,5,62,30,[90,140,120,190,330],t,.9);lightRays(670,300,200,700,.6,t);
   cam({yaw:.55,pitch:.14,dist:7.5,cy:1330,f:1500});floor(t,1330,.7,1.2);
   const r=rng(5);const crowd=Array.from({length:7},(_,i)=>({x:(i-3)*.55+(r()-.5)*.3,z:r()*2.2,p:r()}));
   crowd.sort((a,b)=>b.z-a.z);for(const c of crowd)human(c.x,c.z-lt*.9,{walk:1,step:lt*1.5+c.p,s:.95,fill:'rgba(5,5,8,.85)',lw:1.4});
   keyword('LA VELA DE HOY',300,v(5.9),v(7.25),t,{size:78,ls:10})}},
 {t0:v(7.45),t1:v(10.15),dark:0,draw:(lt,t)=>{cam({yaw:0,pitch:.18,dist:4.6,cy:1290});floor(t,1290,.5);
   lathe(KING.map(([r,y])=>[r*1.2,y*1.2]),0,0,0,{mer:16,seg:44,lw:2.2,rot:lt*.5,fill:'rgba(236,232,225,.6)'});ctx.strokeStyle=TH.line;kingCross(0,0,0,1.2);
   tag(680,900,'ENTRADA · 2016',vis(t,v(8.4),v(10.2)),1);keyword('2016',380,v(8.5),v(9.95),t,{size:190,col:BLUE,ls:22})}},
 {t0:v(10.15),t1:v(13.95),dark:1,draw:(lt,t)=>{cam({yaw:.35-lt*.05,pitch:.02,dist:3.9,cy:1360});gothicWindow(540,260,520,900,1,.95);lightRays(540,330,520,1500,1.1,t);
   candle(170,1420,.8,t);candle(910,1420,.8,t+1.3);human(0,0,{helmet:true,s:1.05,fill:'rgba(5,5,8,.92)',lw:1.8});motes(t,1);
   keyword('PACIENCIA',230,v(11.7),v(13.75),t,{size:112,glow:34})}},
 {t0:v(13.95),t1:v(17.5),dark:1,draw:(lt,t)=>{const s=1.9+lt*.05;candle(540,1330,s,t,1);lightRays(540,300,360,1100,.5,t);motes(t,.7);
   keyword('UNA VENTAJA',300,v(14.5),v(17.3),t,{size:100,glow:22});serifLine('que nadie quiere pagar',400,v(15.4),v(17.4),t,{italic:1,size:58,a:.75})}},
 {t0:v(17.5),t1:v(21.0),dark:0,draw:(lt,t)=>{const px=540,py=860,pw=380,ph=720;ctx.save();ctx.strokeStyle=TH.line;ctx.lineWidth=5;rr(ctx,px-pw/2,py-ph/2,pw,ph,46);ctx.stroke();
   ctx.lineWidth=2;rr(ctx,px-pw/2+16,py-ph/2+16,pw-32,ph-32,34);ctx.stroke();rr(ctx,px-40,py-ph/2+30,80,18,9);ctx.stroke();
   ctx.beginPath();for(let i=0;i<=60;i++){const x=px-150+i*5,y=py+120-i*1.2-Math.sin(i*.7)*10-Math.sin(i*.23)*18;i?ctx.lineTo(x,y):ctx.moveTo(x,y)}ctx.strokeStyle=CHAR;ctx.lineWidth=3;ctx.stroke();
   const shot=v(19.0);const k=eOutExpo(prog(t,shot,shot+.5));if(t>shot){ctx.strokeStyle=BLUE;ctx.lineWidth=6;const m=lerp(60,14,k);for(const [sx,sy] of[[-1,-1],[1,-1],[1,1],[-1,1]]){const cx=px+sx*(pw/2+m),cy=py+sy*(ph/2+m);ctx.beginPath();ctx.moveTo(cx,cy-sy*70);ctx.lineTo(cx,cy);ctx.lineTo(cx-sx*70,cy);ctx.stroke()}}
   ctx.restore();const fl=1-prog(t,shot,shot+.35);if(t>shot&&fl>0){ctx.fillStyle=`rgba(255,255,255,${fl*.9})`;ctx.fillRect(-100,-100,W+200,H+200)}
   keyword('NO SE VE',300,v(17.8),v(20.7),t,{size:120})}},
 {t0:v(21.0),t1:v(25.85),dark:1,draw:(lt,t)=>{cam({yaw:1.25,pitch:.1,dist:4.4,cy:1320});floor(t,1320,.6,.9);lightRays(760,0,300,1700,.6,t);
   human(0,0,{walk:1,step:lt*.9,s:1.05,fill:'rgba(5,5,8,.9)',lw:1.8});motes(t,.6);
   keyword('DISCIPLINA',260,v(21.15),v(25.6),t,{size:110,glow:28});serifLine('cuando nadie te aplaude',360,v(23.4),v(25.7),t,{italic:1,size:58,a:.75})}},
 {t0:v(25.85),t1:v(29.85),dark:1,draw:(lt,t)=>{pocketWatch(540,620,240,t,1,[3,0,lt*1.0]);tag(760,470,'03:00 AM',vis(t,v(26.6),v(29.9)),1);
   const bx=540,by=1180,bw=440,bh=130;const pulse=.5+.5*Math.sin(lt*3);ctx.save();ctx.shadowColor=BLUE2;ctx.shadowBlur=20+20*pulse;ctx.strokeStyle=BLUE2;ctx.lineWidth=4;rr(ctx,bx-bw/2,by-bh/2,bw,bh,14);ctx.stroke();ctx.shadowBlur=0;
   ctx.font=`600 52px ${CAPS}`;ctx.letterSpacing='10px';ctx.fillStyle=INK;ctx.textAlign='center';ctx.fillText('COMPRAR',bx,by+18);ctx.restore();
   const k=eIO(prog(t,v(26.3),v(27.8)));const back=eIO(prog(t,v(28.4),v(29.4)));const cxp=lerp(900,610,k)+back*260,cyp=lerp(1500,1235,k)+back*230;
   ctx.save();ctx.translate(cxp,cyp);ctx.fillStyle=INK;ctx.strokeStyle=BLK;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,58);ctx.lineTo(15,45);ctx.lineTo(27,70);ctx.lineTo(37,65);ctx.lineTo(25,41);ctx.lineTo(44,41);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}},
 {t0:v(29.85),t1:v(33.9),dark:0,draw:(lt,t)=>{const tgt=760;ctx.save();ctx.setLineDash([16,14]);ctx.strokeStyle=BLUE;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(110,tgt);ctx.lineTo(970,tgt);ctx.stroke();ctx.setLineDash([]);
   ctx.font=`500 24px ${MONO}`;ctx.fillStyle=BLUE;ctx.textAlign='right';ctx.fillText('OBJETIVO',970,tgt-16);
   const cut=v(31.7);const p=prog(t,v(30.0),cut);const N=80;ctx.beginPath();let last=[0,0];for(let i=0;i<=N*p;i++){const x=120+i*7.4,y=1220-(i/N)*(1220-tgt)+Math.sin(i*.6)*26+Math.sin(i*.21)*40*(1-i/N);i?ctx.lineTo(x,y):ctx.moveTo(x,y);last=[x,y]}
   ctx.strokeStyle=CHAR;ctx.lineWidth=4;ctx.stroke();ctx.restore();if(t>cut){const k=eOutExpo(prog(t,cut,cut+.6));ctx.save();ctx.strokeStyle=BLUE;ctx.lineWidth=6;ctx.beginPath();ctx.arc(last[0],tgt,lerp(120,46,k),0,7);ctx.globalAlpha=k;ctx.stroke();ctx.fillStyle=BLUE;ctx.beginPath();ctx.arc(last[0],tgt,12,0,7);ctx.fill();ctx.restore()}
   keyword('CERRADO',330,v(31.6),v(33.7),t,{size:124})}},
 {t0:v(33.9),t1:v(37.95),dark:1,draw:(lt,t)=>{cam({yaw:.2,pitch:.16,dist:5,cy:1330});floor(t,1330,.55);lightRays(700,0,320,1600,.55,t);
   lathe(KING.map(([r,y])=>[r*1.05,y*1.05]),.8,0,.3,{mer:14,seg:40,lw:2,rot:lt*.3,fill:'rgba(5,5,8,.85)'});ctx.strokeStyle=TH.line;kingCross(.8,0,.3,1.05);
   const b=P(-.3,0,-.2);const fall=eIn(prog(t,v(34.4),v(35.0)));const bounce=Math.sin(prog(t,v(35.0),v(35.5))*Math.PI)*.06*(1-prog(t,v(35),v(35.5)));
   ctx.save();ctx.translate(b[0],b[1]);ctx.rotate(-(fall*1.45-bounce));ctx.translate(-b[0],-b[1]);lathe(PAWN.map(([r,y])=>[r*1.1,y*1.1]),-.3,0,-.2,{mer:12,seg:36,lw:2,fill:'rgba(5,5,8,.85)'});ctx.restore();
   keyword('PIERDE PEQUEÑO',300,v(34.0),v(35.4),t,{size:84,ls:10});keyword('SIGUE EN EL JUEGO',300,v(35.55),v(37.7),t,{size:80,ls:10,glow:24})}},
 {t0:v(37.95),t1:v(43.85),dark:0,draw:(lt,t)=>{cam({yaw:0,pitch:.12,dist:4.3,cy:1310});lathe(HOURGLASS.map(([r,y])=>[r*1.25,y*1.25]),0,0,0,{mer:14,seg:44,lw:2.2,rot:lt*.35,fill:'rgba(236,232,225,.55)'});
   const top=P(0,1.25*.62,0),bot=P(0,.08,0);ctx.save();ctx.fillStyle=CHAR;const r=rng(11);for(let i=0;i<70;i++){const ph=(r()+lt*.9)%1;ctx.globalAlpha=.8;ctx.fillRect(top[0]+(r()-.5)*3,lerp(top[1],bot[1]-40,ph),2.5,4)}
   const pile=lerp(30,80,prog(t,v(37.95),v(43.85)));ctx.beginPath();ctx.moveTo(bot[0]-170,bot[1]-6);ctx.quadraticCurveTo(bot[0],bot[1]-6-pile*2,bot[0]+170,bot[1]-6);ctx.closePath();ctx.globalAlpha=.85;ctx.fill();ctx.restore();
   keyword('SUERTE',320,v(38.6),v(40.7),t,{size:124});const sk=eOutExpo(prog(t,v(40.0),v(40.5)));if(t<v(40.75)&&sk>0){ctx.save();ctx.strokeStyle=BLUE;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(250,290);ctx.lineTo(lerp(250,830,sk),290);ctx.stroke();ctx.restore()}
   keyword('TIEMPO DENTRO',320,v(41.6),v(43.65),t,{size:96,col:BLUE,ls:12})}},
 {t0:v(43.85),t1:v(47.95),dark:1,draw:(lt,t)=>{cam({yaw:-.15+lt*.04,pitch:.12,dist:6.2,cy:1330});floor(t,1330,.6);lightRays(540,0,360,1700,.9,t);
   const others=[[-1.3,.6],[1.25,.5],[-.7,1.6],[.8,1.7]];const d=prog(t,v(44.3),v(46.6));
   others.forEach(([x,z],i)=>{const di=clamp(d*1.6-i*.18);if(di>=1)return;ctx.save();ctx.globalAlpha=Math.pow(1-di,1.5);ctx.translate(0,-di*160);human(x,z,{s:.98,fill:'rgba(5,5,8,.8)',lw:1.5});ctx.restore()});
   human(0,-.2,{helmet:true,s:1.05,fill:'rgba(5,5,8,.92)',lw:1.8});motes(t,.9);keyword('EL QUE SE QUEDA',300,v(45.3),v(47.7),t,{size:82,ls:10,glow:30})}},
 {t0:v(47.95),t1:END,dark:1,draw:(lt,t)=>{opening(lt+3,t,eIO(prog(t,v(47.95),END))*1.2);
   serifLine('El dinero viejo no corre.',180,v(48.0),END-.2,t,{italic:1,size:72});serifLine('Espera.',265,v(50.6),END-.2,t,{italic:1,size:72,col:BLUE2})}},
];
window.OVERLAY=t=>{const a=prog(t,END-1.6,END-.15);if(a>0){ctx.fillStyle=`rgba(0,0,0,${eIO(a)})`;ctx.fillRect(0,0,W,H)}};
// Sonido: HITS=[t,tipo] tipos: boom|thud|shutter|tick|bell ; DROPS=[[a,b]] silencia batería ; VOICE_OFFSET
window.VOICE_OFFSET=V;
window.HITS=[[v(.85),'boom'],[v(2.6),'bell'],[v(8.5),'boom'],[v(11.7),'bell'],[v(14.5),'boom'],[v(19.0),'shutter'],[v(21.15),'boom'],
 ...[0,1,2,3].map(i=>[v(26)+i,'tick']),[v(31.7),'bell'],[v(35.0),'thud'],[v(40.0),'thud'],[v(41.6),'boom'],[v(45.3),'bell']];
window.DROPS=[[v(25.85),v(29.85)],[v(47.6),END]];
