// ===== WESTHAVEN NOIR · 06 "9:31 – Trading de venganza" (psicología del day trading) =====
// Estructura NUEVA: línea de tiempo de una sola sesión (9:31 → 9:52) contada minuto a minuto, luego la lección y loop a 9:31.
// Visuales NUEVOS: lápida de mármol grabada, dial de 10 minutos + mes, balanza lógica/ego, pasillo de puertas en travelling,
// torre de contratos que se duplica, escalera cenital, columnata en dolly, columna rota, muro del mercado, libro de cuentas,
// monitor que se apaga, moneda en ranura, calendario que se llena. Entradas de texto: barrido de luz, máquina de escribir, sello, tinta.
// ZONA SEGURA: palabras clave con línea base >= 470, nada importante arriba de y=330 ni debajo de 1450, ni x>930 entre y 920–1790.
const V=0.15, v=x=>x+V, END=v(60.9)+2.7;
window.DURATION=END;
buildCaps([[0.0,1.73,'Nueve treinta y uno de la mañana.'],[1.97,3.28,'Perdiste el primer trade.'],
 [3.84,7.16,'Lo que hagas en los próximos diez minutos decide tu mes.'],
 [8.17,9.61,'Nueve treinta y tres.'],[10.04,11.35,'Tu stop estaba bien.'],[11.67,13.1,'Pero no se siente bien.'],
 [14.01,15.55,'Nueve treinta y seis.'],[15.79,16.83,'Entras otra vez.'],[17.02,18.99,'Ya no hay setup.'],[19.0,19.81,'Solo hay rabia.'],
 [20.72,21.96,'Nueve cuarenta y uno.'],[22.18,23.21,'Doblas el tamaño.'],[23.51,25.57,'Tienes que recuperarlo antes del almuerzo.'],
 [27.3,28.64,'Nueve cincuenta y dos.'],[28.97,31.36,'Ahora perdiste el triple.'],
 [32.37,33.35,'Eso tiene nombre.'],[33.71,35.05,'Trading de venganza.'],
 [35.64,36.85,'No es una estrategia.'],[37.16,41.16,'Es una herida peleando contra un mercado que ni siquiera sabe que existes.'],
 [42.16,44.65,'El mercado no te debe nada.'],
 [45.51,46.82,'El profesional pierde,'],[47.18,50.29,'y apaga la pantalla.'],
 [51.26,53.73,'Porque la pérdida pequeña se paga una vez.'],[54.06,56.07,'La venganza se paga todos los días.'],
 [57.62,59.34,'Nueve treinta y uno de la mañana.'],[59.58,60.88,'Perdiste el primer trade.']].map(([a,b,s])=>[v(a),v(b),s]));

// ---------- tipografía nueva ----------
const fg=()=>TH.dark?INK:CHAR;
function cam(o){CAM=Object.assign({yaw:0,pitch:.08,dist:4.2,f:1500,cx:W/2,cy:H*.5,scale:1},o)}
function fitW(s,size,font,ls,maxW=760){ctx.save();ctx.font=`600 ${size}px ${font}`;ctx.letterSpacing=ls+'px';const m=ctx.measureText(s).width;ctx.restore();return m>maxW?Math.floor(size*maxW/m):size}
function outFade(t,t1){const p=prog(t,t1,t1+.7);return {a:1-eIn(p),dy:-40*eIn(p),ls:18*eIn(p)}}
// barrido de luz: el texto se revela de izquierda a derecha con un filo brillante
function kwSweep(s,y,t0,t1,t,o={}){if(t<t0||t>t1+.7)return;const ls=o.ls??14,size=fitW(s,o.size||120,CAPS,ls);const k=eIO(prog(t,t0,t0+(o.dur||.9)));const X=outFade(t,t1);
 ctx.save();ctx.font=`600 ${size}px ${CAPS}`;ctx.letterSpacing=(ls+X.ls)+'px';ctx.textAlign='center';const w=ctx.measureText(s).width;const x0=W/2-w/2-20,edge=x0+(w+40)*k;
 ctx.globalAlpha=X.a;ctx.beginPath();ctx.rect(0,y-size-40+X.dy,edge,size+90);ctx.clip();ctx.fillStyle=o.col||fg();if(o.glow){ctx.shadowColor=BLUE2;ctx.shadowBlur=o.glow}ctx.fillText(s,W/2,y+X.dy);ctx.restore();
 if(k<1){ctx.save();const g=ctx.createLinearGradient(edge-60,0,edge+10,0);g.addColorStop(0,'rgba(92,123,255,0)');g.addColorStop(1,'rgba(160,180,255,.9)');ctx.fillStyle=g;ctx.fillRect(edge-60,y-size-10,70,size+40);ctx.restore()}}
