"use strict";(()=>{var w=t=>({name:"floor",p:{type:"point",x:0,y:0},b:{width:t,height:1},color:"black"});var v=t=>({name:"leftWall",p:{type:"point",x:0,y:0},b:{width:1,height:t},color:"black"});var{round:u}=Math,C=(t,a)=>{let r={left:!1,right:!1,space:!1},o={type:"point",x:u(t/2),y:u(a/2)};return{name:"rat",acc:{type:"vector",x:1,y:0},b:{width:10,height:10},color:"white",control:r,p:o,p0:o,vel:{type:"vector",x:0,y:0}}};var g=(t,a)=>({name:"rightWall",p:{type:"point",x:t-1,y:0},b:{width:1,height:a},color:"black"});var S=()=>{let t=[];return{add:n=>{t.push(n)},left:n=>{for(let s of t)s.control.left=n},right:n=>{for(let s of t)s.control.right=n},space:n=>{for(let s of t)s.control.space=n}}};var A=({ctx:t,canvasWidth:a,canvasHeight:r})=>{let o=[],e=p=>{o.push(p)},n=(p,x)=>{let i=Math.round(p/1e3),G=Math.round(x/i),b=2;t.font="10px monospace",t.fillText(`Seconds ${i}`,b,10),t.fillText(`FPS     ${G}`,b,20)};return{add:e,draw:(p,x)=>{t.clearRect(0,0,a,r),n(p,x),t.save(),t.translate(0,r),t.scale(1,-1);for(let i of o)t.fillStyle=i.color,t.fillRect(i.p.x,i.p.y,i.b.width,i.b.height);t.restore()}}};var R=t=>{let a=[];return{add:e=>{a.push(e)},test:()=>{for(let e of a)t.p0.y>e.p.y&&t.p.y<=e.p.y&&e.p.x<=t.p0.x+t.b.width&&t.p0.x<=e.p.x+e.b.width&&(t.vel.y=0,t.p.y=e.p.y+e.b.height+1),t.p0.x>e.p.x&&t.p.x<=e.p.x&&e.p.y<=t.p0.y&&t.p0.y<=e.p.y+e.b.height&&(t.vel.x=0,t.p.x=e.p.x+1),t.p0.x+t.b.width<e.p.x&&t.p.x+t.b.width>=e.p.x&&e.p.y<=t.p0.y&&t.p0.y<=e.p.y+e.b.height&&(t.vel.x=0,t.p.x=e.p.x-t.b.width-1)}}};var j=1,W=.5,P=()=>{let t=[];return{add:o=>{t.push(o)},move:()=>{for(let o of t)o.vel.y===0&&(o.control.right&&(o.vel.x<1?o.vel.x+=o.acc.x*1.5:o.vel.x+=o.acc.x),o.control.left&&(o.vel.x>1?o.vel.x-=o.acc.x*1.5:o.vel.x-=o.acc.x),o.vel.x>0&&!o.control.right&&(o.vel.x-=W),o.vel.x<0&&!o.control.left&&(o.vel.x+=W)),o.p0=Object.assign({},o.p),o.p.x+=o.vel.x,o.control.space&&o.vel.y===0&&(o.vel.y=12,o.control.space=!1),o.vel.y-=j,o.p.y+=o.vel.y}}};var M=()=>({name:"table",p:{type:"point",x:50,y:50},b:{width:50,height:1},color:"black"});var B=()=>({name:"table",p:{type:"point",x:100,y:100},b:{width:50,height:1},color:"black"});var y=document.querySelector("canvas");if(y===null)throw new Error("canvas is null");var k=y.getContext("2d");if(k===null)throw new Error("ctx is null");var m=y.width,D=y.height,f=C(m,D),F=w(m),L=v(m),H=g(m,D),I=M(),V=B(),E={name:"table3",p:{type:"point",x:200,y:50},b:{width:50,height:1},color:"black"},d=S(),q=P(),l=R(f);l.add(F);l.add(L);l.add(H);l.add(I);l.add(V);l.add(E);var O={ctx:k,canvasWidth:m,canvasHeight:D},c=A(O);d.add(f);q.add(f);c.add(f);c.add(F);c.add(L);c.add(H);c.add(I);c.add(V);c.add(E);var T=0,h=!0,K=()=>{T++;let t=performance.now();q.move(),l.test(),c.draw(t,T),h&&requestAnimationFrame(()=>K())};requestAnimationFrame(()=>K());var U=["ArrowLeft","ArrowRight","Space","KeyP"],Y=t=>U.includes(t),$=t=>a=>{let r=a.code;if(Y(r)){if(r==="KeyP"){h=!h;return}if(r==="ArrowRight"){d.right(t);return}if(r==="ArrowLeft"){d.left(t);return}if(r==="Space"){d.space(t);return}throw new Error(`unknown control code ${r}`)}},z=$(!0);document.onkeydown=t=>z(t);var J=$(!1);document.onkeyup=t=>J(t);})();
