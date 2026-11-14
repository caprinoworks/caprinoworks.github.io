'use strict';
(()=>{
const intro=document.getElementById('hero-intro');const loop=document.getElementById('hero-loop');const retry=document.getElementById('hero-play');
if(!intro||!loop)return;
intro.muted=true;intro.loop=false;loop.muted=true;loop.loop=true;let introFinished=false;let visible=true;
function playCurrent(){if(document.hidden||!visible)return;const video=introFinished?loop:intro;video.play().then(()=>{retry.hidden=true;}).catch(()=>{retry.hidden=false;});}
loop.addEventListener('playing',()=>{if(introFinished){loop.classList.add('is-active');intro.classList.remove('is-active');}});
intro.addEventListener('ended',()=>{if(introFinished)return;introFinished=true;loop.currentTime=0;playCurrent();});
intro.addEventListener('error',()=>{introFinished=true;playCurrent();});
retry.addEventListener('click',playCurrent);
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)playCurrent();else{intro.pause();loop.pause();}},{threshold:0}).observe(intro.parentElement);
document.addEventListener('visibilitychange',()=>{if(document.hidden){intro.pause();loop.pause();}else playCurrent();});
playCurrent();
})();