// máquina de escribir con cursor
function kwType(s,y,t0,t1,t,o={}){if(t<t0||t>t1+.7)return;const ls=o.ls??12,size=fitW(s,o.size||110,CAPS,ls);const n=Math.min(s.length,Math.floor((t-t0)/(o.cps||.07))+1);const X=outFade(t,t1);
 ctx.save();ctx.font=`600 ${size}px ${CAPS}`;ctx.letterSpacing=(ls+X.ls)+'px';ctx.textAlign='left';const w=ctx.measureText(s).width;const x0=W/2-w/2;ctx.globalAlpha=X.a;ctx.fillStyle=o.col||fg();if(o.glow){ctx.shadowColor=BLUE2;ctx.shadowBlur=o.glow}
 const part=s.slice(0,n);ctx.fillText(part,x0,y+X.dy);const pw=ctx.measureText(part).width;ctx.shadowBlur=0;if(t<t1&&Math.floor(t*2.4)%2===0){ctx.fillStyle=BLUE2;ctx.fillRect(x0+pw+10,y-size*.78,Math.max(6,size*.08),size*.86)}ctx.restore()}
// sello: entra grande y se asienta con un anillo de impacto
function kwStamp(s,y,t0,t1,t,o={}){if(t<t0||t>t1+.7)return;const ls=o.ls??14,size=fitW(s,o.size||130,CAPS,ls);const k=eOutExpo(prog(t,t0,t0+.35));const X=outFade(t,t1);
 ctx.save();ctx.translate(W/2,y-size*.35+X.dy);ctx.scale(lerp(1.35,1,k),lerp(1.35,1,k));ctx.globalAlpha=X.a*clamp(k*1.6);ctx.font=`600 ${size}px ${CAPS}`;ctx.letterSpacing=(ls+X.ls)+'px';ctx.textAlign='center';ctx.fillStyle=o.col||fg();if(o.glow){ctx.shadowColor=BLUE2;ctx.shadowBlur=o.glow}ctx.fillText(s,0,size*.35);ctx.restore();
 const r=prog(t,t0+.12,t0+.8);if(r>0&&r<1){ctx.save();ctx.strokeStyle=BLUE2;ctx.globalAlpha=(1-r)*.6;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(W/2,y-size*.35,200+r*260,60+r*90,0,0,7);ctx.stroke();ctx.restore()}}
// tinta: se condensa desde un halo difuso (solo texto, sin blur en figuras)
function kwInk(s,y,t0,t1,t,o={}){if(t<t0||t>t1+.7)return;const ls=o.ls??14,size=fitW(s,o.size||120,CAPS,ls);const k=eOut(prog(t,t0,t0+.8));const X=outFade(t,t1);
 ctx.save();ctx.font=`600 ${size}px ${CAPS}`;ctx.letterSpacing=(ls+X.ls+(1-k)*30)+'px';ctx.textAlign='center';ctx.globalAlpha=X.a*k;ctx.filter=`blur(${(1-k)*14}px)`;ctx.fillStyle=o.col||fg();if(o.glow){ctx.shadowColor=BLUE2;ctx.shadowBlur=o.glow}ctx.fillText(s,W/2,y+X.dy);ctx.restore()}
function line2(s,y,t0,t1,t,o={}){const a=vis(t,t0,t1,.5,.5);if(a<=0)return;ctx.save();ctx.globalAlpha=a*(o.a??.85);ctx.font=`italic 500 ${o.size||54}px ${SERIF}`;ctx.textAlign='center';ctx.fillStyle=o.col||fg();ctx.fillText(s,W/2,y+(1-eOut(prog(t,t0,t0+.6)))*14);ctx.restore()}
// sello de hora estilo terminal
function stamp(txt,t0,t,dark){const a=eOut(prog(t,t0,t0+.4));if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.font=`500 34px ${MONO}`;ctx.textAlign='left';const w=ctx.measureText(txt).width;
 ctx.strokeStyle=BLUE;ctx.lineWidth=2;rr(ctx,96,372,w+44,58,8);ctx.stroke();ctx.fillStyle=BLUE;ctx.beginPath();ctx.arc(118,401,6,0,7);ctx.fill();ctx.fillStyle=fg();ctx.fillText(txt,136,413);ctx.restore()}

