'use strict';
const films = [{"id": "HxYl9QGCrns", "title": "TEASER - SALTO IMPERIAL", "provider": "youtube", "portrait": true, "subtitle": ""}, {"id": "1243846809", "title": "ESCADA | MÍDIAS SOCIAIS", "thumb": "2222491163-8386661c980a6b9fff97a9f9acf8892b8dd3074d07aef636c71f96853efe95fc", "portrait": true, "subtitle": ""}, {"id": "ngBRM7i5Wo8", "title": "ENGECOM | PERGUNTAS PARA SR. ARNALDO", "provider": "youtube", "portrait": true, "subtitle": ""}, {"id": "6oBccE5UkB0", "title": "EVO | EVOLUIR É ESTAR PRONTO", "provider": "youtube", "portrait": true, "subtitle": ""}, {"id": "Al4KR1cTIfg", "title": "CINQ | MEETING CEREJEIRA", "provider": "youtube", "portrait": true, "subtitle": ""}, {"id": "QvPOiJyj7E4", "title": "ADEMALDO | CORRIDA AGOSTINIANO", "provider": "youtube", "portrait": true, "subtitle": ""}, {"id": "1243849194", "title": "ESCADA | INTELIGENCIA ARTIFICIAL", "thumb": "2222494088-49063b7c504201090a80737f70d934f1a64e1fed654c728a4f6963249924b93a", "portrait": true, "subtitle": ""}, {"id": "1243851444", "title": "POTAL DO SOL URBANISMO | GOLFE CLUBE", "thumb": "2222497831-5d5bf67bc10977c7529c2ebaeda0d0f2c02b7ce60668e4b4715d876d07e7a88d", "portrait": true, "subtitle": ""}, {"id": "941970186", "title": "MOSS", "thumb": "1845291685-5bdb191af66ada8cec0dfbb3caf8856d545879ed9ffebf7e195851d608927e5a", "portrait": true, "subtitle": ""}];
const grid = document.getElementById('video-grid');
const dialog = document.getElementById('film-dialog');
const filmHost = document.getElementById('film-player');
const previews = [];
function stopPreviews(){previews.forEach(item=>item.stop());}
function openFilm(film){
 stopPreviews();
 document.getElementById('film-title').textContent=film.title;
 document.getElementById('vimeo-link').href=film.provider==='youtube'?'https://www.youtube.com/shorts/'+film.id:'https://vimeo.com/'+film.id;
 filmHost.classList.toggle('portrait',!!film.portrait);
 dialog.classList.toggle('portrait-dialog',!!film.portrait);
 const frame=document.createElement('iframe');
 frame.src=film.provider==='youtube'?'https://www.youtube-nocookie.com/embed/'+film.id+'?autoplay=1&playsinline=1&rel=0':'https://player.vimeo.com/video/'+film.id+'?autoplay=1&playsinline=1&dnt=1';document.getElementById('vimeo-link').textContent=film.provider==='youtube'?'YouTube ↗':'Vimeo ↗';
 frame.title=film.title;
 frame.allow='autoplay; fullscreen; picture-in-picture; encrypted-media';
 frame.allowFullscreen=true;
 filmHost.replaceChildren(frame);
 dialog.showModal();document.body.classList.add('modal-open');
}
films.forEach((film,index)=>{
 const article=document.createElement('article');article.className=film.portrait?'project project-portrait':'project';
 const button=document.createElement('button');button.className='cover';button.setAttribute('aria-label','Assistir: '+film.title);
 const image=document.createElement('img');image.src=film.provider==='youtube'?'https://i.ytimg.com/vi/'+film.id+'/hqdefault.jpg':'https://i.vimeocdn.com/video/'+film.thumb+'-d_540x960';image.alt='';image.loading=index<2?'eager':'lazy';image.decoding='async';image.width=film.portrait?540:960;image.height=film.portrait?960:540;
 image.addEventListener('error',()=>{image.hidden=true;const fallback=document.createElement('span');fallback.className='image-fallback';fallback.textContent=film.title;button.prepend(fallback);},{once:true});
 const previewHost=document.createElement('div');previewHost.className='hover-player';previewHost.setAttribute('aria-hidden','true');
 const label=document.createElement('span');label.className='preview-label';label.textContent='PRÉVIA SEM SOM';label.setAttribute('aria-hidden','true');
 const icon=document.createElement('span');icon.className='open-icon';icon.textContent='↗';icon.setAttribute('aria-hidden','true');
 button.append(image,previewHost,label,icon);
 const meta=document.createElement('div');meta.className='project-meta';const text=document.createElement('div');const title=document.createElement('h2');title.textContent=film.title;const subtitle=document.createElement('p');subtitle.textContent=film.subtitle;const number=document.createElement('span');number.className='number';number.textContent=String(index+1).padStart(2,'0');text.append(title,subtitle);meta.append(text,number);article.append(button,meta);grid.append(article);
 let player=null,timer=null,active=false;
 const stop=()=>{active=false;clearTimeout(timer);if(film.provider==='youtube')previewHost.replaceChildren();button.classList.remove('previewing');if(player)player.pause().catch(()=>{});};
 previews.push({stop});
 function start(){
  if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches||navigator.connection?.saveData||dialog.open)return;
  active=true;clearTimeout(timer);
  timer=setTimeout(async()=>{
   if(!active)return;if(film.provider==='youtube'){const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+film.id+'?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist='+film.id;frame.title=film.title;frame.allow='autoplay';frame.tabIndex=-1;frame.onload=()=>{if(active)button.classList.add('previewing');};previewHost.replaceChildren(frame);return;}if(!window.Vimeo?.Player)return;
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