function n(n,e){const t=n.length;for(let o=0;o<t;o++){const t=e(n[o],o,n);if(!0!==t&&!1===t)break}}function e(n,e,t){return n+(e-n)*t}function t(n,e){Object.keys(e).forEach((t=>{n.style[t]=e[t]}))}function o({smoothForce:o=.8,smoothLimit:l=.2,scrollEl:c=null,className:i="afScroll",wrapExclude:r="script, link",autoHeight:u=12,onUpdate:s=(()=>{}),onComplete:a=(()=>{})}={}){const d=1-o,f=l,m=c,h=i,p=r,w=u,b=s,v=a;let E=0,k=0,g=null,y=null,A=null,F=null;const T=document.getElementsByTagName("body")[0];let L=null,q=0,x=null;function B(n,e=!1){e&&(g=n),document.body.scrollTop=document.documentElement.scrollTop=n}function C(){g=null}function z(n){k=n,L.scrollTop=n,b(n)}function H(){if(null===y){if(Math.abs(E-k)<f)return z(E),C(),void v(E);z(e(k,E,d)),A=requestAnimationFrame(H)}}function N(){null!==y?B(y):null!==g&&B(g),E=window.scrollY,cancelAnimationFrame(A),A=requestAnimationFrame(H)}function S(){++q>=w&&(q=0,Y()),F=requestAnimationFrame(S)}function Y(){const n=L.scrollHeight;n!==x&&(x=n,t(T,{height:`${n}px`}))}function j(){Y(),Y()}function M(){null===L&&(E=window.scrollY,function(){if(L=null!==m?m:document.createElement("div"),t(L,{position:"fixed",top:0,left:0,width:"100%",height:"100%",overflow:"hidden"}),null!==m)return;L.setAttribute("class",h);const e=[];n(T.children,(n=>{if(n===L||n.matches(p))return!0;e.push(n)})),n(e,(n=>{L.appendChild(n)})),T.insertBefore(L,T.children[0])}(),j(),B(E),z(E),window.addEventListener("scroll",N),window.addEventListener("resize",j),0!==w&&!1!==w&&(F=requestAnimationFrame(S)))}return M(),{init:M,scrollTo:B,free:C,lock:function(){y=k},unlock:function(){y=null},destroy:function(){null!==L&&(cancelAnimationFrame(A),cancelAnimationFrame(F),window.removeEventListener("scroll",N),window.removeEventListener("resize",j),function(){if(t(T,{height:""}),q=0,x=null,null!==m)return t(L,{position:"",top:"",left:"",width:"",height:"",overflow:""}),void(L=null);const e=[];n(L.children,(n=>{e.push(n)})),n(e,(n=>{T.insertBefore(n,L)})),T.removeChild(L),L=null}(),g=null,y=null)}}}!function(){const n=o();[{selector:"[data-scroll-top]",cb:()=>{n.scrollTo(0)}},{selector:"[data-scroll-top-force]",cb:()=>{n.scrollTo(0,!0)}},{selector:"[data-destroy]",cb:()=>{n.destroy()}},{selector:"[data-reinit]",cb:()=>{n.init()}},{selector:"[data-lock]",cb:()=>{n.lock()}},{selector:"[data-unlock]",cb:()=>{n.unlock()}}].map((({selector:n,cb:e})=>{document.querySelector(n).addEventListener("click",e)}))}();
//# sourceMappingURL=default.016a8e42.js.map