// ---------- objetos nuevos ----------
// lápida de mármol con hora grabada y grieta azul
function slab(t,crack,label){const cx=540,cy=900,w=760,h=520;ctx.save();
 const g=ctx.createLinearGradient(cx-w/2,cy-h/2,cx+w/2,cy+h/2);g.addColorStop(0,'#141418');g.addColorStop(.5,'#0b0b0e');g.addColorStop(1,'#18181d');ctx.fillStyle=g;rr(ctx,cx-w/2,cy-h/2,w,h,14);ctx.fill();
 ctx.strokeStyle='rgba(232,232,238,.35)';ctx.lineWidth=2;ctx.stroke();
 ctx.save();ctx.beginPath();rr(ctx,cx-w/2,cy-h/2,w,h,14);ctx.clip();ctx.strokeStyle='rgba(255,255,255,.05)';ctx.lineWidth=1.2;const r=rng(4);for(let i=0;i<14;i++){ctx.beginPath();let x=cx-w/2+r()*w,y=cy-h/2;ctx.moveTo(x,y);for(let k=0;k<8;k++){x+=(r()-.5)*90;y+=h/8;ctx.lineTo(x,y)}ctx.stroke()}
 const sx=cx-w/2+((t*.22)%1.6-.3)*w;const sg=ctx.createLinearGradient(sx-120,0,sx+120,0);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,'rgba(190,205,255,.10)');sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.fillRect(sx-120,cy-h/2,240,h);ctx.restore();
 ctx.font=`600 300px ${CAPS}`;ctx.letterSpacing='10px';ctx.textAlign='center';ctx.fillStyle='rgba(0,0,0,.85)';ctx.fillText('9:31',cx+4,cy+108);ctx.fillStyle='#d9d6cf';ctx.shadowColor='rgba(92,123,255,.35)';ctx.shadowBlur=18;ctx.fillText('9:31',cx,cy+102);ctx.shadowBlur=0;
 if(crack>0){ctx.strokeStyle=BLUE2;ctx.shadowColor=BLUE2;ctx.shadowBlur=16;ctx.lineWidth=3;ctx.beginPath();const pts=[[cx-w/2+30,cy-60],[cx-200,cy-20],[cx-120,cy+40],[cx-10,cy+10],[cx+90,cy+80],[cx+200,cy+40],[cx+w/2-30,cy+110]];const n=(pts.length-1)*crack;ctx.moveTo(...pts[0]);for(let i=1;i<=Math.ceil(n);i++){const f=Math.min(1,n-(i-1));const a=pts[i-1],b=pts[i];ctx.lineTo(lerp(a[0],b[0],f),lerp(a[1],b[1],f))}ctx.stroke()}
 if(label){ctx.shadowBlur=0;ctx.font=`500 26px ${MONO}`;ctx.letterSpacing='3px';ctx.fillStyle='rgba(232,232,238,.75)';ctx.fillText(label,cx,cy+h/2-36)}
 ctx.restore()}
// dial de 10 minutos + mes de 30 días
function dial(t,k,dim){const cx=540,cy=820,R=230;ctx.save();ctx.lineCap='round';ctx.strokeStyle='rgba(22,22,26,.18)';ctx.lineWidth=18;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.stroke();
 ctx.strokeStyle=BLUE;ctx.lineWidth=18;ctx.beginPath();ctx.arc(cx,cy,R,-Math.PI/2,-Math.PI/2+Math.PI*2*k);ctx.stroke();
 for(let i=0;i<10;i++){const q=-Math.PI/2+i/10*Math.PI*2;ctx.strokeStyle=CHAR;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(cx+Math.cos(q)*(R-40),cy+Math.sin(q)*(R-40));ctx.lineTo(cx+Math.cos(q)*(R-62),cy+Math.sin(q)*(R-62));ctx.stroke()}
 ctx.font=`600 92px ${CAPS}`;ctx.textAlign='center';ctx.fillStyle=CHAR;ctx.fillText(String(Math.min(10,Math.floor(k*10))).padStart(2,'0'),cx,cy+34);ctx.font=`500 24px ${MONO}`;ctx.fillText('MIN',cx,cy+78);
 const gx=250,gy=1130,cw=82,ch=46;for(let i=0;i<30;i++){const c=i%7,r=Math.floor(i/7);const off=i/30<dim;ctx.globalAlpha=off?.15:.85;ctx.strokeStyle=CHAR;ctx.lineWidth=2;ctx.strokeRect(gx+c*cw,gy+r*ch,cw-10,ch-10)}ctx.globalAlpha=1;ctx.restore()}
