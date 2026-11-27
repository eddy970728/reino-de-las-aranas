// Guarda a mitad de cada capitulo, vuelve al titulo, continua, y comprueba que sigue en el mismo sitio.
const {abre}=require('./comun');const {chromium}=require('playwright');
const CAPS=(process.argv[3]||'0,1,2,3,31,32,4,41,5').split(',').map(Number);
(async()=>{const browser=await chromium.launch();let mal=0;
for(const c of CAPS){const {pg,errs}=await abre(process.argv[2]||'../index.html',{browser});
 await pg.evaluate(c=>{SPD=.02;MUSV=0;SFXV=0;usaPartida(1);MODO=0;NEWCAP=c;PIDETUT=0;NUEVAP=1;go(0,1);BOT.empieza(20)},c);
 await pg.waitForTimeout(c==0?2500:6000);
 // espera a un momento tranquilo del jugador
 let ok=false;for(let i=0;i<200;i++){ok=await pg.evaluate(()=>mode=='map'&&phase=='player'&&!bz&&!fin&&!INT&&AM.hidden&&document.getElementById('dl').hidden&&!DLAV);if(ok){await pg.evaluate(()=>BOT.para());await pg.waitForTimeout(50);ok=await pg.evaluate(()=>mode=='map'&&phase=='player'&&!bz&&!fin&&AM.hidden);if(ok)break;await pg.evaluate(()=>BOT.empieza(20))}await pg.waitForTimeout(30)}
 if(!ok){console.log(c,'no encontré un momento tranquilo');mal++;await pg.close();continue}
 const antes=await pg.evaluate(()=>{save();return {cap:CAP,turn,u:units.filter(u=>u.t=='p'&&u.hp>0).map(u=>u.n+'@'+u.x+','+u.y+':'+u.hp).sort().join(' '),ep:JSON.stringify(EP||null).length}});
 await pg.reload();await pg.addScriptTag({path:__dirname+'/bot.js'});
 for(let i=0;i<40;i++){await pg.keyboard.press('Space');await pg.waitForTimeout(150);if(await pg.evaluate(()=>!TI.hidden&&!!TM.firstChild))break}
 await pg.evaluate(()=>{salePre();continuaPartida(1)});await pg.waitForTimeout(1500);
 const desp=await pg.evaluate(()=>({cap:CAP,turn,u:units.filter(u=>u.t=='p'&&u.hp>0).map(u=>u.n+'@'+u.x+','+u.y+':'+u.hp).sort().join(' '),ep:JSON.stringify(EP||null).length}));
 await pg.evaluate(()=>{SPD=.02;BOT.empieza(20)});await pg.waitForTimeout(8000);
 const sig=await pg.evaluate(()=>({cap:CAP,turn}));
 const igual=antes.cap==desp.cap&&antes.turn==desp.turn&&antes.u==desp.u;
 if(!igual||errs.length)mal++;
 console.log(JSON.stringify({cap:c,igual,antes:antes.cap+'/t'+antes.turn,despues:desp.cap+'/t'+desp.turn,luego:sig.cap+'/t'+sig.turn,errores:errs.slice(0,3)}));
 if(!igual)console.log('  antes',antes.u,'\n  desp ',desp.u);await pg.close()}
await browser.close();console.log(mal?'FALLOS '+mal:'TODO OK');process.exit(mal?1:0)})();
