document.documentElement.classList.add('js');
var $=function(s){return document.querySelector(s)};

/* loader */
(function(){
  var v=0,lv=$('#lv'),lp=$('#lp'),L=$('#loader');
  var t=setInterval(function(){
    v+=Math.ceil(Math.random()*6);
    if(v>=100){v=100;clearInterval(t);setTimeout(function(){L.classList.add('done');},250);}
    lv.textContent=v;lp.style.strokeDashoffset=314-314*v/100;
  },40);
  setTimeout(function(){L.classList.add('done');},3500);
})();

/* marquee */
(function(){
  var w=['Full Stack','AI Agents','Digital Marketing','React','Node.js','SEO','Automation','Social Media'];
  var h='';for(var i=0;i<2;i++)w.forEach(function(x){h+='<span>'+x+'</span>';});
  $('#mq').innerHTML=h+h;
})();

/* zigzag name animation */
(function(){
  var nm=document.querySelector('.name');
  nm.querySelectorAll('span').forEach(function(line,li){
    var t=line.textContent;line.setAttribute('aria-label',t);line.textContent='';
    t.split('').forEach(function(c,i){
      var s=document.createElement('span');s.className='ch';s.setAttribute('aria-hidden','true');
      s.style.setProperty('--i',i+(li?6:0));s.style.setProperty('--d',i%2?1:-1);s.textContent=c;line.appendChild(s);
    });
  });
  var started=false;
  function go(){if(started)return;started=true;nm.classList.add('go');setTimeout(function(){nm.classList.add('done')},2600);}
  new MutationObserver(function(){if($('#loader').classList.contains('done'))go();}).observe($('#loader'),{attributes:true});
  setTimeout(go,4200);
})();

/* roles rotate */
(function(){
  var li=document.querySelectorAll('#roles li'),i=0;
  setInterval(function(){li[i].classList.remove('on');i=(i+1)%li.length;li[i].classList.add('on');},1800);
})();

/* skills */
var DATA={
  'Full Stack':{a:'Frontend',b:'Backend & Tools',
    A:[['HTML','HT','Page structure and accessibility'],['CSS','CS','Responsive layouts and animation'],['JavaScript','JS','Interactive, modern web apps'],['React','Re','Component-based interfaces'],['Next.js','Nx','Fast, SEO-friendly apps']],
    B:[['Node.js','No','Server-side JavaScript'],['Express','Ex','Clean REST API structure'],['MongoDB','Mo','Flexible document databases'],['REST APIs','AP','Connecting apps and services'],['Git','Gt','Version control and teamwork']]},
  'AI Agents':{a:'Building',b:'Tools',
    A:[['LLM APIs','AI','Connecting language models to apps'],['Prompt Design','Pr','Reliable, clear instructions'],['AI Agents','Ag','Agents that plan and take action'],['RAG','RG','Answers from your own documents'],['Chatbots','Cb','Support and sales assistants']],
    B:[['Python','Py','Scripts, APIs and data work'],['LangChain','LC','Agent and tool frameworks'],['n8n / Zapier','Au','No-code workflow automation'],['Tool Calling','Tc','Agents that use real tools'],['Vector DBs','Vd','Search by meaning']]},
  'Marketing':{a:'Channels',b:'Craft',
    A:[['SEO','SE','Ranking on search results'],['Social Media','SM','Content and community growth'],['Meta Ads','Mt','Facebook and Instagram campaigns'],['Google Ads','Ga','Search and display campaigns'],['Email Marketing','Em','Newsletters and sequences']],
    B:[['Content Strategy','Cn','Plans that fit your audience'],['Copywriting','Cp','Words that convert'],['Analytics','An','Reading the numbers'],['Branding','Br','A consistent look and voice'],['Lead Generation','Lg','Turning visitors into leads']]}
};
var cats=Object.keys(DATA),cur=cats[0];
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function setCore(n,lvl,d){
  $('#core').innerHTML='<strong>'+esc(n)+'</strong><small>'+esc(lvl)+'</small>'+(d?'<p>'+esc(d)+'</p>':'');
}
function reset(){$('#core').innerHTML='<strong>Skills</strong><small>Hover a skill</small>';document.querySelectorAll('.on').forEach(function(e){if(e.matches('.sk,.node button'))e.classList.remove('on')});}
function render(){
  var d=DATA[cur];
  $('#h1').textContent=d.a;$('#h2').textContent=d.b;
  var mk=function(arr){return arr.map(function(s,i){return '<button class="sk" data-n="'+esc(s[0])+'"><code>'+esc(s[1])+'</code>'+esc(s[0])+'</button>'}).join('')};
  $('#s1').innerHTML=mk(d.A);$('#s2').innerHTML=mk(d.B);
  var all=d.A.concat(d.B),R=document.getElementById('orbit').clientWidth*0.43||150;
  $('#spin').innerHTML=all.map(function(s,i){
    return '<div class="node" style="--a:'+(i*36)+'deg;--R:'+R+'px"><button data-n="'+esc(s[0])+'">'+esc(s[1])+'</button></div>';
  }).join('');
  reset();
}
function hook(e){
  var b=e.target.closest('[data-n]');if(!b)return;
  var n=b.getAttribute('data-n'),all=DATA[cur].A.concat(DATA[cur].B);
  var s=all.filter(function(x){return x[0]===n})[0];if(!s)return;
  document.querySelectorAll('[data-n]').forEach(function(x){x.classList.toggle('on',x.getAttribute('data-n')===n)});
  setCore(s[0],cur,s[2]);
}
['mouseover','focusin','click'].forEach(function(ev){document.querySelector('.skills').addEventListener(ev,hook)});
document.querySelector('.skills').addEventListener('mouseleave',reset);
$('#tabs').innerHTML=cats.map(function(c,i){return '<button class="tab" role="tab" aria-selected="'+(i===0)+'" data-c="'+c+'">'+c+'</button>'}).join('');
$('#tabs').addEventListener('click',function(e){
  var b=e.target.closest('.tab');if(!b)return;cur=b.dataset.c;
  document.querySelectorAll('.tab').forEach(function(t){t.setAttribute('aria-selected',t===b)});render();
});
render();
window.addEventListener('resize',render);

