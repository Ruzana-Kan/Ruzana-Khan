var $=function(s){return document.querySelector(s)},cl=function(v){return Math.max(0,Math.min(1,v))};
var T=[["HTML","#b7a6d6"],["Laravel","#a9cdd6"],["SEO","#d6b6d4"],["PHP","#a9d0bf"],["Python","#dccd9f"],["Marketing","#b7a6d6"],["JavaScript","#a9cdd6"],["Leadership","#a9d0bf"]];
var orbit=$("#orbit");["gsh","eln in2","eln"].forEach(function(c){var e=document.createElement("div");e.className=c;orbit.appendChild(e)});var tiles=T.map(function(t){var d=document.createElement("div");d.className="tile";d.textContent=t[0];d.style.background=t[1];orbit.appendChild(d);return d});
var qp=$("#qp");qp.innerHTML=qp.textContent.split(" ").map(function(w){return'<span class="w">'+w+"</span>"}).join(" ");var ws=qp.querySelectorAll(".w");
var pin=$("#pin"),stages=[].slice.call(pin.querySelectorAll(".stage")),qe=$("#quote"),cyc=$("#cyc"),nav=$("#nav");
function frame(){var vh=innerHeight,r=pin.getBoundingClientRect(),p=cl(-r.top/(r.height-vh));
stages.forEach(function(s){var a=s.dataset.r.split(",").map(Number),o;if(p<a[0]||p>a[3])o=0;else if(p<a[1])o=a[1]===a[0]?1:(p-a[0])/(a[1]-a[0]);else if(p>a[2])o=1-(p-a[2])/(a[3]-a[2]);else o=1;o=cl(o);s.style.opacity=o;s.style.transform="translateY("+(1-o)*26+"px)";s.style.pointerEvents=o>.6?"auto":"none"});
var q=qe.getBoundingClientRect(),qg=cl(-q.top/(q.height-vh)*1.3);ws.forEach(function(w,k){w.classList.toggle("on",k/ws.length<qg+.05)});
var c=cyc.getBoundingClientRect(),cp=(vh-c.top)/(vh+c.height);
tiles.forEach(function(t,k){var a=k/tiles.length*6.283+cp*6.9,d=(Math.sin(a)+1)/2;var x0=Math.cos(a)*c.width*.4,y0=Math.sin(a)*c.height*.3,th=-14*Math.PI/180;t.style.transform="translate("+(x0*Math.cos(th)-y0*Math.sin(th))+"px,"+(x0*Math.sin(th)+y0*Math.cos(th))+"px) scale("+(.82+.24*d).toFixed(3)+") rotate("+Math.cos(a)*-5+"deg)";t.style.opacity=(.6+.4*d).toFixed(2);t.style.zIndex=d>.5?2:1;t.style.boxShadow="0 "+(8+18*d).toFixed(0)+"px "+(16+18*d).toFixed(0)+"px -8px rgba(29,26,43,"+(.22+.25*d).toFixed(2)+")"});
nav.classList.toggle("s",scrollY>60);var m=document.documentElement.scrollHeight-vh;$("#bar").style.transform="scaleX("+(m>0?scrollY/m:0)+")"}
addEventListener("scroll",frame,{passive:true});addEventListener("resize",frame);frame();
var W=["scale","inspire","win","rank","last"],cw=$("#cw"),wi=0;cw.innerHTML=W.map(function(w){return"<span>"+w+"</span>"}).join("");var cs=cw.children;cs[0].className="on";
setInterval(function(){var o=cs[wi];o.className="out";wi=(wi+1)%cs.length;var n=cs[wi];n.style.transition="none";n.className="";void n.offsetWidth;n.style.transition="";n.className="on";setTimeout(function(){o.className=""},750)},2300);
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".rv,.lc").forEach(function(e){io.observe(e)});
var nio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;nio.unobserve(e.target);var n=+e.target.dataset.count,t0=performance.now();(function f(t){var k=cl((t-t0)/1500);e.target.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)})},{threshold:.6});document.querySelectorAll("[data-count]").forEach(function(e){nio.observe(e)});
var IM=['20.jpg','16.png','9.png','12.png','13.jpg','24.jpg','14.png','22.jpg','8.jpg','21.jpg','29.png','27.png','25.jpg','28.jpg','1.jpeg','18.png','15.jpg','26.jpg','3.png','5.png','23.jpg','6.jpg','7.png','30.png','2.jpg','4.jpg','11.jpg','17.jpg','19.jpg','31.jpg','32.jpeg','33.jpeg','34.jpeg','35.jpeg','36.jpeg','37.jpeg','38.jpeg'],csr=$("#cs"),lb=$("#lb");
IM.forEach(function(s,i){var d=document.createElement("div");d.className="ct";d.setAttribute("role","button");d.tabIndex=0;var im=document.createElement("img");im.src=s;im.loading="lazy";im.decoding="async";im.width=360;im.height=270;im.alt="Certificate "+(i+1)+" earned by Ruzana Khan";im.onerror=function(){im.remove();d.textContent="Certificate "+(i+1)};d.onclick=function(){$("#li").src=s;lb.classList.add("on")};d.onkeydown=function(e){if(e.key==="Enter")d.onclick()};d.appendChild(im);csr.appendChild(d)});
$("#pv").onclick=function(){csr.scrollBy({left:-380,behavior:"smooth"})};$("#nx").onclick=function(){csr.scrollBy({left:380,behavior:"smooth"})};
$("#lc").onclick=function(){lb.classList.remove("on")};lb.onclick=function(e){if(e.target===lb)lb.classList.remove("on")};addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("on")});
document.querySelectorAll(".vz").forEach(function(e){io.observe(e)});
/* split the name into letters */
(function(){var n=0;[].forEach.call(document.querySelectorAll(".name .w1,.name .w2"),function(el){var g=el.classList.contains("grad");el.classList.remove("grad");el.setAttribute("aria-hidden","true");el.innerHTML=el.textContent.split("").map(function(c){return'<b class="ch'+(g?" grad":"")+'" style="--i:'+(n++)+'">'+c+"</b>"}).join("")});})();
(function(){
var qc=$("#qc"),cb=$("#cb"),spin=20,tx=0,ty=0,cx=0,cy=0,drag=false,lx=0,rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
addEventListener("pointermove",function(e){var r=qc.getBoundingClientRect();tx=Math.max(-1,Math.min(1,(e.clientX-(r.left+r.width/2))/(innerWidth/2)));ty=Math.max(-1,Math.min(1,(e.clientY-(r.top+r.height/2))/(innerHeight/2)));if(drag){spin+=(e.clientX-lx)*.6;lx=e.clientX}});
qc.addEventListener("pointerdown",function(e){drag=true;lx=e.clientX;try{qc.setPointerCapture(e.pointerId)}catch(_){}});
["pointerup","pointercancel"].forEach(function(n){qc.addEventListener(n,function(){drag=false})});
(function loop(){var r=qc.getBoundingClientRect();if(r.width>0&&r.bottom>0&&r.top<innerHeight){if(!drag&&!rm)spin+=.2;cx+=(tx-cx)*.08;cy+=(ty-cy)*.08;cb.style.transform="rotateX("+(-18-cy*35)+"deg) rotateY("+(spin+cx*55)+"deg)"}requestAnimationFrame(loop)})();
var ve=$("#vell");if(ve){var ns=[].slice.call(ve.querySelectorAll(".n")),A=125,B=52,th=-24*Math.PI/180,c=Math.cos(th),s=Math.sin(th);
function draw(ms){ns.forEach(function(n,i){var t=ms*.0004+i*6.2832/ns.length,x0=A*Math.cos(t),y0=B*Math.sin(t),x=x0*c-y0*s,y=x0*s+y0*c,d=(Math.sin(t)+1)/2;
n.style.transform="translate(-50%,-50%) translate("+x.toFixed(1)+"px,"+y.toFixed(1)+"px) scale("+(.78+.3*d).toFixed(3)+")";n.style.opacity=(.5+.5*d).toFixed(2);n.style.zIndex=d>.5?10:1})}
draw(0);if(!rm)(function f(t){draw(t);requestAnimationFrame(f)})(0)}
})();