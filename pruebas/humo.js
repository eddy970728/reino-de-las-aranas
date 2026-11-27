// Prueba rapida que corre en GitHub antes de compilar: abre el juego, recorre los menus
// y juega unos segundos de cada capitulo. Si salta cualquier error, la compilacion se para.
const {abre}=require('./comun');const {chromium}=require('playwright');
(async()=>{const F=process.argv[2]||'../index.html';const browser=await chromium.launch();let mal=0;
const {pg,errs}=await abre(F,{browser});
for(const m of ['main','opt','cont','log','cre','fb','ver','exp','main']){await pg.evaluate(m=>{menu(m)},m);await pg.waitForTimeout(250)}
await pg.evaluate(()=>{menuGaleria()});await pg.waitForTimeout(250);
for(const e of ['b','a']){await pg.evaluate(e=>ponEstilo(e),e)}
if(errs.length){console.log('Errores en los menús:',errs);mal++}
await pg.close();
for(const c of [0,1,2,3,31,32,4,41,5]){const {pg,errs}=await abre(F,{browser});
 await pg.evaluate(c=>{SPD=.02;MUSV=0;SFXV=0;usaPartida(1);MODO=0;NEWCAP=c;PIDETUT=0;NUEVAP=1;go(0,1);BOT.empieza(20)},c);
 await pg.waitForTimeout(9000);const st=await pg.evaluate(()=>({cap:CAP,turn,log:BOT.log}));
 const e=errs.concat(st.log);console.log('capítulo',c,'→',st.cap,'turno',st.turn,e.length?'ERRORES: '+e.join(' | '):'ok');if(e.length)mal++;await pg.close()}
await browser.close();console.log(mal?'FALLÓ':'TODO OK');process.exit(mal?1:0)})();
