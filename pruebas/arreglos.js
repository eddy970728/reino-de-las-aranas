// Comprueba los arreglos pedidos en la v1.1.2: campamento del prologo, el comandante va hacia la araña,
// rescate de Hector (vida x3 y con capucha), Hector sin capucha en el III.1 y retratos de todos los que hablan.
const {abre}=require('./comun');
(async()=>{const F=process.argv[2]||'../index.html';let mal=0;const chk=(c,m)=>{console.log((c?'  ✓ ':'  ✗ ')+m);if(!c)mal++};
{const {b,pg,errs}=await abre(F);
 await pg.evaluate(()=>{SPD=.05;MUSV=0;SFXV=0;usaPartida(1);MODO=0;NEWCAP=0;PIDETUT=0;NUEVAP=1;go(0,1);BOT.empieza(25)});
 for(let i=0;i<300;i++){await pg.waitForTimeout(100);if(await pg.evaluate(()=>EP&&EP.f==3&&!bz&&mode=='map'))break}
 await pg.evaluate(()=>BOT.para());await pg.waitForTimeout(300);
 const r=await pg.evaluate(()=>{const w=units.filter(u=>u.espera);const a=w[0];if(!a)return{n:0};pick(a);const s1=sel===a;tap(a.x,a.y);return{n:w.length,sel:s1||sel===a}});
 chk(r.n==3&&!r.sel,'en el campamento, los paladines que esperan no se pueden elegir ('+JSON.stringify(r)+')');
 await pg.evaluate(()=>BOT.empieza(25));
 for(let i=0;i<600;i++){await pg.waitForTimeout(100);if(await pg.evaluate(()=>EP&&EP.f>=5))break}
 chk(await pg.evaluate(()=>EP.f>=5&&!units.some(u=>u.espera)),'al empezar el entrenamiento ya se pueden mover todos');
 for(let i=0;i<600;i++){await pg.waitForTimeout(50);if(await pg.evaluate(()=>units.some(u=>u.n=='Criatura')))break}
 let pegado=false;for(let i=0;i<80&&!pegado;i++){await pg.waitForTimeout(50);pegado=await pg.evaluate(()=>{const c=units.find(u=>u.com),a=units.find(u=>u.n=='Criatura');return!!(c&&a&&Math.abs(c.x-a.x)+Math.abs(c.y-a.y)==1)})}
 chk(pegado,'el comandante camina hasta pegarse a la araña antes de pelear');
 await pg.waitForTimeout(8000);chk(!errs.length,'prólogo sin errores '+errs.join('|'));await b.close()}
{const {b,pg,errs}=await abre(F);
 await pg.evaluate(()=>{SPD=.05;MUSV=0;SFXV=0;usaPartida(1);MODO=0;NEWCAP=4;PIDETUT=0;NUEVAP=1;go(0,1)});
 for(let i=0;i<300;i++){const s=await pg.evaluate(()=>{if(DLAV){DLAV();return 0}const d=document.getElementById('dl');if(!d.hidden){d.click();return 0}if(!AM.hidden){AMB.querySelector('button').click();return 0}return mode=='map'&&phase=='player'&&!bz?1:0});if(s)break;await pg.waitForTimeout(30)}
 const r=await pg.evaluate(()=>{cercoHec();const h=units.find(u=>u.id=='hec4');return{hp:h.mx,hood:h.hood}});
 chk(r.hp==180&&r.hood==1,'Héctor en el rescate: triple de vida y con su capucha ('+JSON.stringify(r)+')');
 const ret=await pg.evaluate(()=>{CAP=31;const a=retrato('Héctor','n');CAP=4;const c=retrato('Héctor','n');return a&&c&&a!=c});
 chk(ret,'en el III.1 el retrato de Héctor no lleva capucha');
 const sin=await pg.evaluate(()=>['Panadera','Comerciante','Vecino','Eddy','Nela','Lian','Andy','Esmeralda','Tomás','Elena','Don Mateo','Anciana','Soldado'].filter(n=>!retrato(n,'n')));
 chk(!sin.length,'todos los que hablan tienen retrato '+sin.join(','));
 chk(!errs.length,'sin errores '+errs.join('|'));await b.close()}
console.log(mal?'FALLOS '+mal:'TODO OK');process.exit(mal?1:0)})();
