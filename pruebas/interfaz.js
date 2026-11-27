// Pruebas de interfaz: boton atras, toques dobles, opciones, tamaños de pantalla, giro, interrupciones y migracion.
const {abre,saltaIntro}=require('./comun');const {chromium}=require('playwright');const fs=require('fs');
const F=process.argv[2]||'../index.html',CAP=process.argv[3]||'capturas';fs.mkdirSync(CAP,{recursive:true});
let fallos=0,ok=0;const SEC=(process.argv[4]||'1,2,3,4,5,6').split(',');const H=n=>SEC.includes(String(n));const chk=(c,m)=>{if(c)ok++;else{fallos++;console.log('  ✗ '+m)}};
const estado=pg=>pg.evaluate(()=>({am:!AM.hidden,amt:AM.hidden?'':AMT.textContent,ti:!TI.hidden,sub:document.body.classList.contains('tisub'),tm:TM.textContent.slice(0,40),fv:!FVE.hidden,mode,sel:!!sel,dl:!document.getElementById('dl').hidden}));
const enMapa=async pg=>{await pg.evaluate(()=>{SPD=.02;MUSV=0;SFXV=0;usaPartida(1);MODO=0;NEWCAP=2;PIDETUT=0;NUEVAP=1;go(0,1)});
 for(let i=0;i<400;i++){const s=await pg.evaluate(()=>{if(DLAV){DLAV();return 0}const d=document.getElementById('dl');if(!d.hidden){d.click();return 0}if(!AM.hidden){return 0}return mode=='map'&&phase=='player'&&!bz?1:0});if(s)break;await pg.waitForTimeout(20)}
 await pg.evaluate(()=>{SPD=1})};
