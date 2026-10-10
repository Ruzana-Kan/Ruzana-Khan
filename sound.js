(function(){"use strict";
var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
var KEY="rk-sound-v2",pref=null;try{pref=localStorage.getItem(KEY)}catch(e){}
var want=pref?pref==="on":!matchMedia("(prefers-reduced-motion: reduce)").matches;
var ctx,master,sfx,musicBus,musicLP,verb,windG,noiseBuf,on=false,ready=false,timer=0,nextBar=0,barN=0;
var btn=document.getElementById("snd"),lbl=document.getElementById("sndt");
function hz(m){return 440*Math.pow(2,(m-69)/12)}

/* ---- the song: 8 bars, 60 BPM, C - Am - F - G | C - Em - F - G (slow, warm, looping) ---- */
var BEAT=1.0, BAR=4*BEAT;
var SONG=[
 {b:36,a:[60,64,67,72,67,64,67,64],p:[55,60,64],m:[[0,79,2],[2,76,2]]},
 {b:33,a:[57,60,64,69,64,60,64,60],p:[57,60,64],m:[[0,72,1],[1,76,1],[2,74,2]]},
 {b:41,a:[60,65,69,72,69,65,69,65],p:[57,60,65],m:[[0,77,2],[2,76,1],[3,72,1]]},
 {b:43,a:[59,62,67,71,67,62,67,62],p:[59,62,67],m:[[0,74,3],[3,71,1]]},
 {b:36,a:[60,64,67,72,67,64,67,64],p:[55,60,64],m:[[0,76,2],[2,79,2]]},
 {b:40,a:[59,64,67,71,67,64,67,64],p:[55,59,64],m:[[0,71,2],[2,76,2]]},
 {b:41,a:[60,65,69,72,69,65,69,65],p:[57,60,65],m:[[0,77,1.5],[1.5,76,.5],[2,72,2]]},
 {b:43,a:[59,62,67,71,67,62,67,62],p:[59,62,67],m:[[0,74,2],[2,67,2]]}
];

function build(){
  ctx=new AC();
  master=ctx.createGain();master.gain.value=0;
  /* soften everything: gentle low-pass + compressor */
  var soft=ctx.createBiquadFilter();soft.type="lowpass";soft.frequency.value=5200;soft.Q.value=.3;
  var comp=ctx.createDynamicsCompressor();comp.threshold.value=-24;comp.ratio.value=3;
  master.connect(soft);soft.connect(comp);comp.connect(ctx.destination);
  /* long, smooth reverb */
  var len=ctx.sampleRate*3.6,imp=ctx.createBuffer(2,len,ctx.sampleRate);
  for(var c=0;c<2;c++){var d=imp.getChannelData(c);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3)}
  verb=ctx.createConvolver();verb.buffer=imp;var vg=ctx.createGain();vg.gain.value=.7;verb.connect(vg);vg.connect(master);
  musicLP=ctx.createBiquadFilter();musicLP.type="lowpass";musicLP.frequency.value=1800;musicLP.Q.value=.3;
  musicBus=ctx.createGain();musicBus.gain.value=1;musicLP.connect(musicBus);musicBus.connect(master);musicBus.connect(verb);
  sfx=ctx.createGain();sfx.gain.value=.8;sfx.connect(master);var sv=ctx.createGain();sv.gain.value=.4;sfx.connect(sv);sv.connect(verb);
  noiseBuf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
  var nd=noiseBuf.getChannelData(0);for(var k=0;k<nd.length;k++)nd[k]=Math.random()*2-1;
  var w=ctx.createBufferSource();w.buffer=noiseBuf;w.loop=true;
  var wf=ctx.createBiquadFilter();wf.type="lowpass";wf.frequency.value=500;wf.Q.value=.3;
  windG=ctx.createGain();windG.gain.value=0;w.connect(wf);wf.connect(windG);windG.connect(master);w.start();
  ready=true;
}

/* soft piano / music-box note: sine + faint octave, slow smooth envelope */
function note(m,t,dur,vel,dest,bright){
  var f=hz(m),o1=ctx.createOscillator(),o2=ctx.createOscillator(),g=ctx.createGain(),g2=ctx.createGain();
  o1.type="sine";o2.type="sine";o1.frequency.value=f;o2.frequency.value=f*2;
  g2.gain.value=bright||.18;
  g.gain.setValueAtTime(0.0001,t);
  g.gain.linearRampToValueAtTime(vel,t+.03);
  g.gain.exponentialRampToValueAtTime(vel*.45,t+Math.min(.5,dur*.4));
  g.gain.exponentialRampToValueAtTime(.0001,t+dur+.6);
  o1.connect(g);o2.connect(g2);g2.connect(g);g.connect(dest||musicLP);
  o1.start(t);o2.start(t);o1.stop(t+dur+.7);o2.stop(t+dur+.7);
}
/* warm sustained pad tone */
function padTone(m,t,dur){
  [-5,5].forEach(function(dt){
    var o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=hz(m);o.detune.value=dt;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.022,t+1.6);g.gain.setValueAtTime(.022,t+dur-1.2);g.gain.linearRampToValueAtTime(0,t+dur+1.2);
    o.connect(g);g.connect(musicLP);o.start(t);o.stop(t+dur+1.3);
  });
}
function scheduleBar(t){
  var b=SONG[barN%SONG.length];barN++;
  /* soft bass */
  note(b.b,t,BAR*.95,.075,musicLP,.05);
  /* pad */
  b.p.forEach(function(m){padTone(m,t,BAR)});
  /* gentle flowing arpeggio (eighth notes) */
  b.a.forEach(function(m,i){note(m,t+i*.5*BEAT,.9,.026+(i%2?0:.008),musicLP,.1)});
  /* sweet melody, music-box feel (octave above pad, light sparkle) */
  b.m.forEach(function(n){note(n[1],t+n[0]*BEAT+.01,n[2]*BEAT*.9,.048,musicLP,.22)});
}
function tick(){
  if(!on||!ctx)return;
  while(nextBar<ctx.currentTime+1.8){scheduleBar(nextBar);nextBar+=BAR}
}

