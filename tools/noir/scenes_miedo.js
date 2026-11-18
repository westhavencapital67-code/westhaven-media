// ===== WESTHAVEN NOIR · 07 "El miedo llega antes que el dato" (noticia del mercado, 17 nov 2026) =====
// Estructura NUEVA: noticiero en frío (tablero de cotizaciones) → espera del reporte → venta a ciegas → revelación del sobre →
// giro después del cierre → aforismo (noticias vs. miedo) → intercambio del miedo → frase final en susurro → loop al tablero.
// Visuales NUEVOS: tablero split-flap, sobre lacrado, lluvia de órdenes VENDER, barras de ingresos, gráfica con sesión extendida,
// periódico tachado, silueta gigante, orbe azul que cambia de manos, dos carriles (miedo vs. dato).
// Entradas de texto NUEVAS: kwFlap (persiana split-flap), kwRise (letras que suben desde una máscara), kwTrack (tracking que se cierra).
// ZONA SEGURA: palabras clave con línea base 520, nada importante arriba de y=330 ni debajo de 1450, ni x>930 entre y 920–1790.
// tiempos escritos sobre la toma original; remap() los lleva a la voz final (sin "Este martes": regla del dueño, abrir con la frase más fuerte)
const MAPA=[[0,0],[4.15,3.05],[5.65,4.65],[10.78,9.88],[14.48,13.68],[19.47,18.77],[24.48,23.88],[27.67,27.17],[31.39,30.99],[37.7,37.4],[43.13,42.93],[47.28,45.98],[50.85,50.18]];
function remap(x){for(let i=1;i<MAPA.length;i++){const[a0,b0]=MAPA[i-1],[a1,b1]=MAPA[i];if(x<=a1)return b0+(x-a0)*(b1-b0)/(a1-a0)}return x+MAPA[MAPA.length-1][1]-MAPA[MAPA.length-1][0]}
const V=0.1, v=x=>remap(x)+V, END=v(50.85);
window.DURATION=END;
buildCaps([[0.0,4.15,'El Dow perdió casi 850 puntos.'],
 [5.65,7.57,'Todos esperaban un solo reporte:'],[8.07,8.78,'el de Nvidia.'],
 [10.78,12.48,'Muchos vendieron antes de saber.'],
 [14.48,15.26,'Los ingresos:'],[15.64,17.37,'más del doble que hace un año.'],
 [19.47,21.58,'Y después del cierre, la acción subió.'],
 [24.48,26.67,'El mercado no se mueve con noticias.'],[27.67,28.89,'Se mueve con miedo.'],
 [31.39,35.0,'El que vendió por pánico, le vendió su miedo a alguien paciente.'],
 [37.7,40.43,'El miedo siempre llega antes que el dato.'],
 [43.13,47.28,'El Dow perdió casi 850 puntos.']].map(([a,b,s])=>[v(a),v(b),s]));

const fg=()=>TH.dark?INK:CHAR;
function cam(o){CAM=Object.assign({yaw:0,pitch:.08,dist:4.2,f:1500,cx:W/2,cy:H*.5,scale:1},o)}
function fitW(s,size,font,ls,maxW=760){ctx.save();ctx.font=`600 ${size}px ${font}`;ctx.letterSpacing=ls+'px';const m=ctx.measureText(s).width;ctx.restore();return m>maxW?Math.floor(size*maxW/m):size}
// salida común: sube y se desvanece
function outUp(t,t1){const p=eIO(prog(t,t1,t1+.6));return {a:1-p,dy:-50*p}}