// balanza lógica / ego
function scale(t,tilt){const cx=540,top=640;ctx.save();ctx.strokeStyle=TH.line;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(cx,top);ctx.lineTo(cx,1180);ctx.stroke();ctx.beginPath();ctx.moveTo(cx-120,1180);ctx.lineTo(cx+120,1180);ctx.stroke();
 ctx.beginPath();ctx.arc(cx,top,12,0,7);ctx.fillStyle=BLUE2;ctx.fill();const L=300,a=tilt*.35;const lx=cx-Math.cos(a)*L,ly=top-Math.sin(a)*L,rx=cx+Math.cos(a)*L,ry=top+Math.sin(a)*L;ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(rx,ry);ctx.stroke();
 const pan=(x,y,lab,col)=>{ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-90,y+190);ctx.moveTo(x,y);ctx.lineTo(x+90,y+190);ctx.stroke();ctx.beginPath();ctx.ellipse(x,y+190,110,24,0,0,7);ctx.stroke();ctx.font=`600 40px ${CAPS}`;ctx.letterSpacing='8px';ctx.textAlign='center';ctx.fillStyle=col;ctx.fillText(lab,x,y+270)};
 pan(lx,ly,'LÓGICA',TH.dark?INK:CHAR);pan(rx,ry,'EGO',BLUE2);ctx.restore()}
// pasillo de puertas en travelling lateral
function doorway(x,y,w,h,glow){ctx.save();ctx.strokeStyle='rgba(22,22,26,.8)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-w/2,y+h);ctx.lineTo(x-w/2,y+w/2);ctx.arc(x,y+w/2,w/2,Math.PI,0);ctx.lineTo(x+w/2,y+h);ctx.stroke();
 if(glow>0){ctx.globalAlpha=glow;ctx.fillStyle='rgba(35,70,232,.35)';ctx.beginPath();ctx.moveTo(x-w/2+8,y+h);ctx.lineTo(x-w/2+8,y+w/2);ctx.arc(x,y+w/2,w/2-8,Math.PI,0);ctx.lineTo(x+w/2-8,y+h);ctx.closePath();ctx.fill()}ctx.restore()}
// torre de contratos que se duplica
function block(x,y,w,h,d,hl){ctx.save();ctx.fillStyle=hl?'rgba(35,70,232,.55)':'rgba(10,10,13,.95)';ctx.strokeStyle=hl?BLUE2:'rgba(232,232,238,.85)';ctx.lineWidth=2;
 ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w,y);ctx.lineTo(x+w+d,y-d*.6);ctx.lineTo(x+d,y-d*.6);ctx.closePath();ctx.fill();ctx.stroke();ctx.beginPath();ctx.rect(x,y,w,h);ctx.fill();ctx.stroke();
 ctx.beginPath();ctx.moveTo(x+w,y);ctx.lineTo(x+w+d,y-d*.6);ctx.lineTo(x+w+d,y+h-d*.6);ctx.lineTo(x+w,y+h);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}
// escalera vista desde arriba (cenital)
function stairs(t,depth){const cx=540,cy=900;ctx.save();for(let i=0;i<12;i++){const s=420*Math.pow(.82,i);const a=i*.18+t*.05;ctx.save();ctx.translate(cx,cy);ctx.rotate(a);ctx.globalAlpha=lerp(.9,.15,i/12);ctx.strokeStyle=i<depth?BLUE2:TH.line;ctx.lineWidth=i<depth?3:2;ctx.strokeRect(-s,-s,s*2,s*2);ctx.restore()}ctx.restore()}
// columnata en perspectiva con dolly
function colonnade(t,z){const vx=540,vy=840;ctx.save();ctx.strokeStyle=TH.line;for(let i=0;i<9;i++){const d=((i-z)%9+9)%9;const p=1/(1+d*.55);const ox=420*p,h=900*p,w=60*p;ctx.globalAlpha=clamp(p*1.4);ctx.lineWidth=2;
 for(const sd of[-1,1]){const x=vx+sd*ox;ctx.strokeRect(x-w/2,vy-h*.45,w,h);for(let f=1;f<4;f++){ctx.beginPath();ctx.moveTo(x-w/2+f*w/4,vy-h*.45);ctx.lineTo(x-w/2+f*w/4,vy+h*.55);ctx.stroke()}ctx.strokeRect(x-w*.7,vy-h*.45-12*p,w*1.4,12*p)}}
 ctx.globalAlpha=1;const g=ctx.createRadialGradient(vx,vy,0,vx,vy,120);g.addColorStop(0,'rgba(92,123,255,.9)');g.addColorStop(1,'rgba(35,70,232,0)');ctx.fillStyle=g;ctx.fillRect(vx-120,vy-160,240,320);
 ctx.strokeStyle=TH.dim;ctx.lineWidth=1.4;for(let i=-8;i<=8;i++){ctx.beginPath();ctx.moveTo(vx+i*8,vy+60);ctx.lineTo(vx+i*190,1500);ctx.stroke()}ctx.restore()}