/* ---- gentle sound effects ---- */
function tone(f,t,d,type,v,dest,a){var o=ctx.createOscillator(),g=ctx.createGain();o.type=type||"sine";o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+(a||.012));g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(dest||sfx);o.start(t);o.stop(t+d+.05)}
function whoosh(up,v){var t=ctx.currentTime,s=ctx.createBufferSource();s.buffer=noiseBuf;var f=ctx.createBiquadFilter();f.type="lowpass";f.Q.value=.5;
  f.frequency.setValueAtTime(up?250:1400,t);f.frequency.exponentialRampToValueAtTime(up?1400:250,t+.9);
  var g=ctx.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v||.05,t+.4);g.gain.exponentialRampToValueAtTime(.0001,t+1);
  s.connect(f);f.connect(g);g.connect(sfx);s.start(t);s.stop(t+1.1)}
function chime(m,v){var t=ctx.currentTime,f=hz(m);tone(f,t,1.8,"sine",v||.07,null,.015);tone(f*2,t,1.2,"sine",(v||.07)*.22,null,.015)}
var PENT=[72,74,76,79,81,84,86];
var S={
  hover:function(){tone(1250+Math.random()*150,ctx.currentTime,.09,"sine",.014,null,.015)},
  click:function(){var t=ctx.currentTime;tone(660,t,.18,"sine",.05,null,.01);tone(880,t+.06,.22,"sine",.035,null,.01)},
  gravity:function(){var t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(55,t+1.6);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.14,t+.5);g.gain.exponentialRampToValueAtTime(.0001,t+1.7);o.connect(g);g.connect(sfx);o.start(t);o.stop(t+1.8);whoosh(false,.035)},
  chapter:function(i){whoosh(true,.04);chime(PENT[i%PENT.length],.06)},
  year:function(i){chime(PENT[i%PENT.length]+0,.075)},
  word:function(){tone(hz(84),ctx.currentTime,.6,"sine",.03,null,.02)},
  lightbox:function(){whoosh(true,.035)},
  enter:function(){[60,64,67,72,76].forEach(function(m,i){setTimeout(function(){if(on)chime(m+12,.06)},i*180)})}
};