// ---------- tipografía nueva ----------
// persiana split-flap: cada letra cae desde arriba girando sobre su eje horizontal, escalonada
function kwFlap(s,y,t0,t1,t,o={}){if(t<t0||t>t1+.6)return;const ls=o.ls??12,size=fitW(s,o.size||120,CAPS,ls);const X=outUp(t,t1);
 ctx.save();ctx.font=`600 ${size}px ${CAPS}`;ctx.letterSpacing='0px';ctx.textAlign='left';const chars=[...s];const ws=chars.map(c=>ctx.measureText(c).width+ls);const tot=ws.reduce((a,b)=>a+b,0)-ls;let x=W/2-tot/2;
 for(let i=0;i<chars.length;i++){const k=o.static?1:eOut(prog(t,t0+i*.045,t0+i*.045+.32));if(k>0){ctx.save();ctx.translate(x+ws[i]/2,y-size*.35+X.dy);ctx.scale(1,Math.max(.02,Math.abs(Math.cos((1-k)*Math.PI/2))));ctx.globalAlpha=X.a*clamp(k*2);ctx.fillStyle=o.col||fg();if(o.glow){ctx.shadowColor=BLUE2;ctx.shadowBlur=o.glow}ctx.textAlign='center';ctx.fillText(chars[i],0,size*.35);ctx.restore()}x+=ws[i]}
 ctx.restore()}
// letras que suben desde una línea base enmascarada
function kwRise(s,y,t0,t1,t,o={}){if(t<t0||t>t1+.6)return;const ls=o.ls??14,size=fitW(s,o.size||120,CAPS,ls);const X=outUp(t,t1);
 ctx.save();ctx.font=`600 ${size}px ${CAPS}`;ctx.letterSpacing='0px';const chars=[...s];const ws=chars.map(c=>ctx.measureText(c).width+ls);const tot=ws.reduce((a,b)=>a+b,0)-ls;let x=W/2-tot/2;
 ctx.beginPath();ctx.rect(0,y-size*1.1+X.dy,W,size*1.1+16);ctx.clip();
 for(let i=0;i<chars.length;i++){const k=eOutExpo(prog(t,t0+i*.035,t0+i*.035+.6));ctx.globalAlpha=X.a;ctx.fillStyle=o.col||fg();if(o.glow){ctx.shadowColor=BLUE2;ctx.shadowBlur=o.glow}ctx.textAlign='left';ctx.fillText(chars[i],x,y+(1-k)*size*1.1+X.dy);x+=ws[i]}
 if(o.strike){const p=eIO(prog(t,o.strike,o.strike+.45));if(p>0){ctx.globalAlpha=X.a;ctx.strokeStyle=BLUE;ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(W/2-tot/2-20,y-size*.36+X.dy);ctx.lineTo(W/2-tot/2-20+(tot+40)*p,y-size*.36+X.dy);ctx.stroke()}}
 ctx.restore()}
// tracking que se cierra: letras muy separadas y transparentes que se juntan
function kwTrack(s,y,t0,t1,t,o={}){if(t<t0||t>t1+.6)return;const ls0=o.ls??12,size=fitW(s,o.size||110,CAPS,ls0);const k=eOutExpo(prog(t,t0,t0+.9));const X=outUp(t,t1);
 ctx.save();ctx.font=`600 ${size}px ${CAPS}`;ctx.letterSpacing=lerp(ls0+46,ls0,k)+'px';ctx.textAlign='center';ctx.globalAlpha=X.a*k;ctx.fillStyle=o.col||fg();if(o.glow){ctx.shadowColor=BLUE2;ctx.shadowBlur=o.glow}ctx.fillText(s,W/2,y+X.dy);ctx.restore()}
function line2(s,y,t0,t1,t,o={}){const a=vis(t,t0,t1,.5,.5);if(a<=0)return;ctx.save();ctx.globalAlpha=a*(o.a??.85);ctx.font=`italic 500 ${o.size||54}px ${SERIF}`;ctx.textAlign='center';ctx.fillStyle=o.col||fg();ctx.fillText(s,W/2,y+(1-eOut(prog(t,t0,t0+.6)))*14);ctx.restore()}
function mono(s,x,y,size,col,align='center',ls=3){ctx.save();ctx.font=`500 ${size}px ${MONO}`;ctx.letterSpacing=ls+'px';ctx.textAlign=align;ctx.fillStyle=col;ctx.fillText(s,x,y);ctx.restore()}

