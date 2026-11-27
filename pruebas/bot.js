/* Jugador automatico para las pruebas: lee la pantalla y toca como lo haria una persona.
   No sabe nada de cada capitulo: avanza hacia el enemigo o el objetivo, ataca, se cura y pasa los dialogos. */
(function(){
const B=window.BOT={on:false,pasos:0,menus:0,ult:'',rep:0,log:[],sinCambio:0};
const vis=el=>el&&!el.hidden;
const mal=/REINICIAR|T[IÍ]TULO|SALIR DEL JUEGO|BORRAR|SÍ, SALIR/i;
const pref=[/^✚ RECOGER/,/^▶ (ENTRAR|SALIR A LA CALLE)/,/^(HABLAR|EXAMINAR) ·/,/^ATACAR/,/^APOYAR/,/^ESPERAR/];
function eligeMenu(){const bs=[...document.querySelectorAll('#amb button')].filter(b=>!b.disabled);if(!bs.length)return;
 const tx=bs.map(b=>b.textContent.trim()),firma=document.getElementById('amt').textContent+'|'+tx.join('|');
 B.rep=firma==B.ult?B.rep+1:0;B.ult=firma;B.menus++;
 let i=-1;const u=typeof sel!='undefined'&&sel;
 const pot=tx.findIndex(t=>/^USAR POCI/.test(t));
 if(pot>=0&&u&&u.hp<u.mx*.45)i=pot;
 let ob=null;try{ob=getObj()}catch(e){}
 const cerca=u&&ob&&ob.x!=null&&Math.abs(u.x-ob.x)+Math.abs(u.y-ob.y)<=3;
 if(i<0)for(const r of pref){const k=tx.findIndex(t=>r.test(t)&&(!/^▶ ENTRAR/.test(t)||cerca)&&(!/^▶ SALIR A LA CALLE/.test(t)||(ob&&/Sal por la puerta/.test(ob.t||''))||cerca));if(k>=0){i=k;break}}
 if(B.rep>3){const k=tx.findIndex(t=>/^ESPERAR/.test(t));i=k>=0?k:tx.length-1}
 if(i<0){i=tx.findIndex(t=>!mal.test(t)&&!/^◀|CANCELAR|VOLVER|CERRAR/i.test(t));if(i<0)i=tx.findIndex(t=>!mal.test(t));if(i<0)i=0}
 bs[i].click()}
function dist(a,b){return Math.abs(a.x-b.x)+Math.abs(a.y-b.y)}
function mueve(){const L=units.filter(u=>u.t=='p'&&u.hp>0&&!u.done&&!u.est);if(!L.length){endTurn();return}
 const u=L[0];
 if(sel!==u){pick(u);if(sel!==u){u.done=true;return}}
 const E=units.filter(e=>e.t=='e'&&e.hp>0&&(typeof visT!='function'||visT(e.x,e.y)));
 let o=null;try{o=getObj()}catch(e){}
 const huye=!!u.nof||(o&&/No pod[eé]is luchar|Corre|Huye|Escapa|sin ser vist/i.test(o.t||''));
 const meta=(E.length&&!huye)?E.reduce((a,e)=>dist(u,e)<dist(u,a)?e:a):(o&&o.x!=null?o:(E.length?E[0]:null));
 if(!rg||u.moved){tap(u.x,u.y);return}
 let F=null;if(meta){const key=meta.x+','+meta.y+','+MAPGEN+','+CW;if(B.fk!==key){try{B.F=bfs(meta.x,meta.y,999,()=>false).d}catch(e){B.F=null}B.fk=key}F=B.F}
 const pel=(x,y)=>huye?E.reduce((p,e)=>p+(Math.abs(e.x-x)+Math.abs(e.y-y)<=3?40:0),0):0;
 const dv=(x,y)=>pel(x,y)+dv0(x,y),dv0=(x,y)=>{if(!meta)return 0;const k=x+y*CW;if(F&&F[k]>0)return F[k];if(F&&x==meta.x&&y==meta.y)return 0;return 1e4+Math.abs(x-meta.x)+Math.abs(y-meta.y)};
 let best=u.x+u.y*CW,bv=dv(u.x,u.y);
 for(let k=0;k<rg.d.length;k++)if(rg.d[k]>0){const x=k%CW,y=k/CW|0;if(units.some(q=>q.hp>0&&q.x==x&&q.y==y))continue;
  const v=dv(x,y);if(v<bv||(v==bv&&Math.random()<.3)){bv=v;best=k}}
 if(best==u.x+u.y*CW)tap(u.x,u.y);else tap(best%CW,best/CW|0)}
B.paso=function(){if(!B.on)return;B.pasos++;
 try{
  if(typeof DLAV=='function'&&DLAV){DLAV();return}
  if(vis(document.getElementById('hist'))){document.querySelector('#hist button').click();return}
  if(vis(AM)){eligeMenu();return}
  const dl=document.getElementById('dl');if(vis(dl)){dl.click();return}
  if(vis(FVE)){const bs=[...document.querySelectorAll('#fvm button')].filter(b=>!b.disabled&&!mal.test(b.textContent));const b=bs.find(b=>/CONTINUAR|SIGUIENTE|SEGUIR/i.test(b.textContent))||bs[0]||[...document.querySelectorAll('#fvm button')].find(b=>!b.disabled);if(b)b.click();return}
  const crf=document.getElementById('crf');if(vis(crf)){if(crf.onclick)crf.onclick();return}
  if(!TI.hidden){if(TI.classList.contains('pre')){salePre();return}const b=TM.querySelector('.tprim')||[...TM.querySelectorAll('button')].find(b=>/CONTINUAR|EMPEZAR/i.test(b.textContent));if(b&&!B.paraEnTitulo)b.click();return}
  if(mode=='map'&&phase=='player'&&!bz&&!fin)mueve();
 }catch(e){B.log.push('bot: '+e.message)}};
B.empieza=ms=>{B.on=true;clearInterval(B.iv);B.iv=setInterval(B.paso,ms||25)};
B.para=()=>{B.on=false;clearInterval(B.iv)};
})();
