/* ── PAGE LOADER ── */
const loaderBar=document.getElementById('loaderBar'),loaderNum=document.getElementById('loaderNum'),pageLoader=document.getElementById('pageLoader');
let prog=0;
const loadInt=setInterval(()=>{
  prog+=Math.random()*12+3;
  if(prog>100){prog=100;clearInterval(loadInt);setTimeout(()=>{pageLoader.classList.add('done');setTimeout(()=>{pageLoader.style.display='none'},700)},200)}
  loaderBar.style.width=prog+'%';loaderNum.textContent=Math.round(prog)+'%';
},80);

/* ── PARTICLE CANVAS ── */
const canvas=document.getElementById('particleCanvas');
const ctx=canvas.getContext('2d');
let W,H,particles=[];
function resizeCanvas(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resizeCanvas();window.addEventListener('resize',resizeCanvas);
class Particle{
  constructor(){this.reset()}
  reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.r=Math.random()*.8+.3;this.vx=(Math.random()-.5)*.3;this.vy=(Math.random()-.5)*.3;this.alpha=Math.random()*.5+.1;this.color=Math.random()>.5?'192,132,252':'103,232,249'}
  update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset()}
  draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(${this.color},${this.alpha})`;ctx.fill()}
}
for(let i=0;i<120;i++)particles.push(new Particle());
let mouseX=W/2,mouseY=H/2;
document.addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY});
function drawConnections(){
  for(let i=0;i<particles.length;i++){
    const dx=particles[i].x-mouseX,dy=particles[i].y-mouseY,dist=Math.sqrt(dx*dx+dy*dy);
    if(dist<120){
      ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(mouseX,mouseY);
      ctx.strokeStyle=`rgba(192,132,252,${(.12*(1-dist/120))})`;ctx.lineWidth=.5;ctx.stroke();
    }
    for(let j=i+1;j<particles.length;j++){
      const dx2=particles[i].x-particles[j].x,dy2=particles[i].y-particles[j].y,d2=Math.sqrt(dx2*dx2+dy2*dy2);
      if(d2<80){
        ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);
        ctx.strokeStyle=`rgba(103,232,249,${(.06*(1-d2/80))})`;ctx.lineWidth=.3;ctx.stroke();
      }
    }
  }
}
function animParticles(){ctx.clearRect(0,0,W,H);particles.forEach(p=>{p.update();p.draw()});drawConnections();requestAnimationFrame(animParticles)}
animParticles();

/* ── CURSOR ── */
const dot=document.getElementById('cursorDot'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
document.addEventListener('mousedown',()=>{ring.classList.add('clicking');dot.style.transform='translate(-50%,-50%) scale(1.8)'});
document.addEventListener('mouseup',()=>{ring.classList.remove('clicking');dot.style.transform='translate(-50%,-50%) scale(1)'});
function animCursor(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animCursor)}
animCursor();
document.querySelectorAll('a,button,.skill-card,.ach-card,.tl-card,.certificate-card,.stat-box,.social-card,.contact-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hovered'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hovered'));
});

/* ── SKILL CARD LIGHT ── */
document.querySelectorAll('.skill-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
    card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
  });
});

/* ── NAV SCROLL ── */
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60);
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{e.preventDefault();document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth',block:'start'})});
});

/* ── PARALLAX HERO GRID ── */
window.addEventListener('scroll',()=>{
  const g=document.querySelector('.hero-grid');
  if(g)g.style.transform=`translateY(${window.scrollY*.18}px)`;
  // Parallax hero badges
  const badges=document.querySelectorAll('.hero-badge');
  badges.forEach((b,i)=>{b.style.transform=`translateY(${window.scrollY*(.06*(i+1))}px) rotate(${i%2?1:-1}deg)`});
});

/* ── COUNT UP ── */
function countUp(el){
  const target=parseInt(el.dataset.target),dur=1600;
  const start=performance.now();
  const step=ts=>{
    const p=Math.min((ts-start)/dur,1);
    el.textContent=Math.round(p*p*(3-2*p)*target);
    if(p<1)requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ── INTERSECTION OBSERVER ── */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // Count up numbers
      e.target.querySelectorAll('.count-up').forEach(n=>countUp(n));
    }
  });
},{threshold:.12,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal,.tl-item,.lang-card,.stagger-children').forEach(el=>observer.observe(el));

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-glass').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.25;
    const y=(e.clientY-r.top-r.height/2)*.25;
    btn.style.transform=`translate(${x}px,${y}px) translateY(-4px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform=''});
});