// ---------- objetos nuevos ----------
// tablero split-flap con la cifra del día y gráfica de la sesión
function board(t,lt){const tiles=[...'−848.75'],tw=96,th=150,gap=10,tot=tiles.length*(tw+gap)-gap,x0=W/2-tot/2,y0=700;
 mono('DOW JONES · CIERRE · MARTES 17 NOV',W/2,660,26,TH.dark?'rgba(232,232,238,.7)':'rgba(22,22,26,.7)');
 for(let i=0;i<tiles.length;i++){const x=x0+i*(tw+gap);const g=ctx.createLinearGradient(0,y0,0,y0+th);g.addColorStop(0,'#1b1b21');g.addColorStop(.5,'#101014');g.addColorStop(.5,'#0a0a0d');g.addColorStop(1,'#141419');ctx.fillStyle=g;rr(ctx,x,y0,tw,th,8);ctx.fill();ctx.strokeStyle='rgba(232,232,238,.22)';ctx.lineWidth=1.5;ctx.stroke();
  ctx.fillStyle='rgba(0,0,0,.9)';ctx.fillRect(x,y0+th/2-1.5,tw,3);
  ctx.save();ctx.font=`600 110px ${CAPS}`;ctx.textAlign='center';ctx.fillStyle=i===0?BLUE2:'#e8e6e0';if(i===0){ctx.shadowColor=BLUE2;ctx.shadowBlur=20}ctx.fillText(tiles[i],x+tw/2,y0+th/2+38);ctx.restore()}
 mono('S&P 500 −1.03%   ·   NASDAQ −0.74%',W/2,y0+th+60,26,'rgba(232,232,238,.55)');
 // gráfica de la sesión (cae), el punto final late
 const N=60,cx0=150,cx1=930,cy0=1020,cy1=1260;const r=rng(17);let pts=[];let yv=0;for(let i=0;i<=N;i++){yv+= (r()-.38)*.9;pts.push([lerp(cx0,cx1,i/N),cy0+ (i/N)*(cy1-cy0)*.85 + Math.sin(i*.7)*12 + yv*3])}
 ctx.save();ctx.strokeStyle='rgba(232,232,238,.12)';ctx.lineWidth=1;for(let k=0;k<5;k++){const y=lerp(cy0-20,cy1+20,k/4);ctx.beginPath();ctx.moveTo(cx0,y);ctx.lineTo(cx1,y);ctx.stroke()}
 ctx.strokeStyle=BLUE2;ctx.lineWidth=3.5;ctx.shadowColor=BLUE2;ctx.shadowBlur=14;poly(pts);ctx.stroke();const e=pts[N];const pu=.5+.5*Math.sin(lt*4);ctx.fillStyle=BLUE2;ctx.beginPath();ctx.arc(e[0],e[1],7+pu*4,0,7);ctx.fill();ctx.restore()}
// sobre lacrado (open 0..1 = solapa abierta)
function envelope(cx,cy,w,h,open,label){ctx.save();ctx.fillStyle=TH.dark?'#121216':'#f6f3ee';ctx.strokeStyle=TH.line;ctx.lineWidth=3;rr(ctx,cx-w/2,cy-h/2,w,h,6);ctx.fill();ctx.stroke();
 ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-w/2,cy+h/2);ctx.lineTo(cx,cy+h*.05);ctx.lineTo(cx+w/2,cy+h/2);ctx.stroke();
 const fy=lerp(cy+h*.12,cy-h/2-h*.55,eIO(open));ctx.beginPath();ctx.moveTo(cx-w/2,cy-h/2);ctx.lineTo(cx,fy);ctx.lineTo(cx+w/2,cy-h/2);ctx.closePath();ctx.fillStyle=TH.dark?'#18181d':'#efebe4';ctx.fill();ctx.stroke();
 if(open<.35){const a=1-open/.35;ctx.globalAlpha=a;const sx=cx,sy=lerp(cy+h*.12,fy,0)-6;ctx.fillStyle=BLUE;ctx.shadowColor=BLUE2;ctx.shadowBlur=16;ctx.beginPath();for(let i=0;i<14;i++){const q=i/14*Math.PI*2,rr2=48+(i%2?-5:4);ctx.lineTo(sx+Math.cos(q)*rr2,sy+Math.sin(q)*rr2)}ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(sx,sy,30,0,7);ctx.stroke();ctx.globalAlpha=1}
 if(label)mono(label,cx,cy+h/2-28,22,TH.dark?'rgba(232,232,238,.7)':'rgba(22,22,26,.7)');ctx.restore()}
