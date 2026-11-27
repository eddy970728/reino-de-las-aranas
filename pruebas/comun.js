const {chromium}=require('playwright');const path=require('path');
exports.abre=async(F,opt={})=>{const b=opt.browser||await chromium.launch();
 const pg=await b.newPage({viewport:opt.vp||{width:390,height:844},deviceScaleFactor:1,hasTouch:!!opt.touch,isMobile:!!opt.touch});
 const errs=[];pg.on('pageerror',e=>errs.push((e.stack||e.message).slice(0,400)));pg.on('console',m=>{if(m.type()=='error')errs.push('console: '+m.text().slice(0,200))});
 await pg.goto('file://'+path.resolve(F));
 if(!opt.mantener){await pg.evaluate(e=>{localStorage.clear();localStorage.setItem('ra_marca','1');if(e)localStorage.setItem('ra_est',e)},opt.est||'');await pg.reload()}
 await pg.addScriptTag({path:path.join(__dirname,'bot.js')});
 if(!opt.conIntro)await exports.saltaIntro(pg);
 return {b,pg,errs}};
exports.saltaIntro=async pg=>{for(let i=0;i<60;i++){await pg.keyboard.press('Space');await pg.waitForTimeout(150);if(await pg.evaluate(()=>!TI.hidden&&!!TM.firstChild))break}
 await pg.evaluate(()=>{try{salePre()}catch(e){}});await pg.waitForTimeout(200)};
