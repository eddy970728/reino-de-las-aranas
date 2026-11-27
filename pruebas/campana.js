// Recorre la campaña entera: en cada capitulo el jugador automatico juega un rato y luego se fuerza la victoria.
// Comprueba que cada paso al siguiente capitulo, el final, los creditos y la vuelta al titulo funcionan sin errores.
const {abre}=require('./comun');
(async()=>{const F=process.argv[2]||'../index.html',juego=+(process.argv[3]||12000),m=+(process.argv[4]||0);
const {b,pg,errs}=await abre(F);const vistos=[];let mal=0;
await pg.evaluate(m=>{SPD=.02;MUSV=0;SFXV=0;usaPartida(1);localStorage.setItem('ra_modo',m);MODO=m;NEWCAP=0;PIDETUT=0;NUEVAP=1;go(0,1);BOT.empieza(20)},m);
let cap=-1,t0=Date.now(),fz=0,ult='',tq=Date.now();
for(;;){await pg.waitForTimeout(500);
 const s=await pg.evaluate(()=>({cap:CAP,ti:!TI.hidden,fv:FVE.hidden?'':document.getElementById('fvt').textContent,mode,fin:String(fin||''),crf:!document.getElementById('crf').hidden,meta:JSON.stringify(metaDe(1)||{}),log:BOT.log.splice(0)}));
 s.log.forEach(l=>errs.push(l));
 if(s.cap!==cap&&s.mode=='map'){cap=s.cap;t0=Date.now();fz=0;vistos.push(cap);console.log('capítulo',cap,'empieza')}
 if(s.ti&&vistos.length>=9&&!s.crf){console.log('de vuelta en el título · meta',s.meta);break}
 if(!fz&&s.mode=='map'&&!s.fin&&Date.now()-t0>juego){await pg.evaluate(()=>BOT.para());
  let q=false;for(let i=0;i<600&&!q;i++){await pg.waitForTimeout(100);q=await pg.evaluate(()=>{if(DLAV){DLAV();return false}const d=document.getElementById('dl');if(!d.hidden){d.click();return false}if(!AM.hidden){const b=[...AMB.querySelectorAll('button')].find(b=>/ESPERAR|CERRAR|CANCELAR|VOLVER/.test(b.textContent))||AMB.querySelector('button');if(b)b.click();return false}return mode=='map'&&!bz&&!fin&&phase=='player'})}
  fz=1;await pg.evaluate(()=>{fin='¡VICTORIA!';BOT.empieza(20)});console.log('  victoria forzada en',cap)}
 const firma=await pg.evaluate(()=>[CAP,turn,phase,mode,BOT.pasos>0?Math.round(performance.now()/1000):0,units.map(u=>u.x+','+u.y+','+u.hp).join(';'),document.getElementById('dt').textContent,AMT.textContent,FVE.hidden].join('|').replace(/\|\d+\|/,'|'));
 const firma2=firma.split('|').filter((x,i)=>i!=4).join('|');if(firma2==ult){if(Date.now()-tq>60000){console.log('ATASCADO en',cap,JSON.stringify(s).slice(0,300));await pg.screenshot({path:'atasco-campana.png'});mal++;break}}else{ult=firma2;tq=Date.now()}
 if(Date.now()-t0>juego+240000){console.log('DEMASIADO LARGO en',cap);mal++;break}}
console.log('capítulos recorridos:',vistos.join(' → '));
if(errs.length){console.log('ERRORES:\n'+errs.join('\n'));mal++}
await b.close();console.log(mal?'FALLOS':'TODO OK');process.exit(mal?1:0)})();