// lluvia de órdenes VENDER
const RAIN=(()=>{const r=rng(23);return Array.from({length:46},()=>({x:80+r()*900,y:r()*2,s:.6+r()*.7,v:.5+r()*.7,b:r()<.18}))})();
function sellRain(t,a){ctx.save();for(const d of RAIN){const y=((d.y+t*d.v*.32)%2)*1300+260;if(y>1440)continue;const w=120*d.s,h=40*d.s;ctx.globalAlpha=a*(d.b?.95:.45)*(1-Math.max(0,(y-1250)/190));ctx.strokeStyle=d.b?BLUE2:'rgba(232,232,238,.8)';ctx.lineWidth=1.6;rr(ctx,d.x-w/2,y-h/2,w,h,4);ctx.stroke();
 ctx.font=`500 ${Math.round(17*d.s)}px ${MONO}`;ctx.letterSpacing='2px';ctx.textAlign='center';ctx.fillStyle=d.b?BLUE2:'rgba(232,232,238,.85)';ctx.fillText('VENDER',d.x,y+6*d.s)}ctx.restore()}
// hoja con la cifra + barras de un año a otro
function revenueSheet(t,k,bars){const cx=540,top=lerp(980,640,eOutExpo(k)),w=640,h=560;ctx.save();ctx.fillStyle='#fbf9f5';ctx.strokeStyle='rgba(22,22,26,.6)';ctx.lineWidth=2;ctx.shadowColor='rgba(0,0,0,.18)';ctx.shadowBlur=30;rr(ctx,cx-w/2,top,w,h,6);ctx.fill();ctx.shadowBlur=0;ctx.stroke();
 mono('INGRESOS DEL TRIMESTRE',cx,top+70,24,'rgba(22,22,26,.65)');ctx.font=`600 120px ${CAPS}`;ctx.textAlign='center';ctx.fillStyle=CHAR;ctx.fillText('$115.8',cx,top+200);mono('MIL MILLONES DE DÓLARES',cx,top+250,22,'rgba(22,22,26,.65)');
 const by=top+h-50,bw=130,maxh=220;const h1=maxh*57/115.8*eOut(bars),h2=maxh*eOutExpo(prog(bars,.35,1));
 ctx.fillStyle='rgba(22,22,26,.25)';ctx.fillRect(cx-170,by-h1,bw,h1);ctx.fillStyle=BLUE;ctx.shadowColor=BLUE2;ctx.shadowBlur=18;ctx.fillRect(cx+40,by-h2,bw,h2);ctx.shadowBlur=0;
 ctx.strokeStyle='rgba(22,22,26,.4)';ctx.beginPath();ctx.moveTo(cx-230,by);ctx.lineTo(cx+230,by);ctx.stroke();
 mono('HACE UN AÑO',cx-105,by+34,18,'rgba(22,22,26,.6)');mono('HOY  +103%',cx+105,by+34,18,BLUE);ctx.restore()}