/* ── TYPEWRITER ── */
window.addEventListener('load',()=>{
  const sub=document.querySelector('.hero-subtitle');
  if(!sub)return;
  const parts=['Software Engineer',' · ','Web Developer',' · ','Taekwondo Champion',' · ','Digital Marketer'];
  sub.innerHTML='';
  let partIdx=0,charIdx=0;
  function type(){
    if(partIdx>=parts.length)return;
    const part=parts[partIdx];
    if(charIdx===0&&(part===' · ')){
      const sep=document.createElement('span');sep.className='sep';sep.textContent=' · ';sub.appendChild(sep);
      partIdx++;charIdx=0;setTimeout(type,110);return;
    }
    if(charIdx===0){
      const span=document.createElement('span');span.className='tw-part-'+partIdx;sub.appendChild(span);
    }
    const span=sub.querySelector('.tw-part-'+partIdx);
    span.textContent=part.slice(0,charIdx+1);
    charIdx++;
    if(charIdx>=part.length){partIdx++;charIdx=0;setTimeout(type,80)}
    else{setTimeout(type,22)}
  }
  setTimeout(type,1600);
});

/* ── CERTIFICATE CAROUSEL ── */
const certificateImages=['20.jpg','16.png','9.png','12.png','13.jpg','24.jpg','14.png','22.jpg','8.jpg','21.jpg','29.png','27.png','25.jpg','28.jpg','1.jpeg','18.png','15.jpg','26.jpg','3.png','5.png','23.jpg','6.jpg','7.png','30.png','2.jpg','4.jpg','11.jpg','17.jpg','19.jpg','31.jpg','32.jpeg','33.jpeg','34.jpeg','35.jpeg','36.jpeg'];
let currentIndex=0;
const track=document.getElementById('carouselTrack'),prevBtn=document.getElementById('prevBtn'),nextBtn=document.getElementById('nextBtn'),dotsContainer=document.getElementById('carouselDots'),counter=document.getElementById('counter'),lightbox=document.getElementById('lightbox'),lightboxImage=document.getElementById('lightboxImage'),lightboxClose=document.getElementById('lightboxClose');
function getCP(){return window.innerWidth<769?1:window.innerWidth<1025?2:3}
function populateCerts(){
  const frag=document.createDocumentFragment();
  certificateImages.forEach((src,i)=>{
    const card=document.createElement('div');card.className='certificate-card';
    const img=document.createElement('img');img.className='certificate-image';img.src=src;img.alt=`Certificate ${i+1}`;img.loading='lazy';
    img.onerror=()=>{img.src=`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23141420' width='400' height='300' rx='12'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23c084fc' font-size='16' font-family='monospace'%3ECertificate ${i+1}%3C/text%3E%3C/svg%3E`};
    card.addEventListener('click',()=>{lightboxImage.src=src;lightbox.classList.add('active');document.body.style.overflow='hidden'});
    card.appendChild(img);frag.appendChild(card);
  });
  track.appendChild(frag);
}
function createDots(){
  const total=Math.ceil(certificateImages.length/getCP());dotsContainer.innerHTML='';
  for(let i=0;i<total;i++){const d=document.createElement('div');d.className='dot';d.addEventListener('click',()=>goTo(i));dotsContainer.appendChild(d)}
}
function updateCarousel(){
  const cpv=getCP(),cardW=track.children[0]?.offsetWidth||0,gap=24;
  track.style.transform=`translateX(-${currentIndex*(cardW+gap)*cpv}px)`;
  dotsContainer.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('active',i===currentIndex));
  const total=Math.ceil(certificateImages.length/cpv);
  counter.textContent=`${currentIndex+1} / ${total}`;
  prevBtn.disabled=currentIndex===0;nextBtn.disabled=currentIndex>=total-1;
}
function goTo(i){const total=Math.ceil(certificateImages.length/getCP());currentIndex=Math.max(0,Math.min(i,total-1));updateCarousel()}
prevBtn.addEventListener('click',()=>goTo(currentIndex-1));
nextBtn.addEventListener('click',()=>goTo(currentIndex+1));
lightboxClose.addEventListener('click',()=>{lightbox.classList.remove('active');document.body.style.overflow=''});
lightbox.addEventListener('click',e=>{if(e.target===lightbox){lightbox.classList.remove('active');document.body.style.overflow=''}});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){lightbox.classList.remove('active');document.body.style.overflow=''}
  if(!lightbox.classList.contains('active')){if(e.key==='ArrowLeft')goTo(currentIndex-1);if(e.key==='ArrowRight')goTo(currentIndex+1)}
});
let touchStartX=0;
track.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX});
track.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-touchStartX;if(Math.abs(dx)>50)goTo(currentIndex+(dx<0?1:-1))});
let rTo;window.addEventListener('resize',()=>{clearTimeout(rTo);rTo=setTimeout(()=>{createDots();currentIndex=0;updateCarousel()},250)});
populateCerts();createDots();updateCarousel();