function setOn(v,save){
  if(v&&!ready)build();
  if(!ctx)return;
  on=v;btn.classList.toggle("on",v);btn.setAttribute("aria-pressed",v);lbl.textContent=v?"Sound on":"Sound off";
  if(save){try{localStorage.setItem(KEY,v?"on":"off")}catch(e){}}
  clearInterval(timer);
  if(v){ctx.resume();master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(.55,ctx.currentTime,1.2);nextBar=ctx.currentTime+.15;tick();timer=setInterval(tick,400)}
  else{master.gain.setTargetAtTime(0,ctx.currentTime,.25)}
}
btn.addEventListener("click",function(){
  if(!ready){want=true;setOn(true,true);S.click();return}
  var v=!on;if(v){setOn(true,true);S.click()}else{S.click();setOn(false,true)}
});
/* start on first real gesture (browsers block autoplay) */
function firstGesture(e){
  if(e.target&&e.target.closest&&e.target.closest("#snd"))return;
  removeEventListener("pointerdown",firstGesture,true);removeEventListener("keydown",firstGesture,true);
  if(want){setOn(true,false);if(e.target&&e.target.closest&&e.target.closest("#ldgo"))setTimeout(S.enter,300)}
}
addEventListener("pointerdown",firstGesture,true);addEventListener("keydown",firstGesture,true);
document.addEventListener("visibilitychange",function(){if(!ctx||!on)return;if(document.hidden){clearInterval(timer);ctx.suspend()}else{ctx.resume();nextBar=ctx.currentTime+.15;timer=setInterval(tick,400)}});
/* hover / click */
var lastH=null,lastT=0,HOT="a,button,summary,.ct,.gc,.sphere";
document.addEventListener("pointerover",function(e){if(!on)return;var h=e.target.closest&&e.target.closest(HOT);if(h&&h!==lastH&&performance.now()-lastT>120){lastT=performance.now();S.hover()}lastH=h||null});
document.addEventListener("pointerdown",function(e){if(!on||e.target.closest("#snd"))return;
  if(e.target.closest(HOT+",.lb")){S.click()}else if(document.body.className.indexOf("loading")<0){S.gravity()}});
/* chapter change */
var cnt=document.getElementById("cnt"),lastCh=null;
if(cnt){lastCh=parseInt(cnt.textContent,10);new MutationObserver(function(){var n=parseInt(cnt.textContent,10);if(lastCh!==null&&n!==lastCh&&on)S.chapter(n);lastCh=n}).observe(cnt,{childList:true,characterData:true,subtree:true})}
/* awards years */
document.querySelectorAll(".ay").forEach(function(a,i){var was=a.classList.contains("on2");new MutationObserver(function(){var now=a.classList.contains("on2");if(now&&!was&&on)S.year(i);was=now}).observe(a,{attributes:true,attributeFilter:["class"]})});
/* craft rotating word */
var cw=document.getElementById("cw");
if(cw)Array.prototype.forEach.call(cw.children,function(s){var was=s.classList.contains("on");new MutationObserver(function(){var now=s.classList.contains("on");if(now&&!was&&on)S.word();was=now}).observe(s,{attributes:true,attributeFilter:["class"]})});
/* lightbox */
var lb=document.getElementById("lb");
if(lb){var lw=false;new MutationObserver(function(){var now=lb.classList.contains("on");if(now&&!lw&&on)S.lightbox();lw=now}).observe(lb,{attributes:true,attributeFilter:["class"]})}
/* very faint scroll air */
var ly=scrollY,wt=0;
addEventListener("scroll",function(){if(!on||!windG)return;var v=Math.abs(scrollY-ly);ly=scrollY;
  windG.gain.setTargetAtTime(Math.min(.022,v*.0009),ctx.currentTime,.12);clearTimeout(wt);wt=setTimeout(function(){windG.gain.setTargetAtTime(0,ctx.currentTime,.4)},160)},{passive:true});
/* music opens up very slightly deeper into the story */
setInterval(function(){if(!on||!musicLP)return;var n=parseInt((cnt&&cnt.textContent)||"1",10)||1;musicLP.frequency.setTargetAtTime(1500+n*140,ctx.currentTime,3)},2000);
})();
