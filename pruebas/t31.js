const {abre}=require('./comun');
(async()=>{const {b,pg,errs}=await abre('../index.html');
await pg.evaluate(()=>{SPD=.02;MUSV=0;SFXV=0;usaPartida(1);MODO=0;NEWCAP=31;PIDETUT=0;NUEVAP=1;go(0,1);window.MM=[];const o=window.amenu;
 setInterval(()=>{if(!AM.hidden){const f=AMT.textContent+' ['+[...AMB.querySelectorAll('button')].map(b=>b.textContent+(b.disabled?'(x)':'')).join('|')+']';if(MM[MM.length-1]!=f)MM.push(f)}},5);BOT.empieza(30)});
await pg.waitForTimeout(+process.argv[2]||4000);console.log((await pg.evaluate(()=>MM.slice(-25).join('\n')+'\nINT '+JSON.stringify(INT&&{k:INT.k,ent:INT.ent})+' tile '+mp[units[0].x+units[0].y*CW]+' u '+units.map(u=>u.t+u.n+u.x+','+u.y+(u.done?'D':'')).join(' '))));
await pg.screenshot({path:'/tmp/t31.png'});await b.close()})();
