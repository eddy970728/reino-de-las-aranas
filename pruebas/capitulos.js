// Juega cada capitulo con el jugador automatico, en Facil y Normal, y vigila errores y bloqueos.
// uso: node capitulos.js ../index.html [caps] [modos] [segundos]
const {abre}=require('./comun');const {chromium}=require('playwright');
const F=process.argv[2]||'../index.html';
const CAPS=(process.argv[3]||'0,1,2,3,31,32,4,41,5').split(',').map(Number);
const MODOS=(process.argv[4]||'1,0').split(',').map(Number);const MAXS=+(process.argv[5]||240);
(async()=>{const browser=await chromium.launch();const res=[];let fallos=0;
for(const m of MODOS)for(const c of CAPS){const {pg,errs}=await abre(F,{browser});
 await pg.evaluate(([c,m])=>{SPD=.02;MUSV=0;SFXV=0;salePre();usaPartida(1);localStorage.setItem('ra_modo',m);MODO=m;NEWCAP=c;PIDETUT=0;NUEVAP=1;go(0,1);BOT.empieza(20)},[c,m]);
 const t0=Date.now();let r='tiempo agotado',ult='',quieto=0,turnoMax=0,titulos=new Set();
 for(;;){await pg.waitForTimeout(1000);
  const st=await pg.evaluate(()=>({cap:CAP,turn:typeof turn!='undefined'?turn:0,fin:typeof fin!='undefined'?String(fin||''):'',fv:FVE.hidden?'':document.getElementById('fvt').textContent,ti:!TI.hidden,pasos:BOT.pasos,menus:BOT.menus,firma:[mode,phase,bz,CAP,turn,units.map(u=>u.x+','+u.y+','+u.hp).join(';'),AM.hidden?'':AMT.textContent,document.getElementById('dl').hidden?'':document.getElementById('dt').textContent].join('|'),log:BOT.log.splice(0)}));
  turnoMax=Math.max(turnoMax,st.turn);if(st.fv)titulos.add(st.fv);st.log.forEach(l=>errs.push(l));
  if(st.firma==ult)quieto++;else quieto=0;ult=st.firma;
  if([...titulos].some(t=>/VICTORIA/i.test(t))||st.cap!=c){r='victoria';break}
  if([...titulos].some(t=>/DERROTA|CA[IÍ]D|PERDID|FIN DE LA/i.test(t))||/DERROTA/i.test(st.fin)){r='derrota';break}
  if(st.ti&&Date.now()-t0>5000){r='volvió al título';break}
  if(quieto>=20){r='BLOQUEADO (20 s sin cambios)';break}
  if((Date.now()-t0)/1000>MAXS)break}
 if(/BLOQUEADO/.test(r)){await pg.screenshot({path:'bloqueo-'+c+'-'+m+'.png'});fallos++}
 if(errs.length)fallos++;
 const fila={cap:c,modo:m?'Fácil':'Normal',resultado:r,turnos:turnoMax,seg:Math.round((Date.now()-t0)/1000),errores:errs.slice(0,5)};
 res.push(fila);console.log(JSON.stringify(fila));await pg.close()}
await browser.close();require('fs').writeFileSync('resultado-capitulos.json',JSON.stringify(res,null,1));
console.log(fallos?'FALLOS: '+fallos:'TODO OK');process.exit(fallos?1:0)})();
