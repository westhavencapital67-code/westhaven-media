// Westhaven Noir renderer. Uso:
//   node render_noir.js stills scenes_X.js '[0,1.5,3]'      -> st_<t>.jpg
//   node render_noir.js video  scenes_X.js f0 f1 nombre      -> nombre.mp4 (30 fps, frames [f0,f1))
//   node render_noir.js dur    scenes_X.js                    -> imprime duración
//   node render_noir.js timeline scenes_X.js timeline.json    -> cortes/hits para mix_noir.py
const { chromium } = require('playwright');const { spawn } = require('child_process');const fs=require('fs'),path=require('path');
(async()=>{const [mode,scenes]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
  p.on('pageerror',e=>console.error('PAGEERR',e.message));
  await p.goto('file://'+path.resolve(__dirname,'scene_noir.html')+'?s='+encodeURIComponent(scenes));const dur=await p.evaluate(()=>window.ready);
  const grab=async t=>{const d=await p.evaluate(t=>{renderAt(t);return document.getElementById('c').toDataURL('image/jpeg',.93)},t);return Buffer.from(d.split(',')[1],'base64')};
  if(mode==='dur')console.log(dur);
  else if(mode==='timeline'){const tl=await p.evaluate(()=>({dur:window.DURATION,voice_offset:window.VOICE_OFFSET||0,cuts:SCENES.slice(1).map(s=>s.t0),hits:window.HITS||[],drops:window.DROPS||[]}));fs.writeFileSync(process.argv[4]||'timeline.json',JSON.stringify(tl));console.log(JSON.stringify(tl))}
  else if(mode==='stills'){for(const t of JSON.parse(process.argv[4]))fs.writeFileSync(`st_${t}.jpg`,await grab(t))}
  else{const f0=+process.argv[4],f1=Math.min(+process.argv[5],Math.ceil(dur*30)),name=process.argv[6];const tmp=name+'.tmp.mp4';
    const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-crf','17','-preset','veryfast','-pix_fmt','yuv420p','-r','30',tmp],{stdio:['pipe','ignore','inherit']});
    const T=Date.now();for(let f=f0;f<f1;f++){const buf=await grab(f/30);if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(f%150==0)console.error(name,f,((Date.now()-T)/1000|0)+'s')}
    ff.stdin.end();const code=await new Promise(r=>ff.on('close',r));if(code===0)fs.renameSync(tmp,name+'.mp4');else throw new Error('ffmpeg '+code)}
  await b.close()})();
