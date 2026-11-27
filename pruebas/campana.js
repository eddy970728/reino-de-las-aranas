// Recorre la campaña entera: en cada capitulo el jugador automatico juega un rato y luego se fuerza la victoria.
// Comprueba que cada paso al siguiente capitulo, el final, los creditos y la vuelta al titulo funcionan sin errores.
const {abre}=require('./comun');
(async()=>{const F=process.argv[2]||'../index.html',juego=+(process.argv[3]||12000),m=+(process.argv[4]||0);
const {b,pg,errs}=await abre(F);const vistos=[];let mal=0;
await pg.evaluate(m=>{SPD=.02;MUSV=0;SFXV=0;usaPartida(1);localStorage.setItem('ra_modo',m);MODO=m;NEWCAP=0;PIDETUT=0;NUEVAP=1;go(0,1);BOT.empieza(20)},m);
let cap=-1,t0=Date.now(),fz=0;
for(;;){await pg.waitForTimeout(500);
 const s=await pg.evaluate(()=>({cap:CAP,ti:!TI.hidden,fv:FVE.hidden?'':document.getElementById('fvt').textContent,mode,fin:String(fin||''),crf:!document.getElementById('crf').hidden,meta:JSON.stringify(metaDe(1)||{}),log:BOT.log.splice(0)}));
 s.log.forEach(l=>errs.push(l));
 if(s.cap!==cap&&s.mode=='map'){cap=s.cap;t0=Date.now();fz=0;vistos.push(cap);console.log('capítulo',cap,'empieza')}
 if(s.ti&&vistos.length>=9&&!s.crf){console.log('de vuelta en el título · meta',s.meta);break}
 if(s.mode=='map'&&!s.fin&&!fz&&Date.now()-t0>juego&&await pg.evaluate(()=>!bz&&!DLAV&&phase=='player'&&document.getElementById('dl').hidden)){fz=1;await pg.evaluate(()=>{fin='¡VICTORIA!'});console.log('  victoria forzada en',cap)}
 if(Date.now()-t0>juego+90000){console.log('ATASCADO en',cap,JSON.stringify(s).slice(0,300));await pg.screenshot({path:'atasco-campana.png'});mal++;break}}
console.log('capítulos recorridos:',vistos.join(' → '));
if(errs.length){console.log('ERRORES:\n'+errs.join('\n'));mal++}
await b.close();console.log(mal?'FALLOS':'TODO OK');process.exit(mal?1:0)})();
