function n(n,e){const t=n.length;for(let o=0;o<t;o++){const t=e(n[o],o,n);if(!0!==t&&!1===t)break}}function e(n,e,t){return n+(e-n)*t}function t(n,e){Object.keys(e).forEach((t=>{n.style[t]=e[t]}))}function o({smoothForce:o=.8,smoothLimit:l=.2,scrollEl:c=null,className:i="afScroll",wrapExclude:r="script, link",autoHeight:u=12,onUpdate:s=(()=>{}),onComplete:a=(()=>{})}={}){const d=1-o,m=l,f=c,h=i,p=r,w=u,v=s,b=a;let g=0,E=0,k=null,y=null,A=null;const F=document.getElementsByTagName("body")[0];let L=null,T=0,q=null;function C(n){document.body.scrollTop=document.documentElement.scrollTop=n}function x(n){E=n,L.scrollTop=n,v(n)}function B(){if(null===k){if(Math.abs(g-E)<m)return x(g),void b(g);x(e(E,g,d)),y=requestAnimationFrame(B)}}function z(){null!==k&&C(k),g=window.scrollY,cancelAnimationFrame(y),y=requestAnimationFrame(B)}function H(){++T>=w&&(T=0,N()),A=requestAnimationFrame(H)}function N(){const n=L.scrollHeight;n!==q&&(q=n,t(F,{height:`${n}px`}))}function S(){N(),N()}function U(){null===L&&(g=window.scrollY,function(){if(L=null!==f?f:document.createElement("div"),t(L,{position:"fixed",top:0,left:0,width:"100%",height:"100%",overflow:"hidden"}),null!==f)return;L.setAttribute("class",h);const e=[];n(F.children,(n=>{if(n===L||n.matches(p))return!0;e.push(n)})),n(e,(n=>{L.appendChild(n)})),F.insertBefore(L,F.children[0])}(),S(),C(g),x(g),window.addEventListener("scroll",z),window.addEventListener("resize",S),0!==w&&!1!==w&&(A=requestAnimationFrame(H)))}return U(),{init:U,scrollTo:C,lock:function(){k=E},unlock:function(){k=null},destroy:function(){null!==L&&(cancelAnimationFrame(y),cancelAnimationFrame(A),window.removeEventListener("scroll",z),window.removeEventListener("resize",S),function(){if(t(F,{height:""}),T=0,q=null,null!==f)return t(L,{position:"",top:"",left:"",width:"",height:"",overflow:""}),void(L=null);const e=[];n(L.children,(n=>{e.push(n)})),n(e,(n=>{F.insertBefore(n,L)})),F.removeChild(L),L=null}(),k=null)}}}!function(){const n=o({onUpdate:n=>{console.log("update",n)},onComplete:n=>{console.log("complete",n)}});[{selector:"[data-scroll-top]",cb:()=>{n.scrollTo(0)}},{selector:"[data-destroy]",cb:()=>{n.destroy()}},{selector:"[data-reinit]",cb:()=>{n.init()}},{selector:"[data-lock]",cb:()=>{n.lock()}},{selector:"[data-unlock]",cb:()=>{n.unlock()}}].map((({selector:n,cb:e})=>{document.querySelector(n).addEventListener("click",e)}))}();
//# sourceMappingURL=events.fcc54897.js.map