// columna rota
function brokenColumn(t,k){const cx=540,base=1240,w=150;ctx.save();ctx.strokeStyle='rgba(22,22,26,.85)';ctx.fillStyle='rgba(236,232,225,.7)';ctx.lineWidth=3;
 ctx.fillRect(cx-w*.8,base,w*1.6,26);ctx.strokeRect(cx-w*.8,base,w*1.6,26);ctx.beginPath();ctx.moveTo(cx-w/2,base);ctx.lineTo(cx-w/2,860);ctx.lineTo(cx-20,840);ctx.lineTo(cx+30,880);ctx.lineTo(cx+w/2,850);ctx.lineTo(cx+w/2,base);ctx.closePath();ctx.fill();ctx.stroke();
 for(let f=1;f<6;f++){ctx.beginPath();ctx.moveTo(cx-w/2+f*w/6,base);ctx.lineTo(cx-w/2+f*w/6,870);ctx.stroke()}
 const fall=eIO(k);ctx.save();ctx.translate(cx+w/2+lerp(0,140,fall),lerp(780,1180,fall));ctx.rotate(lerp(-.15,1.35,fall));ctx.fillRect(-w/2,-200,w,200);ctx.strokeRect(-w/2,-200,w,200);for(let f=1;f<6;f++){ctx.beginPath();ctx.moveTo(-w/2+f*w/6,-200);ctx.lineTo(-w/2+f*w/6,0);ctx.stroke()}ctx.restore();
 const c=prog(t,v(37.16),v(38.4));if(c>0){ctx.strokeStyle=BLUE;ctx.shadowColor=BLUE2;ctx.shadowBlur=14;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(cx-20,842);ctx.lineTo(cx-10,lerp(842,980,c));ctx.lineTo(cx+20,lerp(842,1080,c));ctx.lineTo(cx-5,lerp(842,1210,c));ctx.stroke()}ctx.restore()}
// muro del mercado (miles de líneas) frente a una figura mínima
function marketWall(t,zoom){ctx.save();ctx.translate(540,820);ctx.scale(zoom,zoom);ctx.translate(-540,-820);const r=rng(21);ctx.lineWidth=1.2;
 for(let row=0;row<26;row++){ctx.strokeStyle=row%7===3?'rgba(92,123,255,.55)':'rgba(232,232,238,.22)';ctx.beginPath();let y=420+row*32;for(let x=-200;x<=1280;x+=12){const yy=y+Math.sin(x*.02+row+t*1.2)*8+(r()-.5)*10;x===-200?ctx.moveTo(x,yy):ctx.lineTo(x,yy)}ctx.stroke()}
 ctx.restore();ctx.save();ctx.fillStyle=INK;ctx.globalAlpha=.9;const hx=540,hy=1290;ctx.beginPath();ctx.arc(hx,hy-46,7,0,7);ctx.fill();ctx.fillRect(hx-5,hy-38,10,30);ctx.fillRect(hx-6,hy-8,4,22);ctx.fillRect(hx+2,hy-8,4,22);ctx.restore()}
// libro de cuentas
function ledger(t,k){const cx=540,cy=900;ctx.save();ctx.fillStyle='rgba(255,255,255,.55)';ctx.strokeStyle='rgba(22,22,26,.8)';ctx.lineWidth=3;
 ctx.beginPath();ctx.moveTo(cx,cy-300);ctx.quadraticCurveTo(cx-200,cy-340,cx-400,cy-300);ctx.lineTo(cx-400,cy+300);ctx.quadraticCurveTo(cx-200,cy+260,cx,cy+300);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.beginPath();ctx.moveTo(cx,cy-300);ctx.quadraticCurveTo(cx+200,cy-340,cx+400,cy-300);ctx.lineTo(cx+400,cy+300);ctx.quadraticCurveTo(cx+200,cy+260,cx,cy+300);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.strokeStyle='rgba(22,22,26,.18)';ctx.lineWidth=1.5;for(let i=0;i<11;i++){const y=cy-220+i*44;ctx.beginPath();ctx.moveTo(cx-370,y);ctx.lineTo(cx-30,y);ctx.moveTo(cx+30,y);ctx.lineTo(cx+370,y);ctx.stroke()}
 ctx.font=`600 34px ${CAPS}`;ctx.letterSpacing='6px';ctx.textAlign='center';ctx.fillStyle=CHAR;ctx.fillText('TE DEBE',cx-200,cy-240);ctx.fillText('LE DEBES',cx+200,cy-240);
 ctx.font=`italic 500 64px ${SERIF}`;ctx.letterSpacing='0px';const a=prog(t,v(42.4),v(43.2)),b=prog(t,v(43.0),v(43.8));ctx.globalAlpha=eOut(a);ctx.fillText('0.00',cx-200,cy+40);ctx.globalAlpha=eOut(b);ctx.fillStyle=BLUE;ctx.fillText('0.00',cx+200,cy+40);ctx.restore()}