/* reveal */
(function(){
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
  setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},6000);
})();

/* nav active, back to top, spotlight */
var secs=['about','skills','projects','contact'].map(function(i){return document.getElementById(i)});
var links=document.querySelectorAll('nav a.l');
addEventListener('scroll',function(){
  var y=scrollY+window.innerHeight*.4,c=-1;
  secs.forEach(function(s,i){if(s.offsetTop<=y)c=i});
  links.forEach(function(l,i){l.classList.toggle('on',i===c)});
  $('#top').classList.toggle('show',scrollY>600);
},{passive:true});
$('#top').onclick=function(){scrollTo({top:0,behavior:'smooth'})};
addEventListener('pointermove',function(e){var s=$('#spot').style;s.setProperty('--mx',e.clientX+'px');s.setProperty('--my',e.clientY+'px')});

/* toast + copy */
var tt;function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('show')},2000)}
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-copy]');if(!b)return;
  var v=b.getAttribute('data-copy');
  var fallback=function(){var r=document.createRange(),el=b.closest('.cc').querySelector('strong');r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);toast('Selected. Press copy.')};
  try{navigator.clipboard.writeText(v).then(function(){toast('Copied')},fallback)}catch(x){fallback()}
});
$('#form').addEventListener('submit',function(e){
  e.preventDefault();
  var n=$('#fn').value.trim(),m=$('#fm').value.trim();
  if(!m){toast('Please write a message first');return;}
  var txt='Hi Muqaddas, I am '+(n||'a visitor')+'. '+m;
  window.open('https://wa.me/923709008913?text='+encodeURIComponent(txt),'_blank');
  toast('Opening WhatsApp');
});

/* background: drifting white particles + soft connecting lines */
(function(){
  var c=$('#bg'),x=c.getContext('2d'),W,H,P=[],reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function size(){var d=Math.min(devicePixelRatio||1,2);W=c.width=innerWidth*d;H=c.height=innerHeight*d;x.setTransform(d,0,0,d,0,0);W/=d;H/=d;
    P=[];var n=Math.round(innerWidth*innerHeight/18000);for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.3+.3});}
  size();addEventListener('resize',size);
  function draw(){
    x.clearRect(0,0,W,H);
    for(var i=0;i<P.length;i++){var p=P[i];p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();
      for(var j=i+1;j<P.length;j++){var q=P[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;
        if(d<9000){x.strokeStyle='rgba(255,255,255,'+(.12*(1-d/9000))+')';x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke();}}
    }
    if(!reduce)requestAnimationFrame(draw);
  }
  draw();
})();