// gráfica con línea de cierre y sesión extendida
function afterHours(t,k1,k2){const x0=130,xc=640,x1=930,yb=1000;ctx.save();ctx.strokeStyle='rgba(232,232,238,.1)';ctx.lineWidth=1;for(let i=0;i<6;i++){const y=760+i*90;ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x1,y);ctx.stroke()}
 const r=rng(31);const A=[];let y=840;for(let i=0;i<=40;i++){y+=(r()-.3)*14;A.push([lerp(x0,xc,i/40),y])}const n=Math.floor(k1*40);ctx.strokeStyle='rgba(232,232,238,.75)';ctx.lineWidth=3;poly(A.slice(0,n+1));ctx.stroke();
 ctx.setLineDash([10,10]);ctx.strokeStyle='rgba(232,232,238,.45)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(xc,700);ctx.lineTo(xc,1260);ctx.stroke();ctx.setLineDash([]);mono('16:00 · CIERRE',xc,1295,22,'rgba(232,232,238,.7)');
 if(k2>0){const B=[A[40]];let yy=A[40][1];const r2=rng(5);for(let i=1;i<=20;i++){yy-= (r2()*.9+.1)*9;B.push([lerp(xc,x1,i/20),yy])}const m=Math.max(1,Math.floor(eIO(k2)*20));ctx.strokeStyle=BLUE2;ctx.lineWidth=4;ctx.shadowColor=BLUE2;ctx.shadowBlur=18;poly(B.slice(0,m+1));ctx.stroke();const e=B[m];ctx.fillStyle=BLUE2;ctx.beginPath();ctx.arc(e[0],e[1],8,0,7);ctx.fill()}
 ctx.restore()}
// periódico de gran formato
function newspaper(t,tilt){ctx.save();ctx.translate(540,960);ctx.rotate(tilt);const w=620,h=760;ctx.fillStyle='#f7f4ee';ctx.strokeStyle='rgba(22,22,26,.55)';ctx.lineWidth=2;ctx.shadowColor='rgba(0,0,0,.2)';ctx.shadowBlur=26;ctx.fillRect(-w/2,-h/2+80,w,h);ctx.shadowBlur=0;ctx.strokeRect(-w/2,-h/2+80,w,h);
 ctx.font=`600 64px ${CAPS}`;ctx.textAlign='center';ctx.fillStyle=CHAR;ctx.fillText('EL MERCADO',0,-h/2+170);ctx.fillRect(-w/2+30,-h/2+195,w-60,3);
 mono('EDICIÓN DEL MARTES',0,-h/2+232,18,'rgba(22,22,26,.6)');ctx.fillStyle='rgba(22,22,26,.8)';ctx.fillRect(-w/2+30,-h/2+262,w-60,60);
 ctx.fillStyle='rgba(22,22,26,.22)';for(let c=0;c<3;c++)for(let l=0;l<16;l++){const x=-w/2+30+c*((w-60)/3);ctx.fillRect(x+6,-h/2+350+l*28,(w-60)/3-24-(l%5==4?60:0),9)}ctx.restore()}
