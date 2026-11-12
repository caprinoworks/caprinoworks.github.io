'use strict';
const films = [{"portrait":false,"id":"1243410771","subtitle":"","thumb":"2221922893-4bd7ade4e76d2b7bc2c4f7db1a76dd32282ad86231a815f7f3e79b7b2392b109","title":"ZAHI | APRESENTAÇÃO DE CONCEITO"},{"portrait":false,"id":"1243339016","subtitle":"","thumb":"2221831772-16ae7c7405d4dc2dbbfc096135e03892c5eec60f9a0c4d0220c8e5355317baec","title":"SOMOS | URBANITY - VIDEO TEASER"},{"portrait":false,"id":"1243392863","subtitle":"","thumb":"2221907362-98f3875376360e539cd56884ccbc5a1b9028b0c842ec873c6182602e9f916088","title":"TEMAZEC | PULSE"},{"portrait":true,"id":"1243340485","subtitle":"","thumb":"2221834122-674a9b74455b5e725506b0a33a5f5d6f3b111612a50c827c573ccb6afd0931e5","title":"LUCID | THE HAUT CODE"},{"portrait":false,"id":"1243362624","subtitle":"","thumb":"2221865570-f939b55115ec187cd0d517b335b3570e3f914eb431804636e1d7092c76aa3f19","title":"MAGEN | HARMONY PARKWAY"},{"portrait":false,"id":"1243367105","subtitle":"","thumb":"2221867113-75c368f9b8ea4149d961a7b92877a3c29ff07eb724ef660c8aaf7f3cb38ad3d4","title":"TAPAJÓS ENGENHARIA | VICENTE PORFÍRIO"},{"portrait":false,"id":"1243390585","subtitle":"","thumb":"2221897921-6177083e234a9d02e454838a4bf91f7159cf7be4c317c98db8384581c1eb4faf","title":"PORTAL INC. | PORTAL 407 SIENA"},{"portrait":false,"id":"1243409570","subtitle":"","thumb":"2221921436-8b5732ac6198d8abc0c086b768795b2bfc7b6c9341631a8dd245d4d265080ca8","title":"MAGEN | ELETTO"},{"portrait":false,"id":"1243401123","subtitle":"","thumb":"2221910443-e1e833222c0a9ad29b294f152eea0fbb2d9c32197002658b4b93b120e09a3b07","title":"LUCID | DEMO REEL 2024"},{"portrait":false,"id":"1243558498","subtitle":"","thumb":"2222112101-e821e5a1d33c2d42ae24dbaaae26bf5eec3b1cf7408b5ffd204463b42511b275","title":"CINQ | APARECIDA DE GOIÂNIA"},{"portrait":false,"id":"1243559895","subtitle":"","thumb":"2222113399-af649b4c9e104b54f2ee9bdf3602c335cf8dfee72aba1a1513ce6fe5fa86eb38","title":"JOOY SIGNATURE | JOOY"},{"portrait":false,"id":"1243560391","subtitle":"","thumb":"2222113732-fa46f9dc06081bda527a51ffa204767fc585b475abe90fb920f05f4c6a654dcc","title":"NATURBANIDADE | CINQ | VIDEO MANIFESTO"},{"portrait":false,"id":"1243561140","subtitle":"","thumb":"2222114765-f675482b0712c4fea4e6c3f5385614116a6699f8cc945880436c8e1fb17dfa1a","title":"DIAS&AMARAL | 25 ANOS"}];
const grid = document.getElementById('video-grid');
const dialog = document.getElementById('film-dialog');
const filmHost = document.getElementById('film-player');
const previews = [];
function stopPreviews(){previews.forEach(item=>item.stop());}
function openFilm(film){
 stopPreviews();
 document.getElementById('film-title').textContent=film.title;
 document.getElementById('vimeo-link').href='https://vimeo.com/'+film.id;
 filmHost.classList.toggle('portrait',!!film.portrait);
 dialog.classList.toggle('portrait-dialog',!!film.portrait);
 const frame=document.createElement('iframe');
 frame.src='https://player.vimeo.com/video/'+film.id+'?autoplay=1&playsinline=1&dnt=1';
 frame.title=film.title;
 frame.allow='autoplay; fullscreen; picture-in-picture; encrypted-media';
 frame.allowFullscreen=true;
 filmHost.replaceChildren(frame);
 dialog.showModal();document.body.classList.add('modal-open');
}
films.forEach((film,index)=>{
 const article=document.createElement('article');article.className=film.portrait?'project project-portrait':'project';
 const button=document.createElement('button');button.className='cover';button.setAttribute('aria-label','Assistir: '+film.title);
 const image=document.createElement('img');image.src='https://i.vimeocdn.com/video/'+film.thumb+(film.portrait?'-d_540x960':'-d_960x540');image.alt='';image.loading=index<2?'eager':'lazy';image.decoding='async';image.width=film.portrait?540:960;image.height=film.portrait?960:540;
 image.addEventListener('error',()=>{image.hidden=true;const fallback=document.createElement('span');fallback.className='image-fallback';fallback.textContent=film.title;button.prepend(fallback);},{once:true});
 const previewHost=document.createElement('div');previewHost.className='hover-player';previewHost.setAttribute('aria-hidden','true');
 const label=document.createElement('span');label.className='preview-label';label.textContent='PRÉVIA SEM SOM';label.setAttribute('aria-hidden','true');
 const icon=document.createElement('span');icon.className='open-icon';icon.textContent='↗';icon.setAttribute('aria-hidden','true');
 button.append(image,previewHost,label,icon);
 const meta=document.createElement('div');meta.className='project-meta';const text=document.createElement('div');const title=document.createElement('h2');title.textContent=film.title;const subtitle=document.createElement('p');subtitle.textContent=film.subtitle;const number=document.createElement('span');number.className='number';number.textContent=String(index+1).padStart(2,'0');text.append(title,subtitle);meta.append(text,number);article.append(button,meta);grid.append(article);
 let player=null,timer=null,active=false;
 const stop=()=>{active=false;clearTimeout(timer);button.classList.remove('previewing');if(player)player.pause().catch(()=>{});};
 previews.push({stop});
 function start(){
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches||navigator.connection?.saveData||dialog.open)return;
  active=true;clearTimeout(timer);
  timer=setTimeout(async()=>{
   if(!active||!window.Vimeo?.Player)return;
   if(!player){
    const frame=document.createElement('iframe');frame.src='https://player.vimeo.com/video/'+film.id+'?background=1&autoplay=0&muted=1&loop=1&controls=0&autopause=0&playsinline=1&dnt=1';frame.title='Prévia sem som: '+film.title;frame.allow='autoplay; encrypted-media';frame.tabIndex=-1;previewHost.append(frame);player=new Vimeo.Player(frame);
    player.on('playing',()=>{if(active)button.classList.add('previewing');else player.pause().catch(()=>{});});
    player.on('error',()=>button.classList.remove('previewing'));
   }
   try{await player.ready();if(!active)return;await player.setMuted(true);if(!active)return;await player.play();if(!active)await player.pause();}catch{button.classList.remove('previewing');}
  },180);
 }
 button.addEventListener('pointerenter',start);button.addEventListener('pointerleave',stop);button.addEventListener('focus',start);button.addEventListener('blur',stop);button.addEventListener('click',()=>openFilm(film));
 const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop();});observer.observe(button);
});
function closeFilm(){dialog.close();}
function cleanFilm(){filmHost.replaceChildren();document.body.classList.remove('modal-open');}
 document.querySelector('.close-film').addEventListener('click',closeFilm);
 dialog.addEventListener('close',cleanFilm);
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeFilm();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){stopPreviews();if(dialog.open)closeFilm();}});
 document.getElementById('year').textContent=new Date().getFullYear();