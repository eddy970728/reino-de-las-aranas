const {abre}=require('./comun');
(async()=>{const c=+process.argv[2],secs=+(process.argv[3]||10);const {b,pg,errs}=await abre('../index.html');
await pg.evaluate(c=>{SPD=.02;MUSV=0;SFXV=0;salePre();usaPartida(1);MODO=1;NEWCAP=c;PIDETUT=0;NUEVAP=1;go(0,1);
 const o=window.say;window.TRZ=[];window.say=function(l){try{TRZ.push('SAY '+CAP+' '+l.map(x=>x[0]+': '+String(x[1]).slice(0,60)).join(' / ').slice(0,200))}catch(e){}return o.apply(this,arguments)};
 const oa=amenu;window.amenu=amenu;BOT.empieza(20)},c);
for(let i=0;i<secs;i++){await pg.waitForTimeout(1000);const s=await pg.evaluate(()=>({cap:CAP,turn,fin:String(fin||''),obj:(()=>{try{return JSON.stringify(getObj())}catch(e){return e.message}})(),tr:TRZ.splice(0),u:units.filter(u=>u.hp>0).map(u=>u.t+u.n+'@'+u.x+','+u.y).join(' ').slice(0,300)}));
 s.tr.forEach(t=>console.log(t));console.log(i,s.cap,'turno',s.turn,'fin',s.fin,'obj',s.obj);if(i%5==0)console.log('  ',s.u)}
console.log(errs.join('\n'));await b.close()})();