(async()=>{const browser=await chromium.launch();
// 1. boton atras
if(H(1)){console.log('1. Botón atrás de Android');const {pg,errs}=await abre(F,{browser});
 await pg.evaluate(()=>menu('main'));await pg.evaluate(()=>{atras()});await pg.waitForTimeout(400);let s=await estado(pg);
 chk(s.am&&/Salir del juego/.test(s.amt),'en el título, atrás pregunta si salir');
 await pg.evaluate(()=>{atras()});await pg.waitForTimeout(400);s=await estado(pg);chk(!s.am&&s.ti,'atrás otra vez cierra la pregunta y sigue en el título');
 await pg.evaluate(()=>menu('opt'));await pg.waitForTimeout(100);s=await estado(pg);chk(s.sub,'opciones tiene barra de submenú');
 await pg.evaluate(()=>{atras()});await pg.waitForTimeout(100);s=await estado(pg);chk(!s.sub&&s.ti,'atrás en opciones vuelve al menú principal');
 const enOpc=async()=>pg.evaluate(()=>/OPCIONES/.test((TM.querySelector('.ttl')||{}).textContent||''));
 await pg.waitForTimeout(300);await pg.evaluate(()=>menu('cre'));await pg.evaluate(()=>{atras()});chk(await enOpc(),'atrás en créditos vuelve a opciones');
 await pg.waitForTimeout(300);await pg.evaluate(()=>menu('fb'));await pg.evaluate(()=>{atras()});chk(await enOpc(),'atrás en contacto vuelve a opciones');
 await pg.evaluate(()=>menu('log'));await pg.waitForTimeout(300);await pg.evaluate(()=>{atras()});s=await estado(pg);chk(!s.sub,'atrás en logros vuelve');
 await pg.evaluate(()=>{menuGaleria()});await pg.waitForTimeout(300);await pg.evaluate(()=>{atras()});s=await estado(pg);chk(!s.sub,'atrás en galería vuelve');
 await pg.evaluate(()=>menu('ver'));await pg.waitForTimeout(300);await pg.evaluate(()=>{atras()});chk(await enOpc(),'atrás en historial de versiones vuelve a opciones');
 await pg.waitForTimeout(300);await pg.evaluate(()=>menu('exp'));await pg.waitForTimeout(300);await pg.evaluate(()=>{atras()});chk(await enOpc(),'atrás en exportar vuelve a opciones');
 await pg.waitForTimeout(300);await pg.evaluate(()=>{atras()});s=await estado(pg);chk(!s.sub&&s.ti,'atrás en opciones vuelve a la portada');
 await enMapa(pg);s=await estado(pg);chk(s.mode=='map'&&!s.ti,'empieza el capítulo II');
 await pg.waitForTimeout(300);if((await estado(pg)).sel){await pg.evaluate(()=>{atras()});await pg.waitForTimeout(300);s=await estado(pg);chk(!s.sel&&!s.am,'con una unidad elegida, atrás primero la suelta')}
 await pg.evaluate(()=>{atras()});await pg.waitForTimeout(450);s=await estado(pg);chk(s.am&&/Turno/.test(s.amt),'en el mapa, atrás abre la pausa');
 await pg.screenshot({path:CAP+'/pausa-atras.png'});
 await pg.evaluate(()=>{atras()});await pg.waitForTimeout(300);s=await estado(pg);chk(!s.am,'atrás cierra la pausa');
 await pg.waitForTimeout(300);await pg.evaluate(()=>{const u=units.find(u=>u.t=='p'&&u.hp>0&&!u.done);pick(u)});s=await estado(pg);chk(s.sel,'unidad seleccionada');
 await pg.evaluate(()=>{atras()});s=await estado(pg);chk(!s.sel&&!s.am,'atrás quita la selección sin abrir la pausa');
 await pg.evaluate(()=>{say([['Eddy','Una línea de prueba para el botón atrás.']])});await pg.waitForTimeout(400);
 await pg.evaluate(()=>{atras()});await pg.waitForTimeout(300);s=await estado(pg);chk(s.dl&&!s.am,'atrás durante un diálogo no hace nada raro');
 await pg.evaluate(()=>document.getElementById('dl').click());await pg.waitForTimeout(300);
 await pg.evaluate(()=>{pause()});await pg.waitForTimeout(400);
 await pg.evaluate(()=>[...AMB.querySelectorAll('button')].find(b=>/Historial/.test(b.textContent)).click());await pg.waitForTimeout(300);
 const hv=await pg.evaluate(()=>!document.getElementById('hist').hidden);chk(hv,'historial abierto desde la pausa');
 await pg.evaluate(()=>{atras()});await pg.waitForTimeout(300);chk(await pg.evaluate(()=>document.getElementById('hist').hidden),'atrás cierra el historial');
 for(let i=0;i<20;i++){await pg.evaluate(()=>{atras()});await pg.waitForTimeout(30)}
 await pg.waitForTimeout(500);s=await estado(pg);chk(s.mode=='map',' 20 pulsaciones seguidas de atrás no rompen nada');
 chk(!errs.length,'sin errores JS: '+errs.join(' | '));await pg.close()}
// 2. toques dobles y falsos
if(H(2)){console.log('2. Toques dobles y toques falsos');const {pg,errs}=await abre(F,{browser,touch:true});
 await enMapa(pg);await pg.waitForTimeout(400);
 const centro=async re=>pg.evaluate(re=>{const b=[...document.querySelectorAll('#amb button')].find(b=>new RegExp(re).test(b.textContent));if(!b)return null;const q=b.getBoundingClientRect();return[q.x+q.width/2,q.y+q.height/2]},re);
 await pg.evaluate(()=>{pause()});await pg.waitForTimeout(450);const pR=await centro('Reiniciar');
 await pg.evaluate(()=>{AM.hidden=true;});await pg.evaluate(()=>{[...AMB.querySelectorAll('button')].find(b=>/CONTINUAR/.test(b.textContent)).click()});await pg.waitForTimeout(300);
 await pg.evaluate(()=>{pause()});await pg.waitForTimeout(40);await pg.mouse.click(pR[0],pR[1]);await pg.waitForTimeout(450);
 let s=await estado(pg);chk(s.am&&/Turno/.test(s.amt),'un toque justo al abrir la pausa se ignora (protección contra toques falsos)');
 let p=await centro('Reiniciar');await pg.mouse.click(p[0],p[1]);await pg.waitForTimeout(450);
 s=await estado(pg);chk(s.am&&/Reiniciar/i.test(s.amt),'pide confirmación antes de reiniciar');
 p=await centro('NO, VOLVER');await pg.mouse.click(p[0],p[1]);await pg.waitForTimeout(60);await pg.mouse.click(p[0],p[1]);await pg.waitForTimeout(450);
 s=await estado(pg);chk(s.am&&/Turno/.test(s.amt),'doble toque en «No, volver» no pulsa nada en la pausa que aparece debajo');
 p=await centro('CONTINUAR');await pg.mouse.click(p[0],p[1]);await pg.waitForTimeout(40);await pg.mouse.click(p[0],p[1]);await pg.waitForTimeout(40);await pg.mouse.click(p[0],p[1]);await pg.waitForTimeout(400);
 s=await estado(pg);chk(!s.am&&s.mode=='map','triple toque en Continuar cierra la pausa sin efectos raros');
 await pg.evaluate(()=>{sel=null;endTurn()});await pg.waitForTimeout(200);
 for(let i=0;i<40;i++){await pg.mouse.click(20+Math.random()*350,120+Math.random()*600);await pg.waitForTimeout(25)}
 await pg.waitForTimeout(3000);
 chk(!errs.length,'sin errores JS tras toques al azar: '+errs.join(' | '));await pg.close()}
if(H(3)){console.log('3. Opciones');const {pg,errs}=await abre(F,{browser});
 await pg.evaluate(()=>menu('opt'));
 const fila=async k=>pg.evaluate(k=>{const b=TM.querySelector('button.orow[data-k="'+k+'"]');return b?b.textContent:''},k);
 const toca=async(k,d)=>pg.evaluate(([k,d])=>{const b=TM.querySelector('button.orow[data-k="'+k+'"]');const t=d?b.querySelector('[data-d="'+d+'"]'):null;(t||b).dispatchEvent(new MouseEvent('click',{bubbles:true}))},[k,d]);
 const filas=await pg.evaluate(()=>[...TM.querySelectorAll('button.orow')].map(b=>b.dataset.k));chk(filas.length>=13,'hay '+filas.length+' filas de opciones');
 await toca('est',1);chk(/Estandarte/.test(await fila('est'))&&await pg.evaluate(()=>document.body.classList.contains('est-b')),'cambia a Estandarte real');
 await toca('est',-1);chk(/Piedra/.test(await fila('est')),'vuelve a Piedra y oro');
 for(const k of ['tv','tx','cur','spd']){const a=await fila(k);await toca(k,1);const b=await fila(k);await toca(k,-1);const c=await fila(k);chk(a!=b&&a==c,'selector '+k+' va y vuelve ('+a.trim()+' → '+b.trim()+')')}
 for(const k of ['mus','sfx','vib','dal']){const a=await fila(k);await toca(k);const b=await fila(k);await toca(k);chk(a!=b&&a==await fila(k),'interruptor '+k)}
 await toca('tx',1);await toca('est',1);await pg.reload();await saltaIntro(pg);
 const per=await pg.evaluate(()=>({tx:TXT,est:ESTILO,b:document.body.className}));chk(per.tx==1&&per.est=='b'&&/est-b/.test(per.b)&&/tx1/.test(per.b),'los ajustes se guardan al cerrar y abrir ('+JSON.stringify(per)+')');
 await pg.evaluate(()=>{menu('opt')});await pg.waitForTimeout(400);await pg.keyboard.press('ArrowDown');for(let i=0;i<3&&!(await pg.evaluate(()=>document.activeElement&&document.activeElement.dataset.k));i++)await pg.keyboard.press('ArrowDown');
 const f1=await pg.evaluate(()=>document.activeElement&&document.activeElement.dataset.k);chk(!!f1,'con teclado, abajo enfoca una fila ('+f1+')');
 for(let i=0;i<20&&await pg.evaluate(()=>document.activeElement.dataset.k!='est');i++)await pg.keyboard.press('ArrowDown');
 await pg.keyboard.press('ArrowRight');await pg.waitForTimeout(150);chk(await pg.evaluate(()=>ESTILO=='a'),'con teclado, derecha cambia el estilo');
 chk(await pg.evaluate(()=>document.activeElement&&document.activeElement.dataset.k=='est'),'el foco se queda en la misma fila tras cambiarla');
 chk(!errs.length,'sin errores JS: '+errs.join(' | '));await pg.close()}
// 4. tamaños de pantalla, estilos y tamaños de texto
if(H(4)){console.log('4. Pantallas, estilos y tamaños de letra');
 const VPS=(process.env.VPS?JSON.parse(process.env.VPS):[[360,640],[390,844],[412,915],[768,1024],[844,390],[915,412],[1280,800]]);
 for(const [w,h] of VPS)for(const est of ['a','b'])for(const tx of [0,2]){const {pg,errs}=await abre(F,{browser,vp:{width:w,height:h},est});
  await pg.evaluate(t=>{document.body.classList.remove('tx0','tx1','tx2');TXT=t;document.body.classList.add('tx'+t);usaPartida(1);metaPon(1,{cap:3,t:5400000,modo:0,f:Date.now()});menu('main')},tx);await pg.waitForTimeout(250);
  const mide=sel=>pg.evaluate(sel=>{const W=innerWidth,H=innerHeight,r=[];const doc=document.scrollingElement;if(doc.scrollWidth>W+1)r.push('la página se sale por la derecha');
   document.querySelectorAll(sel).forEach(b=>{if(b.offsetParent===null)return;const q=b.getBoundingClientRect();if(q.width<1)return;
    if(q.left<-1||q.right>W+1)r.push('botón fuera de pantalla: '+b.textContent.trim().slice(0,25));
    if(q.height<40&&!b.classList.contains('hd'))r.push('botón bajo ('+Math.round(q.height)+'px): '+b.textContent.trim().slice(0,25));
    if(b.scrollWidth>b.clientWidth+2)r.push('texto cortado: '+b.textContent.trim().slice(0,25))});return r},sel);
  const n=w+'x'+h+'-'+est+'-tx'+tx;let pr=[];
  pr=pr.concat((await mide('#tm button')).map(x=>'portada: '+x));if(tx==0)await pg.screenshot({path:CAP+'/'+n+'-portada.png'});
  await pg.evaluate(()=>menu('opt'));await pg.waitForTimeout(150);pr=pr.concat((await mide('#tm button')).map(x=>'opciones: '+x));if(tx==2||w>h)await pg.screenshot({path:CAP+'/'+n+'-opciones.png'});
  await enMapa(pg);await pg.waitForTimeout(300);await pg.evaluate(()=>{pause()});await pg.waitForTimeout(450);
  pr=pr.concat((await mide('#amb button')).map(x=>'pausa: '+x));
  const am=await pg.evaluate(()=>{const q=AM.getBoundingClientRect();return q.top>=-1&&q.bottom<=innerHeight+1});if(!am)pr.push('la pausa no cabe en pantalla');
  await pg.screenshot({path:CAP+'/'+n+'-pausa.png'});
  pr=[...new Set(pr)];if(pr.length){fallos++;console.log('  ✗ '+n+': '+pr.slice(0,6).join(' · '))}else ok++;
  if(errs.length){fallos++;console.log('  ✗ '+n+' errores: '+errs.join(' | '))}
  await pg.close()}}
// 5. giro e interrupciones
if(H(5)){console.log('5. Giro de pantalla e interrupciones');const {pg,errs}=await abre(F,{browser});
 await enMapa(pg);await pg.evaluate(()=>{pause()});await pg.waitForTimeout(400);
 await pg.setViewportSize({width:844,height:390});await pg.waitForTimeout(400);
 chk(await pg.evaluate(()=>document.body.classList.contains('land')),'al girar en horizontal se activa el diseño horizontal');
 chk(await pg.evaluate(()=>{const q=AM.getBoundingClientRect();return q.bottom<=innerHeight+1&&q.right<=innerWidth+1}),'la pausa sigue cabiendo tras girar');
 await pg.screenshot({path:CAP+'/giro-pausa.png'});
 await pg.setViewportSize({width:390,height:844});await pg.waitForTimeout(300);
 await pg.evaluate(()=>[...AMB.querySelectorAll('button')].find(b=>/CONTINUAR/.test(b.textContent)).click());
 await pg.evaluate(()=>{actx();Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))});await pg.waitForTimeout(300);
 const su=await pg.evaluate(()=>AC?AC.state:'sin audio');chk(su!='running','al salir de la app el sonido se pausa ('+su+')');
 await pg.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'));dispatchEvent(new Event('focus'))});await pg.waitForTimeout(300);
 await pg.evaluate(()=>{BOT.empieza(20)});await pg.waitForTimeout(5000);await pg.evaluate(()=>BOT.para());
 for(let i=0;i<6;i++){await pg.setViewportSize(i%2?{width:390,height:844}:{width:844,height:390});await pg.waitForTimeout(120)}
 await pg.evaluate(()=>BOT.empieza(20));await pg.waitForTimeout(4000);
 chk(!errs.length,'sin errores tras girar y salir/volver: '+errs.join(' | '));await pg.close()}