// silueta gigante con borde azul
function giant(t,k){cam({yaw:Math.sin(t*.2)*.08,pitch:.02,dist:lerp(5.4,4.6,eIO(k)),cy:1330,f:1500});ctx.save();ctx.shadowColor=BLUE2;ctx.shadowBlur=24;human(0,0,{s:1.15,col:'rgba(140,160,255,.9)',lw:1.8,fill:'rgba(5,5,7,.96)'});ctx.restore()}
// orbe azul (el miedo) que pasa de una mano a otra
function orb(x,y,r,t){ctx.save();if(!TH.dark){ctx.fillStyle=BLUE;ctx.shadowColor=BLUE2;ctx.shadowBlur=26;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.restore();return}ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(x,y,1,x,y,r*3);g.addColorStop(0,'rgba(220,228,255,.95)');g.addColorStop(.25,'rgba(92,123,255,.75)');g.addColorStop(1,'rgba(35,70,232,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r*3,0,7);ctx.fill();ctx.restore()}
// dos carriles: el miedo llega primero, el dato después
function lanes(t,kf,kd){const x0=150,x1=900,yf=860,yd=1080;ctx.save();ctx.strokeStyle='rgba(22,22,26,.35)';ctx.lineWidth=2;for(const y of[yf,yd]){ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x1,y);ctx.stroke()}
 ctx.strokeStyle='rgba(22,22,26,.6)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x1,yf-70);ctx.lineTo(x1,yd+70);ctx.stroke();mono('LLEGADA',x1-10,yd+110,18,'rgba(22,22,26,.55)','right');
 mono('MIEDO',x0,yf-26,22,BLUE,'left');mono('DATO',x0,yd-26,22,'rgba(22,22,26,.7)','left');
 const xf=lerp(x0,x1-26,eIO(kf));ctx.fillStyle=BLUE;ctx.shadowColor=BLUE2;ctx.shadowBlur=22;ctx.beginPath();ctx.arc(xf,yf,20,0,7);ctx.fill();ctx.shadowBlur=0;
 ctx.strokeStyle='rgba(35,70,232,.35)';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(Math.max(x0,xf-180),yf);ctx.lineTo(xf-22,yf);ctx.stroke();
 const xd=lerp(x0,x1-60,eIO(kd));ctx.fillStyle='rgba(22,22,26,.85)';ctx.fillRect(xd-30,yd-22,60,44);ctx.restore()}

// ---------- escenas ----------
const SCENES=[
 // 1 · cuadro 0 lleno: tablero −848.75 y la palabra clave ya visibles
 {t0:0,t1:v(5.0),dark:1,draw:(lt,t)=>{lightRays(540,0,520,1500,.45,t);board(t,lt);motes(t,.45);kwFlap('−850 PUNTOS',520,0,v(4.4),t,{size:112,static:1,glow:6})}},
 // 2 · todos esperan el sobre
 {t0:v(5.0),t1:v(9.9),dark:0,draw:(lt,t)=>{envelope(540,800,560,340,0,null);mono('REPORTE TRIMESTRAL · 16:00 ET',540,612,22,'rgba(22,22,26,.7)');
   cam({yaw:Math.PI+lerp(-.12,.12,eIO(prog(t,v(5),v(9.9)))),pitch:.12,dist:5.8,cy:1300,f:1350});for(let i=0;i<5;i++)human(-1.6+i*.8,(i%2)*.35,{s:.85,lw:1.4,fill:'rgba(236,232,225,.85)'});
   kwTrack('UN SOLO REPORTE',520,v(5.65),v(7.7),t,{size:96});kwFlap('NVIDIA',520,v(8.0),v(9.7),t,{size:130,col:BLUE})}},
 // 3 · venden antes de saber (el buzo, quieto, bajo la lluvia de órdenes)
 {t0:v(9.9),t1:v(13.7),dark:1,draw:(lt,t)=>{sellRain(t,eIO(prog(t,v(9.9),v(10.6))));cam({yaw:.25+lt*.04,pitch:.06,dist:4.6,cy:1290,f:1500});human(0,0,{helmet:1,s:1,lw:1.6,fill:'rgba(5,5,7,.92)'});
   kwRise('ANTES DE SABER',520,v(10.8),v(13.4),t,{size:100})}},
 // 4 · se abre el sobre: la cifra
 {t0:v(13.7),t1:v(18.7),dark:0,draw:(lt,t)=>{const op=prog(t,v(13.75),v(14.4));ctx.save();ctx.globalAlpha=1-eIO(prog(t,v(14.9),v(15.6)));envelope(540,1120,600,360,op,null);ctx.restore();revenueSheet(t,prog(t,v(14.3),v(15.1)),prog(t,v(15.6),v(17.0)));
   kwTrack('MÁS DEL DOBLE',520,v(15.64),v(18.4),t,{size:100,col:BLUE})}},
 // 5 · después del cierre, la línea azul sube
 {t0:v(18.7),t1:v(23.6),dark:1,draw:(lt,t)=>{lightRays(800,0,300,1400,.6,t);motes(t,.4);afterHours(t,lerp(.45,1,prog(t,v(18.7),v(19.9))),prog(t,v(20.6),v(22.0)));
   line2('después del cierre',650,v(19.5),v(23.3),t,{size:56});kwFlap('SUBIÓ',520,v(20.9),v(23.3),t,{size:140,col:BLUE2,glow:24})}},
 // 6 · el periódico se tacha
 {t0:v(23.6),t1:v(27.35),dark:0,draw:(lt,t)=>{newspaper(t,lerp(-.06,.03,eIO(prog(t,v(23.6),v(27.35)))));kwRise('NOTICIAS',520,v(24.5),v(27.1),t,{size:120,strike:v(26.2)})}},
 // 7 · se mueve con miedo: la silueta crece
 {t0:v(27.35),t1:v(30.5),dark:1,draw:(lt,t)=>{lightRays(540,0,420,1500,.55,t);giant(t,prog(t,v(27.35),v(30.5)));kwFlap('MIEDO',520,v(27.7),v(30.2),t,{size:150,col:BLUE2,glow:30})}},
 // 8 · el que vende por pánico: el orbe en su mano
 {t0:v(30.5),t1:v(33.4),dark:0,draw:(lt,t)=>{cam({yaw:.15,pitch:.05,dist:4.4,cy:1300,f:1500});const sh=Math.sin(t*38)*.006;CAM.cx+=sh*600;human(-.75,0,{arm:.35,s:1,lw:1.5,fill:'rgba(236,232,225,.85)'});human(.95,.2,{s:1,lw:1.5,fill:'rgba(236,232,225,.85)'});
   const h=P(-.48,1.2,.2);orb(h[0],h[1],16,t);mono('PÁNICO',P(-.75,0,0)[0],1320,22,BLUE);kwTrack('SU MIEDO',520,v(32.0),v(33.3),t,{size:110})}},
 // 9 · lo recibe alguien paciente
 {t0:v(33.4),t1:v(36.7),dark:1,draw:(lt,t)=>{cam({yaw:-.1,pitch:.05,dist:4.4,cy:1300,f:1500});human(-.75,0,{s:1,lw:1.5,fill:'rgba(5,5,7,.9)'});human(.95,.2,{arm:lerp(0,.35,eIO(prog(t,v(33.6),v(34.6)))),s:1,lw:1.5,fill:'rgba(5,5,7,.9)'});
   const k=eIO(prog(t,v(33.5),v(34.9)));const a=P(-.48,1.2,.2),b=P(.68,1.22,.4);const x=lerp(a[0],b[0],k),y=lerp(a[1],b[1],k)-Math.sin(k*Math.PI)*170;orb(x,y,lerp(16,11,k),t);mono('PACIENCIA',P(.95,0,.2)[0],1320,22,'rgba(232,232,238,.75)');
   kwRise('PACIENCIA',520,v(34.4),v(36.5),t,{size:116,col:BLUE2,glow:16})}},
 // 10 · susurro: el miedo llega antes que el dato
 {t0:v(36.7),t1:v(42.6),dark:0,draw:(lt,t)=>{lanes(t,prog(t,v(37.3),v(39.0)),prog(t,v(39.6),v(42.2)));kwTrack('ANTES',520,v(38.2),v(42.3),t,{size:130,col:BLUE});
   line2('El miedo siempre llega antes que el dato.',640,v(37.8),v(42.4),t,{size:52,a:1})}},
 // 11 · loop: vuelve el tablero del cuadro 0
 {t0:v(42.6),t1:END,dark:1,draw:(lt,t)=>{lightRays(540,0,520,1500,.45,t);board(t,lt);motes(t,.45);kwFlap('−850 PUNTOS',520,v(42.75),END,t,{size:112,glow:6})}},
];
window.OVERLAY=t=>{const a=prog(t,END-1.6,END-.1);if(a>0){ctx.fillStyle=`rgba(0,0,0,${eIO(a)})`;ctx.fillRect(0,0,W,H)}};
window.VOICE_OFFSET=V;
window.HITS=[[v(.05),'boom'],[v(5.65),'tick'],[v(8.0),'thud'],[v(10.8),'tick'],[v(13.75),'shutter'],[v(14.3),'thud'],[v(15.64),'boom'],[v(20.9),'bell'],
 [v(26.2),'shutter'],[v(27.7),'boom'],[v(32.0),'tick'],[v(34.9),'thud'],[v(38.2),'tick'],[v(42.75),'boom']];
window.DROPS=[[v(36.7),v(42.6)],[v(46.8),END]];