// monitor que se apaga (colapso tipo CRT)
function monitor(t,off){const cx=540,cy=860,w=640,h=400;ctx.save();ctx.strokeStyle=TH.line;ctx.lineWidth=4;rr(ctx,cx-w/2,cy-h/2,w,h,18);ctx.stroke();ctx.beginPath();ctx.moveTo(cx-60,cy+h/2);ctx.lineTo(cx-90,cy+h/2+110);ctx.lineTo(cx+90,cy+h/2+110);ctx.lineTo(cx+60,cy+h/2);ctx.stroke();
 const sy=off<.5?1-eIn(off*2):0,sx=off<.5?1:1-eIO((off-.5)*2);if(sx>0){ctx.save();ctx.beginPath();ctx.rect(cx-(w/2-20)*sx,cy-(h/2-20)*sy-2,(w-40)*sx,(h-40)*sy+4);ctx.clip();ctx.fillStyle='rgba(35,70,232,.10)';ctx.fillRect(cx-w/2,cy-h/2,w,h);
  const r=rng(8);let p=cy;for(let i=0;i<22;i++){const x=cx-w/2+40+i*26;const o=p,c=o+(r()-.45)*40;ctx.strokeStyle=c>o?'rgba(232,232,238,.85)':BLUE2;ctx.lineWidth=3;ctx.strokeRect(x,Math.min(o,c),14,Math.max(3,Math.abs(c-o)));p=c}
  if(off>0){ctx.fillStyle=`rgba(220,228,255,${off*1.2})`;ctx.fillRect(cx-w/2,cy-4,w,8)}ctx.restore()}
 if(off>.5&&off<1){ctx.fillStyle='#fff';ctx.globalAlpha=1-off;ctx.beginPath();ctx.arc(cx,cy,10,0,7);ctx.fill()}ctx.restore()}
// moneda que cae en la ranura
function coinSlot(t,k){const cx=540;ctx.save();ctx.strokeStyle='rgba(22,22,26,.85)';ctx.lineWidth=3;rr(ctx,cx-220,1000,440,260,20);ctx.stroke();ctx.fillStyle=CHAR;rr(ctx,cx-70,1010,140,14,7);ctx.fill();
 const y=lerp(620,1000,eIn(clamp(k)));if(k<1.02){ctx.save();ctx.beginPath();ctx.rect(0,0,W,1010);ctx.clip();ctx.translate(cx,y);ctx.scale(1,1);ctx.strokeStyle=BLUE;ctx.fillStyle='rgba(35,70,232,.25)';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(0,0,22,80,0,0,7);ctx.fill();ctx.stroke();ctx.restore()}
 const r=prog(t,v(52.4),v(53.4));if(r>0&&r<1){ctx.strokeStyle=BLUE2;ctx.globalAlpha=1-r;ctx.beginPath();ctx.ellipse(cx,1017,90+r*200,14+r*40,0,0,7);ctx.stroke()}ctx.restore()}
// calendario que se llena
function calendar(t,k){const gx=150,gy=640,cw=112,ch=112;ctx.save();ctx.font=`500 22px ${MONO}`;ctx.textAlign='left';for(let i=0;i<35;i++){const c=i%7,r=Math.floor(i/7);const x=gx+c*cw,y=gy+r*ch;ctx.strokeStyle='rgba(232,232,238,.35)';ctx.lineWidth=2;ctx.strokeRect(x,y,cw-12,ch-12);
 ctx.fillStyle='rgba(232,232,238,.45)';ctx.fillText(String(i+1),x+8,y+26);const f=clamp(k*35-i);if(f>0){ctx.strokeStyle=BLUE2;ctx.lineWidth=4;ctx.shadowColor=BLUE2;ctx.shadowBlur=10;const q=eOut(f);ctx.beginPath();ctx.moveTo(x+20,y+30);ctx.lineTo(lerp(x+20,x+cw-32,q),lerp(y+30,y+ch-32,q));ctx.moveTo(x+cw-32,y+30);ctx.lineTo(lerp(x+cw-32,x+20,q),lerp(y+30,y+ch-32,q));ctx.stroke();ctx.shadowBlur=0}}ctx.restore()}