// 6. migracion desde 1.0.2
if(H(6)){console.log('6. Partida de la versión 1.0.2');const V='/home/claude/v111/base_v102.html';
 if(fs.existsSync(V)){const {pg,errs}=await abre(V,{browser});
  await enMapa(pg);await pg.waitForTimeout(500);const a=await pg.evaluate(()=>{save();return{cap:CAP,turn,n:units.length}});
  await pg.goto('file://'+require('path').resolve(F));await pg.addScriptTag({path:__dirname+'/bot.js'});
  for(let i=0;i<40;i++){await pg.keyboard.press('Space');await pg.waitForTimeout(150);if(await pg.evaluate(()=>!TI.hidden&&!!TM.firstChild))break}
  await pg.evaluate(()=>{salePre();menu('main')});
  chk(await pg.evaluate(()=>!!TM.querySelector('.tprim')),'la portada ofrece continuar la partida de 1.0.2');
  await pg.evaluate(()=>{continuaPartida(1)});await pg.waitForTimeout(800);
  const b=await pg.evaluate(()=>({cap:CAP,turn,n:units.length}));chk(a.cap==b.cap&&a.turn==b.turn&&a.n==b.n,'la partida de 1.0.2 sigue igual en 1.1.1 '+JSON.stringify([a,b]));
  await pg.evaluate(()=>{SPD=.02;BOT.empieza(20)});await pg.waitForTimeout(5000);
  chk(!errs.filter(e=>!/base_v102/.test(e)).length,'sin errores al seguir jugando: '+errs.join(' | '));await pg.close()}}
await browser.close();console.log('\nResultado: '+ok+' bien, '+fallos+' mal');process.exit(fallos?1:0)})();
