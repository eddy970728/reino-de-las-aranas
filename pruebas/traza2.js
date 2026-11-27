const {abre}=require('./comun');
(async()=>{const {b,pg,errs}=await abre('../index.html');
await pg.evaluate(()=>{SPD=.02;MUSV=0;SFXV=0;salePre();usaPartida(1);MODO=1;NEWCAP=0;PIDETUT=0;NUEVAP=1;go(0,1);window.LG=[];let c=CAP,h=[];
 const op=BOT.paso;BOT.paso=function(){const a=[AM.hidden?'':'AM:'+AMT.textContent+'['+[...AMB.querySelectorAll('button')].map(b=>b.textContent).join('|')+']',FVE.hidden?'':'FV',TI.hidden?'':'TI',DLAV?'DLAV':'',document.getElementById('dl').hidden?'':'DL:'+document.getElementById('dt').textContent.slice(0,50),'f='+(EP&&EP.f),'turn='+turn].join(' ');h.push(a);if(h.length>12)h.shift();op()};
 setInterval(()=>{if(CAP!=c){LG.push('CAP '+c+'->'+CAP+'\n  '+h.join('\n  '));c=CAP}},5);const ot=titleOn;titleOn=function(){LG.push('titleOn '+new Error().stack.slice(0,500));return ot.apply(this,arguments)};BOT.empieza(20)});
await pg.waitForTimeout(5000);console.log((await pg.evaluate(()=>LG)).join('\n'));await b.close()})();
