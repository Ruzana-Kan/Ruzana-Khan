(function(){"use strict";
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))},cl=function(v,a,b){return Math.max(a==null?0:a,Math.min(b==null?1:b,v))},ss=function(a,b,x){x=cl((x-a)/(b-a));return x*x*(3-2*x)};
var H=document.documentElement,RM=matchMedia("(prefers-reduced-motion: reduce)").matches,FINE=matchMedia("(hover:hover) and (pointer:fine)").matches;
if(RM)H.classList.add("static");
/* split text helpers */
$$(".name .ln").forEach(function(el,li){var g=el.dataset.g,t=el.dataset.t;el.innerHTML=t.split("").map(function(c,i){return'<b class="lt'+(g?" grad":"")+'" style="--i:'+(li*6+i)+';font-weight:inherit">'+c+"</b>"}).join("")});
$$(".split").forEach(function(h){var n=0;(function walk(node){[].slice.call(node.childNodes).forEach(function(c){if(c.nodeType===3){var f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(" "));return}var s=document.createElement("span");s.className="sw";s.innerHTML='<i'+(c.parentNode.closest&&c.parentNode.closest(".grad")?' class="grad"':"")+' style="--i:'+(n++)+'">'+w+"</i>";f.appendChild(s)});c.parentNode.replaceChild(f,c)}else if(c.nodeType===1&&!c.classList.contains("sw"))walk(c)})})(h)});
var qa=$("#qa"),qw=qa.textContent.trim().split(/\s+/);qa.innerHTML=qw.map(function(w){return'<span class="w">'+w+"</span>"}).join(" ");qw=$$(".w",qa);
/* loader */
var started=false;function enter(){if(started)return;started=true;document.body.classList.remove("loading");H.classList.add("go");var l=$("#loader");l.classList.add("out");setTimeout(function(){l.style.display="none"},600)}
if(RM){enter()}else{var ldn=$("#ldn"),ldb=$("#ldb"),go=$("#ldgo"),t0=performance.now(),ready=false,fontsOk=false;
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){fontsOk=true});setTimeout(function(){fontsOk=true},1200);
(function st(){var n=Math.min(100,Math.round((performance.now()-t0)/6));if(n>=100&&!fontsOk)n=99;ldn.textContent=n;ldb.style.width=n+"%";if(n>=100){$("#ldt").textContent="The story is ready";go.disabled=false;ready=true;return}requestAnimationFrame(st)})();
go.addEventListener("click",enter);addEventListener("keydown",function(e){if(ready&&(e.key==="Enter"||e.key===" "))enter()});addEventListener("wheel",function(){if(ready)enter()},{passive:true});addEventListener("touchmove",function(){if(ready)enter()},{passive:true})}
/* chapters */
var chs=$$(".chp");var dots=$("#dots");
chs.forEach(function(c,i){var b=document.createElement("button");b.setAttribute("aria-label","Go to chapter "+(i+1)+": "+c.dataset.name);b.innerHTML="<span>"+c.dataset.name+"</span><i></i>";b.onclick=function(){goTo(i)};dots.appendChild(b)});
function goTo(i){i=cl(i,0,chs.length-1);var y=chs[i].getBoundingClientRect().top+scrollY;scrollTo({top:y+(i===0?0:2),behavior:RM?"auto":"smooth"})}
function toTop(){scrollTo({top:0,behavior:RM?"auto":"smooth"})}$("#totop").onclick=toTop;$("#totop2").onclick=toTop;
var cur=0;$("#pvc").onclick=function(){goTo(cur-1)};$("#nxc").onclick=function(){goTo(cur+1)};
var mcb=$("#mcb"),cnt=$("#cnt"),db=$$("button",dots);
function setScene(i){if(i===setScene.l)return;setScene.l=i;cnt.textContent=("0"+(i+1)).slice(-2)+" / "+("0"+chs.length).slice(-2);mcb.style.transform="rotateX(-18deg) rotateY("+(i*-90)+"deg)";db.forEach(function(b,k){b.classList.toggle("on",k===i)})}
function applyFlat(){var narrow=innerWidth<760;chs.forEach(function(c){c.classList.toggle("flat",RM||(narrow&&c.hasAttribute("data-mflat")))})}applyFlat();
/* journey sizing */
var jr=$("#journey"),hz=$("#hz"),jbar=$("#jbar i");function sizeJ(){if(jr.classList.contains("flat")){jr.style.removeProperty("--h");return}jr.style.setProperty("--h",(innerHeight+Math.max(0,hz.scrollWidth-innerWidth+40))+"px")}
/* craft orbit */
var orbit=$("#orbit");["gsh","eln"].forEach(function(c){var e=document.createElement("div");e.className=c;orbit.appendChild(e)});
var TL=[["HTML","var(--c)"],["Laravel","var(--p)"],["SEO","var(--pk)"],["PHP","var(--g)"],["Python","var(--gold)"],["Marketing","var(--c)"],["JavaScript","var(--p)"],["Leadership","var(--g)"]],tiles=TL.map(function(t){var d=document.createElement("div");d.className="tile";d.textContent=t[0];d.style.setProperty("--tc",t[1]);orbit.appendChild(d);return d});
var CW=["scale","inspire","win","rank","last"],cw=$("#cw"),cwi=-1;cw.innerHTML=CW.map(function(w){return"<span>"+w+"</span>"}).join("");var cws=$$("span",cw);cws[0].className="on";cwi=0;
function setWord(i){if(i===cwi)return;cws.forEach(function(s,k){s.className=k===i?"on":(k===cwi?"out":"")});cwi=i}
/* skills sphere */
var sphere=$("#sphere"),cards=$$(".gc"),tags=[];
cards.forEach(function(c,ci){$$(".tgs span",c).forEach(function(s){var e=document.createElement("span");e.className="tg";e.textContent=s.textContent;e.style.setProperty("--k",getComputedStyle(c).getPropertyValue("--k")||"#c084fc");e.dataset.c=ci;sphere.appendChild(e);tags.push(e)})});
var N=tags.length,pts=tags.map(function(_,i){var ph=Math.acos(1-2*(i+.5)/N),th=Math.PI*(1+Math.sqrt(5))*(i+.5);return[Math.sin(ph)*Math.cos(th),Math.cos(ph),Math.sin(ph)*Math.sin(th)]});
var rx=.35,ry=0,vx=0,vy=.004,drag=false,lx=0,ly=0,actC=-1,SR=200;
sphere.addEventListener("pointerdown",function(e){drag=true;lx=e.clientX;ly=e.clientY;try{sphere.setPointerCapture(e.pointerId)}catch(_){}});
sphere.addEventListener("pointermove",function(e){if(!drag)return;vy=(e.clientX-lx)*.0035;vx=(e.clientY-ly)*.0035;ry+=vy;rx+=vx;lx=e.clientX;ly=e.clientY});
["pointerup","pointercancel"].forEach(function(n){sphere.addEventListener(n,function(){drag=false})});
function drawSphere(){SR=sphere.offsetWidth*.4;if(!drag){ry+=vy;rx+=vx;vx*=.95;vy+=(.004-vy)*.03;rx+=(.35-rx)*.01}
var cy=Math.cos(ry),sy=Math.sin(ry),cx=Math.cos(rx),sx=Math.sin(rx);
for(var i=0;i<N;i++){var p=pts[i],x=p[0]*cy+p[2]*sy,z=-p[0]*sy+p[2]*cy,y=p[1]*cx-z*sx,z2=p[1]*sx+z*cx,d=(z2+1)/2,dim=actC<0||+tags[i].dataset.c===actC?1:.18;
tags[i].style.transform="translate(-50%,-50%) translate("+(x*SR).toFixed(1)+"px,"+(y*SR).toFixed(1)+"px) scale("+(.7+.4*d).toFixed(3)+")";tags[i].style.opacity=((.3+.7*d)*dim).toFixed(2);tags[i].style.zIndex=Math.round(d*10)}}
/* awards cube */
var cube=$("#cube"),ays=$$(".ay"),ayi=-1;
var YR=[["HONOUR","linear-gradient(135deg,var(--p),var(--pk))"],["PRIZE","linear-gradient(135deg,var(--c),var(--g))"],["DIPLOMA","linear-gradient(135deg,var(--g),var(--gold))"],["CODER","linear-gradient(135deg,var(--pk),var(--p))"],["BRONZE","linear-gradient(135deg,#d6a36c,var(--c))"],["PROJECT","linear-gradient(135deg,var(--c),var(--p))"],["GOLD","linear-gradient(135deg,var(--gold),#fde68a)"]],cfaces=$$(".cube .f1,.cube .f2,.cube .f3,.cube .f4");
function showFace(i){var f=cfaces[i%4];f.innerHTML=ays[i].querySelector("b").textContent+"<small>"+YR[i][0]+"</small>";f.style.background=YR[i][1]}
ays.forEach(function(a,k){a.style.setProperty("--yg",YR[k][1])});for(var yi=0;yi<4;yi++)showFace(yi);
function setYear(i){if(i===ayi)return;ayi=i;ays.forEach(function(a,k){a.classList.toggle("on2",k===i)});showFace(i);cube.style.transform="rotateX(-14deg) rotateY("+(-90*i)+"deg)"}
/* handlers */
var heroA=$("#heroA"),heroB=$("#heroB"),scA=$("#scA"),scB=$("#scB"),fps=$$("[data-fp]"),counted=false;
var HD={
hero:function(p){var oa=1-ss(.05,.42,p);heroA.style.opacity=oa;heroA.style.transform="translateY("+(-p*50)+"px) scale("+(1+p*.1)+")";heroA.style.pointerEvents=oa>.5?"auto":"none";var ib=ss(.4,.58,p),ob=ib*(1-ss(.9,1,p));heroB.style.opacity=ob;heroB.style.transform="translateY("+((1-ib)*30)+"px)";heroB.style.pointerEvents=ob>.5?"auto":"none"},
about:function(p){var n=qw.length,k=ss(.04,.4,p)*(n+1);qw.forEach(function(w,i){w.classList.toggle("lit",i<k)});var oa=1-ss(.44,.54,p);scA.style.opacity=oa;scA.style.pointerEvents=oa>.5?"auto":"none";scB.style.opacity=ss(.5,.58,p);fps.forEach(function(f,i){var s=.54+i*.07,v=ss(s,s+.06,p);f.style.opacity=v;f.style.transform="translateY("+((1-v)*18)+"px)"});if(p>.78&&!counted){counted=true;$$("[data-count]").forEach(function(e){var n=+e.dataset.count,t0=performance.now();(function f(t){var k=cl((t-t0)/1500);e.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)})}},
craft:function(p,r){setWord(Math.min(4,Math.floor(p*5)));var W=r.width,Hh=innerHeight,th=-14*Math.PI/180;tiles.forEach(function(t,k){var a=k/tiles.length*6.283+p*6.283*1.4,d=(Math.sin(a)+1)/2,x0=Math.cos(a)*W*.4,y0=Math.sin(a)*Hh*.3;t.style.transform="translate("+(x0*Math.cos(th)-y0*Math.sin(th)).toFixed(1)+"px,"+(x0*Math.sin(th)+y0*Math.cos(th)).toFixed(1)+"px) scale("+(.82+.24*d).toFixed(3)+")";t.style.opacity=(.5+.5*d).toFixed(2);t.style.zIndex=d>.5?2:1;t.style.boxShadow="0 "+(8+16*d).toFixed(0)+"px "+(16+16*d).toFixed(0)+"px -8px rgba(0,0,0,"+(.35+.3*d).toFixed(2)+"),0 0 "+(10+16*d).toFixed(0)+"px -6px "+t.style.getPropertyValue("--tc")});},
skills:function(p){var i=Math.min(4,Math.floor(p*5.2));cards.forEach(function(c,k){c.classList.toggle("act",k===i)});actC=i},
journey:function(p){var sw=hz.scrollWidth-innerWidth+40;hz.style.transform="translateX("+(-p*Math.max(0,sw)).toFixed(1)+"px)";jbar.style.transform="scaleX("+p.toFixed(3)+")"},
awards:function(p){setYear(Math.min(6,Math.floor(p*7)))}
};
var visFlags={};
function frame(){var vh=innerHeight,sy=scrollY,m=document.documentElement.scrollHeight-vh;$("#prog").style.transform="scaleX("+(m>0?sy/m:0)+")";$("#top").classList.toggle("s",sy>60);$("#totop").classList.toggle("show",sy>vh*.8);var act=cur;
chs.forEach(function(ch,i){var r=ch.getBoundingClientRect(),tot=r.height-vh,flat=ch.classList.contains("flat"),vis=r.bottom>-60&&r.top<vh+60;ch.classList.toggle("on",r.top<vh*.65&&r.bottom>vh*.35);visFlags[ch.id]=vis&&!flat;var p=tot>1?cl(-r.top/tot):cl((vh-r.top)/(vh+r.height));if(vis&&!flat&&HD[ch.id])HD[ch.id](p,r);if(r.top<=vh*.5&&r.bottom>vh*.5)act=i});
cur=act;setScene(cur)}
var tk=0;addEventListener("scroll",function(){if(!tk)tk=requestAnimationFrame(function(){tk=0;frame()})},{passive:true});
addEventListener("resize",function(){applyFlat();sizeJ();frame()});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){sizeJ();frame()});
sizeJ();frame();
/* flat-mode: sphere never dims */
(function loop(){requestAnimationFrame(loop);if(visFlags.skills||$("#skills").classList.contains("flat")&&sphere.getBoundingClientRect().top<innerHeight&&sphere.getBoundingClientRect().bottom>0){if($("#skills").classList.contains("flat"))actC=-1;if(!RM)drawSphere();else if(!loop.d){drawSphere();loop.d=1}}})();
/* certificates + lightbox */
var IM=['20.jpg','39.png','16.png','9.png','12.png','13.jpg','24.jpg','14.png','22.jpg','8.jpg','21.jpg','29.png','27.png','25.jpg','28.jpg','1.jpeg','18.png','15.jpg','26.jpg','3.png','5.png','23.jpg','6.jpg','7.png','30.png','2.jpg','4.jpg','11.jpg','17.jpg','19.jpg','31.jpg','32.jpeg','33.jpeg','34.jpeg','35.jpeg','36.jpeg','37.jpeg','38.jpeg'],csr=$("#cs"),lb=$("#lb");
IM.forEach(function(s,i){var d=document.createElement("div");d.className="ct";d.setAttribute("role","button");d.tabIndex=0;var im=document.createElement("img");im.src=s;im.loading="lazy";im.decoding="async";im.width=360;im.height=270;im.alt="Certificate "+(i+1)+" earned by Ruzana Khan";im.onerror=function(){im.remove();d.textContent="Certificate "+(i+1)};d.onclick=function(){$("#li").src=s;lb.classList.add("on")};d.onkeydown=function(e){if(e.key==="Enter")d.onclick()};d.appendChild(im);csr.appendChild(d)});
$("#pv").onclick=function(){csr.scrollBy({left:-380,behavior:"smooth"})};$("#nx").onclick=function(){csr.scrollBy({left:380,behavior:"smooth"})};
$("#lcl").onclick=function(){lb.classList.remove("on")};lb.onclick=function(e){if(e.target===lb)lb.classList.remove("on")};addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("on")});
/* custom cursor + magnetic buttons */
if(FINE&&!RM){H.classList.add("cur");var cu=$("#cur"),cr=$(".r",cu),cd=$(".d",cu),mx=innerWidth/2,my=innerHeight/2,rx2=mx,ry2=my;
addEventListener("pointermove",function(e){mx=e.clientX;my=e.clientY;cd.style.transform="translate("+mx+"px,"+my+"px)"});
(function lp(){requestAnimationFrame(lp);rx2+=(mx-rx2)*.18;ry2+=(my-ry2)*.18;cr.style.transform="translate("+rx2.toFixed(1)+"px,"+ry2.toFixed(1)+"px)"})();
document.addEventListener("pointerover",function(e){cu.classList.toggle("h",!!e.target.closest("a,button,summary,.ct,.sphere,.gc"))});
$$(".btn").forEach(function(b){b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+((e.clientX-r.left-r.width/2)*.18).toFixed(1)+"px,"+((e.clientY-r.top-r.height/2)*.3).toFixed(1)+"px)"});b.addEventListener("pointerleave",function(){b.style.transform=""})})}
/* constellation background: drifts, follows the cursor, and gravitizes on click */
(function(){var cv=$("#bg"),x=cv.getContext("2d"),W=0,Hh=0,ps=[],mx=-999,my=-999,grav=0,dpr=Math.min(devicePixelRatio||1,1.5),cols=["192,132,252","103,232,249","52,211,153"];
function size(){if(W===innerWidth&&Math.abs(Hh-innerHeight)<140)return;W=innerWidth;Hh=innerHeight;cv.width=W*dpr;cv.height=Hh*dpr;x.setTransform(dpr,0,0,dpr,0,0);var n=Math.min(120,Math.round(W*Hh/14000));while(ps.length<n)ps.push({x:Math.random()*W,y:Math.random()*Hh,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.5+.6,c:cols[ps.length%3]});ps.length=n}
size();addEventListener("resize",size);
addEventListener("pointermove",function(e){mx=e.clientX;my=e.clientY});
addEventListener("pointerdown",function(e){if(e.target.closest("a,button,summary,.sphere,.ct,.lb,input")||!started)return;mx=e.clientX;my=e.clientY;grav=1;var c=$("#cur");if(c){c.classList.add("g");setTimeout(function(){c.classList.remove("g")},900)}});
if(RM){ps.forEach(function(p){x.fillStyle="rgba("+p.c+",.5)";x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill()});return}
function loop(){requestAnimationFrame(loop);if(document.hidden)return;x.clearRect(0,0,W,Hh);grav*=.988;if(grav<.01)grav=0;
for(var i=0;i<ps.length;i++){var p=ps[i],dx=mx-p.x,dy=my-p.y,d=Math.sqrt(dx*dx+dy*dy)+.01;
if(grav>0){var f=.09*grav;p.vx+=dx/d*f-dy/d*f*.55;p.vy+=dy/d*f+dx/d*f*.55}else if(d<220){p.vx+=dx/d*.012;p.vy+=dy/d*.012}
p.vx*=.985;p.vy*=.985;var sp=Math.hypot(p.vx,p.vy);if(sp<.12){p.vx+=(Math.random()-.5)*.02;p.vy+=(Math.random()-.5)*.02}if(sp>4){p.vx*=4/sp;p.vy*=4/sp}
p.x+=p.vx;p.y+=p.vy;if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;if(p.y<-10)p.y=Hh+10;if(p.y>Hh+10)p.y=-10;
x.fillStyle="rgba("+p.c+",.7)";x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();
for(var j=i+1;j<ps.length;j++){var q=ps[j],ex=p.x-q.x,ey=p.y-q.y,e2=ex*ex+ey*ey;if(e2<10000){x.strokeStyle="rgba("+p.c+","+(.16*(1-e2/10000)).toFixed(3)+")";x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}}}
loop()})();
})();