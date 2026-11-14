'use strict';
const films = [{"id": "92896e_3f5f6fdee7384d969655e35e62ff659f", "title": "Demo Reel - 2022", "subtitle": "", "portrait": false, "poster": "assets/demo-reel-2022-cover.png", "provider": "native", "src": "https://video.wixstatic.com/video/92896e_3f5f6fdee7384d969655e35e62ff659f/1080p/mp4/file.mp4", "preview": "https://video.wixstatic.com/video/92896e_3f5f6fdee7384d969655e35e62ff659f/480p/mp4/file.mp4"}, {"id": "741651101", "title": "Amplifica - Vizualizer", "subtitle": "", "portrait": false, "poster": "https://static.wixstatic.com/media/92896e_5bcf4a932c94435bb8b0c492814f9940~mv2.jpg", "provider": "vimeo"}, {"id": "741652735", "title": "Prosa Guiada", "subtitle": "", "portrait": false, "poster": "https://static.wixstatic.com/media/92896e_f42a6ad2baf04c7dad89f09284fcedbc~mv2.jpg", "provider": "vimeo"}, {"id": "741652282", "title": "Kritikê - Podcast", "subtitle": "", "portrait": false, "poster": "https://static.wixstatic.com/media/92896e_19219a5424c5420199319ea46f70c9ec~mv2.jpg", "provider": "vimeo"}, {"id": "741653843", "title": "Tem dado em casa?", "subtitle": "", "portrait": false, "poster": "https://static.wixstatic.com/media/92896e_09696f8c50c5492ba7aa0ceba3772665~mv2.jpg", "provider": "vimeo"}, {"id": "472371263", "title": "Pandemic Demo Reel (2020)", "subtitle": "", "portrait": false, "poster": "https://static.wixstatic.com/media/92896e_0566856e14a04b259a528246ecdece3d~mv2.jpg", "provider": "vimeo"}, {"id": "92896e_2f4f1133d54f4d03be9c1e0c982378fd", "title": "A little stopmotion test", "subtitle": "", "portrait": false, "poster": "https://static.wixstatic.com/media/92896e_2f4f1133d54f4d03be9c1e0c982378fdf000.jpg", "provider": "native", "src": "https://video.wixstatic.com/video/92896e_2f4f1133d54f4d03be9c1e0c982378fd/1080p/mp4/file.mp4", "preview": "https://video.wixstatic.com/video/92896e_2f4f1133d54f4d03be9c1e0c982378fd/480p/mp4/file.mp4"}, {"id": "92896e_6bf7139e621f412b9418d559a68f33ec", "title": "Hiperfestas", "subtitle": "", "portrait": false, "poster": "https://static.wixstatic.com/media/92896e_6bf7139e621f412b9418d559a68f33ecf000.jpg", "provider": "native", "src": "https://video.wixstatic.com/video/92896e_6bf7139e621f412b9418d559a68f33ec/1080p/mp4/file.mp4", "preview": "https://video.wixstatic.com/video/92896e_6bf7139e621f412b9418d559a68f33ec/480p/mp4/file.mp4"}, {"id": "92896e_bebf772833a640cf9531fda4dfdfa316", "title": "Estudios Flow - 2020", "subtitle": "", "portrait": false, "poster": "https://static.wixstatic.com/media/92896e_bebf772833a640cf9531fda4dfdfa316f000.jpg", "provider": "native", "src": "https://video.wixstatic.com/video/92896e_bebf772833a640cf9531fda4dfdfa316/1080p/mp4/file.mp4", "preview": "https://video.wixstatic.com/video/92896e_bebf772833a640cf9531fda4dfdfa316/480p/mp4/file.mp4"}, {"id": "92896e_679de2c08fb74029b6c08f66c9c8c493", "title": "Vintage car adventure", "subtitle": "", "portrait": false, "poster": "https://static.wixstatic.com/media/92896e_679de2c08fb74029b6c08f66c9c8c493f000.jpg", "provider": "native", "src": "https://video.wixstatic.com/video/92896e_679de2c08fb74029b6c08f66c9c8c493/1080p/mp4/file.mp4", "preview": "https://video.wixstatic.com/video/92896e_679de2c08fb74029b6c08f66c9c8c493/480p/mp4/file.mp4"}];
const grid = document.getElementById('video-grid');
const dialog = document.getElementById('film-dialog');
const filmHost = document.getElementById('film-player');
const previews = [];
function stopPreviews(){previews.forEach(item=>item.stop());}
function openFilm(film){
 stopPreviews();
 document.getElementById('film-title').textContent=film.title;
 document.getElementById('vimeo-link').href=film.provider==='native'?film.src:'https://vimeo.com/'+film.id;document.getElementById('vimeo-link').textContent=film.provider==='native'?(document.documentElement.lang==='en'?'Open video ↗':'Abrir vídeo ↗'):'Vimeo ↗';
 filmHost.classList.toggle('portrait',!!film.portrait);
 dialog.classList.toggle('portrait-dialog',!!film.portrait);
 const frame=document.createElement('iframe');
 frame.src='https://player.vimeo.com/video/'+film.id+'?autoplay=1&playsinline=1&dnt=1';
 frame.title=film.title;
 frame.allow='autoplay; fullscreen; picture-in-picture; encrypted-media';
 frame.allowFullscreen=true;
 if(film.provider==='native'){const video=document.createElement('video');video.src=film.src;video.controls=true;video.playsInline=true;video.autoplay=true;video.poster=film.poster;filmHost.replaceChildren(video);}else{filmHost.replaceChildren(frame);}
 dialog.showModal();document.body.classList.add('modal-open');
}
films.forEach((film,index)=>{
 const article=document.createElement('article');article.className=film.portrait?'project project-portrait':'project';
 const button=document.createElement('button');button.className='cover';button.setAttribute('aria-label','Assistir: '+film.title);
 const image=document.createElement('img');image.src=film.poster;image.alt='';image.loading=index<2?'eager':'lazy';image.decoding='async';image.width=film.portrait?540:960;image.height=film.portrait?960:540;
 image.addEventListener('error',()=>{image.hidden=true;const fallback=document.createElement('span');fallback.className='image-fallback';fallback.textContent=film.title;button.prepend(fallback);},{once:true});
 const previewHost=document.createElement('div');previewHost.className='hover-player';previewHost.setAttribute('aria-hidden','true');
 const label=document.createElement('span');label.className='preview-label';label.textContent='PRÉVIA SEM SOM';label.setAttribute('aria-hidden','true');
 const icon=document.createElement('span');icon.className='open-icon';icon.textContent='↗';icon.setAttribute('aria-hidden','true');
 button.append(image,previewHost,label,icon);
 const meta=document.createElement('div');meta.className='project-meta';const text=document.createElement('div');const title=document.createElement('h2');title.textContent=film.title;const subtitle=document.createElement('p');subtitle.textContent=film.subtitle;const number=document.createElement('span');number.className='number';number.textContent=String(index+1).padStart(2,'0');text.append(title,subtitle);meta.append(text,number);article.append(button,meta);grid.append(article);
 let player=null,timer=null,active=false,nativePreview=null;
 const stop=()=>{active=false;clearTimeout(timer);button.classList.remove('previewing');if(nativePreview)nativePreview.pause();if(player)player.pause().catch(()=>{});};
 previews.push({stop});
 function start(){
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches||navigator.connection?.saveData||dialog.open)return;
  active=true;clearTimeout(timer);
  timer=setTimeout(async()=>{
   if(!active)return;if(film.provider==='native'){if(!nativePreview){nativePreview=document.createElement('video');nativePreview.src=film.preview;nativePreview.muted=true;nativePreview.loop=true;nativePreview.playsInline=true;nativePreview.preload='none';nativePreview.setAttribute('aria-hidden','true');previewHost.append(nativePreview);}try{await nativePreview.play();if(active)button.classList.add('previewing');else nativePreview.pause();}catch{}return;}if(!window.Vimeo?.Player)return;
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
function cleanFilm(){const video=filmHost.querySelector('video');if(video){video.pause();video.removeAttribute('src');video.load();}filmHost.replaceChildren();document.body.classList.remove('modal-open');}
 document.querySelector('.close-film').addEventListener('click',closeFilm);
 dialog.addEventListener('close',cleanFilm);
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeFilm();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){stopPreviews();if(dialog.open)closeFilm();}});
 document.getElementById('year').textContent=new Date().getFullYear();
const snailLoop=document.getElementById('snail-loop');
if(snailLoop){
 let snailVisible=false;
 const syncSnail=()=>{if(snailVisible&&!document.hidden){if(!snailLoop.getAttribute('src'))snailLoop.src=snailLoop.dataset.src;snailLoop.muted=true;snailLoop.play().catch(()=>{});}else snailLoop.pause();};
 new IntersectionObserver(entries=>{snailVisible=entries[0].isIntersecting;syncSnail();},{rootMargin:'100px'}).observe(snailLoop);
 document.addEventListener('visibilitychange',syncSnail);
}