const SCENES=[
 // 1 · cuadro 0: lápida 9:31 ya grabada (hook visual inmediato)
 {t0:0,t1:v(3.55),dark:1,draw:(lt,t)=>{lightRays(180,0,260,1500,.35,t);slab(t,eOut(prog(t,v(1.97),v(3.3))),'SESIÓN NY · PRIMER TRADE · −1R');motes(t,.5)}},
 // 2 · 10 minutos deciden tu mes
 {t0:v(3.55),t1:v(7.75),dark:0,draw:(lt,t)=>{dial(t,eIO(prog(t,v(3.9),v(7.4))),prog(t,v(6.2),v(7.6)));kwType('10 MINUTOS',520,v(4.6),v(7.5),t,{size:100})}},
 // 3 · 9:33 la balanza
 {t0:v(7.75),t1:v(13.6),dark:1,draw:(lt,t)=>{stamp('09:33',v(8.17),t);floor(t,1260,.4);const tilt=lerp(0,-.05,eIO(prog(t,v(10.0),v(11.3))))+lerp(0,.75,eIO(prog(t,v(11.7),v(12.9))));scale(t,tilt);
   kwSweep('BIEN',540,v(10.1),v(11.5),t,{size:120});kwSweep('NO SE SIENTE',540,v(11.75),v(13.4),t,{size:96,col:BLUE2,glow:22})}},
 // 4 · 9:36 travelling lateral por puertas
 {t0:v(13.6),t1:v(20.25),dark:0,draw:(lt,t)=>{stamp('09:36',v(14.0),t);const pan=eIO(prog(t,v(15.6),v(19.6)))*900;ctx.save();ctx.translate(-pan,0);
   for(let i=0;i<7;i++){const x=300+i*300;doorway(x,760,180,460,i===Math.round(pan/300)+1&&t<v(18.9)?.8:0)}
   ctx.strokeStyle='rgba(22,22,26,.25)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,1222);ctx.lineTo(3000,1222);ctx.stroke();ctx.restore();
   cam({yaw:1.45,pitch:.04,dist:4.6,cy:1225,f:1500});human(0,0,{walk:1,step:lt*1.4,s:.95,fill:'rgba(236,232,225,.75)',lw:1.5});
   const wall=eIO(prog(t,v(18.9),v(19.6)));if(wall>0){ctx.fillStyle=`rgba(22,22,26,${wall*.9})`;ctx.fillRect(700,700,40,520)}
   kwInk('OTRA VEZ',520,v(15.8),v(18.2),t,{size:104});kwStamp('RABIA',520,v(19.0),v(20.1),t,{size:140,col:BLUE})}},
 // 5 · 9:41 la torre se duplica
 {t0:v(20.25),t1:v(26.85),dark:1,draw:(lt,t)=>{floor(t,1250,.5,.3);lightRays(470,0,300,1500,.6,t);ctx.save();ctx.setLineDash([10,12]);ctx.strokeStyle='rgba(92,123,255,.35)';ctx.lineWidth=2;ctx.strokeRect(400,1250-16*34-10,180,16*34+10);ctx.restore();stamp('09:41',v(20.72),t);const steps=[v(22.2),v(22.7),v(23.2),v(23.9)];let n=1;for(const s of steps)if(t>s)n*=2;n=Math.min(n,16);
   const lean=lerp(0,.12,eIO(prog(t,v(23.5),v(26.3))))+Math.sin(lt*2)*.004*n;ctx.save();ctx.translate(470,1250);ctx.rotate(lean);for(let i=0;i<n;i++){const k=eOutExpo(prog(t,i===0?0:steps[Math.floor(Math.log2(i))]||0,(i===0?0:steps[Math.floor(Math.log2(i))]||0)+.35));if(k<=0)continue;block(-70,-(i+1)*34-(1-k)*120,140,30,40,i===n-1)}ctx.restore();
   kwStamp('× 2',520,v(22.2),v(23.4),t,{size:150,col:BLUE2,glow:26});line2('antes del almuerzo',600,v(23.6),v(26.4),t,{size:56})}},
 // 6 · 9:52 escalera cenital, −3R
 {t0:v(26.85),t1:v(31.85),dark:0,draw:(lt,t)=>{stamp('09:52',v(27.3),t);const d=Math.floor(prog(t,v(28.9),v(30.8))*9);stairs(lt,d);
   const n=t<v(29.6)?'−1R':t<v(30.2)?'−2R':'−3R';kwStamp(n,540,v(28.97)+(n==='−1R'?0:n==='−2R'?.63:1.23),v(31.6),t,{size:150,col:n==='−3R'?BLUE:CHAR})}},
 // 7 · columnata: trading de venganza
 {t0:v(31.85),t1:v(35.4),dark:1,draw:(lt,t)=>{colonnade(t,lt*.9);kwType('VENGANZA',540,v(33.7),v(35.25),t,{size:120,cps:.08,glow:20});line2('eso tiene nombre',620,v(32.4),v(33.6),t,{size:54})}},
 // 8 · columna rota: una herida
 {t0:v(35.4),t1:v(39.3),dark:0,draw:(lt,t)=>{brokenColumn(t,prog(t,v(35.7),v(36.6)));kwSweep('ESTRATEGIA',520,v(35.65),v(36.9),t,{size:100});
   const s=prog(t,v(36.4),v(36.8));if(s>0&&t<v(37.0)){ctx.save();ctx.strokeStyle=BLUE;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(190,488);ctx.lineTo(lerp(190,890,eOut(s)),488);ctx.stroke();ctx.restore()}
   kwInk('UNA HERIDA',520,v(37.2),v(39.1),t,{size:110,col:BLUE})}},
 // 9 · zoom out: el muro del mercado
 {t0:v(39.3),t1:v(41.65),dark:1,draw:(lt,t)=>{marketWall(t,lerp(1.9,1,eIO(prog(t,v(39.3),v(41.4)))));line2('ni siquiera sabe que existes',560,v(39.6),v(41.5),t,{size:56})}},
 // 10 · libro de cuentas: nada
 {t0:v(41.65),t1:v(45.0),dark:0,draw:(lt,t)=>{ledger(t);kwStamp('NADA',540,v(44.2),v(44.85),t,{size:150,col:BLUE})}},
 // 11 · el monitor se apaga
 {t0:v(45.0),t1:v(50.75),dark:1,draw:(lt,t)=>{lightRays(860,0,260,1500,.35,t);monitor(t,prog(t,v(48.8),v(49.9)));kwSweep('PIERDE',540,v(45.5),v(46.9),t,{size:120});kwType('Y APAGA',540,v(47.2),v(50.5),t,{size:120,glow:18})}},
 // 12 · una sola moneda
 {t0:v(50.75),t1:v(53.9),dark:0,draw:(lt,t)=>{coinSlot(t,prog(t,v(51.4),v(52.4)));kwStamp('UNA VEZ',540,v(52.5),v(53.75),t,{size:130})}},
 // 13 · el calendario se llena
 {t0:v(53.9),t1:v(57.3),dark:1,draw:(lt,t)=>{ctx.save();const z=lerp(1.12,.96,eIO(prog(t,v(53.9),v(57.3))));ctx.translate(540,920);ctx.scale(z,z);ctx.translate(-540,-920);calendar(t,eIn(prog(t,v(54.1),v(56.4))));ctx.restore();
   kwSweep('TODOS LOS DÍAS',520,v(54.1),v(57.1),t,{size:84,col:BLUE2,glow:20})}},
 // 14 · loop: de vuelta a la lápida 9:31
 {t0:v(57.3),t1:END,dark:1,draw:(lt,t)=>{lightRays(180,0,260,1500,.35,t);slab(t,1,'SESIÓN NY · PRIMER TRADE · −1R');motes(t,.5);line2('Ahora sabes qué hacer.',560,v(59.6),END-.3,t,{size:62,col:BLUE2,a:1})}},
];
window.OVERLAY=t=>{const a=prog(t,END-1.7,END-.15);if(a>0){ctx.fillStyle=`rgba(0,0,0,${eIO(a)})`;ctx.fillRect(0,0,W,H)}};
window.VOICE_OFFSET=V;
window.HITS=[[v(.05),'boom'],[v(1.97),'thud'],[v(4.6),'tick'],[v(8.17),'tick'],[v(11.75),'thud'],[v(14.0),'tick'],[v(19.0),'boom'],[v(20.72),'tick'],
 [v(22.2),'thud'],[v(22.7),'thud'],[v(23.2),'thud'],[v(23.9),'thud'],[v(27.3),'tick'],[v(28.97),'thud'],[v(29.6),'thud'],[v(30.2),'boom'],[v(33.7),'shutter'],
 [v(37.2),'thud'],[v(44.2),'boom'],[v(48.8),'shutter'],[v(52.4),'bell'],[v(54.1),'tick'],[v(57.62),'boom']];
window.DROPS=[[v(31.85),v(35.4)],[v(57.3),END]];
