(this["webpackJsonpreact-chess-bot"]=this["webpackJsonpreact-chess-bot"]||[]).push([[0],{20:function(e,t,n){},24:function(e,t,n){"use strict";n.r(t);var o={};n.r(o),n.d(o,"ROOK",(function(){return M})),n.d(o,"KING",(function(){return I})),n.d(o,"QUEEN",(function(){return P})),n.d(o,"BISHOP",(function(){return T})),n.d(o,"KNIGHT",(function(){return B})),n.d(o,"PAWN",(function(){return H}));var r=n(0),i=n.n(r),s=n(12),c=n.n(s),a=n(4),l=n(2),h=(n(20),n(3));class u{}u.routeIsFree=(e,t,n)=>{if("knight"===t.type)return!0;const o=n.x>t.x?1:n.x===t.x?0:-1,r=n.y>t.y?1:n.y===t.y?0:-1;let i=t.y,s=t.x;for(;i!==n.y||s!==n.x;)if(s!==n.x&&(s+=o),i!==n.y&&(i+=r),e[s][i]&&(n.x!==s||n.y!==i))return!1;return!0},u.rook=(e,t)=>e.x===t.x||e.y===t.y,u.king=(e,t)=>{let n=Math.abs(t.y-e.y);return e.x===t.x&&2===n&&0===e.moves||Math.abs(e.x-t.x)<=1&&Math.abs(e.y-t.y)<=1},u.queen=(e,t)=>e.x===t.x||e.y===t.y||Math.abs(e.x-t.x)===Math.abs(e.y-t.y),u.bishop=(e,t)=>Math.abs(e.x-t.x)===Math.abs(e.y-t.y),u.knight=(e,t)=>2===Math.abs(e.x-t.x)&&1===Math.abs(e.y-t.y)||2===Math.abs(e.y-t.y)&&1===Math.abs(e.x-t.x),u.pawn=(e,t)=>{const n="white"===e.color?e.x-t.x:t.x-e.x;if(e.y!==t.y){return 1===Math.abs(t.y-e.y)&&1===n&&t.color&&t.color!==e.color}return!(n<=0)&&((!t.color||t.color===e.color)&&(0===e.moves?n<=2:1===n))};const y="white",b="black",p="king",d="queen",x="pawn";var g={3:["","","black-knight","black-knight","black-knight","black-knight","black-knight",""],1:[],6:[],5:["","","","","white-pawn"]};var j,m=n(1);const v=h.a.div(j||(j=Object(l.a)(["\n  height: 400px;\n  overflow-y: scroll;\n  width: 500px;\n  margin: 0 auto;\n  background-color: darkgray;\n  margin-top: 8px;\n  max-width: 100%;\n\n  @media (min-width: 1441px) {\n    position: absolute;\n    right: 16px;\n    top: 20%;\n  }\n"]))),f=e=>new Date(1e3*e).toISOString().substr(11,8);var O=e=>{const t=Object(r.useState)(0),n=Object(a.a)(t,2),o=n[0],i=n[1],s=Object(r.useState)(0),c=Object(a.a)(s,2),l=c[0],h=c[1];return Object(r.useEffect)((()=>{const t=setInterval((()=>{e.lastIsBot?i((e=>e+1)):h((e=>e+1))}),1e3);return()=>clearInterval(t)}),[e.lastIsBot]),Object(m.jsxs)(v,{children:[Object(m.jsxs)("div",{style:{paddingTop:8},children:["Player time: ",f(o)]}),Object(m.jsxs)("div",{children:["Bot time: ",f(l)]}),"------------------------------------",e.children]})},w=n(10),k=n(7);const M=5,I=9999999,P=9,T=3,B=3,H=1,z=e=>e[Math.floor(Math.random()*e.length)],C=(e,t,n)=>{let o=[];for(let r=0;r<8;r++)for(let i=0;i<8;i++){const s=t[r][i];s&&s.color===n&&(o=o.concat(e.getMovesForPiece(s,t).map((e=>({target:e,element:s})))))}return o};let E=0;const S=e=>{let t=0;for(let n=0;n<8;n++)for(let r=0;r<8;r++){const i=e[n][r].type;if(i){let s=i&&o[i.toUpperCase()]||0;e[n][r].color===y?t-=s:e[n][r].color===b&&(t+=s)}}return t},A=(e,t,n)=>{n[e.x][e.y]=0,n[t.x][t.y]=e,e.x=t.x,e.y=t.y,e.moves++,e.type===x&&(e.color===y&&0===e.x&&(e.type=d),e.color===b&&7===e.x&&(e.type=d))},F=(e,t,n)=>{t=Object(k.a)({},t),n=Object(k.a)({},n);const o=(e=>{const t=[];return e.forEach(((e,n)=>{t.push([]),e.forEach(((e,o)=>{t[n][o]=e?Object(k.a)({},e):0}))})),t})(e);if(t.type===p&&2===Math.abs(t.y-n.y)&&0===t.moves){let e=null,r=0;if(t.color===y&&(r=7),t.x===r){let i=1;n.y>t.y?(e=o[r][7],i=5):(e=o[r][0],i=3),e&&A(e,{x:r,y:i},o)}}return A(t,n,o),o},L=(e,t,n,o,r,i)=>{if(E++,0===n)return{value:S(t)};const s=(e=>{const t=[];return e.forEach((e=>{e.forEach((e=>{e&&e.type===p&&t.push(e)}))})),2!==t.length&&t[0]})(t);if(s&&s.color===b)return{value:1/0};if(s&&s.color===y)return{value:-1/0};if(o){let o=-1/0;const s=C(e,t,"black");let l=z(s);var c,a=Object(w.a)(s);try{for(a.s();!(c=a.n()).done;){let s=c.value,a=s.element,h=s.target;const u=F(t,a,h),y=L(e,u,n-1,!1,r,i),b=y&&y.value?y.value:0;if(b>o&&(o=b,l={element:a,target:h,value:b}),(r=Math.max(r,b))>=i)break}}catch(u){a.e(u)}finally{a.f()}return l}{let o=1/0;const s=C(e,t,"white");let c=z(s);var l,h=Object(w.a)(s);try{for(h.s();!(l=h.n()).done;){let s=l.value,a=s.element,h=s.target;const u=F(t,a,h),y=L(e,u,n-1,!0,r,i),b=y&&y.value?y.value:0;if(b<o&&(o=b,c={element:a,target:h,value:b}),r>=(i=Math.min(i,b)))break}}catch(u){h.e(u)}finally{h.f()}return c}};var N,K,V,q,G,U,W,D,J=e=>new Promise((t=>{E=0;const n=L(e,e.board,4,!0,-1/0,1/0),o=n.element,r=n.target,i=n.value,s=document.getElementById("bot-points");s.innerHTML="Bot eval: "+i,i>0?(s.innerHTML+=" (in bot's favour)",s.style.color="red"):i<0?(s.innerHTML+=" (in your favour)",s.style.color="green"):(s.innerHTML="Bot points: 0 (tie)",s.style.color="white");document.getElementById("bot-evaluated").innerHTML=E+" moves evaluated.",t({element:o,target:r})}));const R=h.a.div(N||(N=Object(l.a)(["\n  position: relative;\n  width: 92vh;\n  height: 92vh;\n\n  @media (max-width: 900px) {\n    width: 92vw;\n    height: 92vw;\n  }\n\n  max-width: 900px;\n  max-height: 900px;\n  margin: 0 auto;\n  user-select: none;\n"]))),Q=h.a.div(K||(K=Object(l.a)(["\n  position: absolute;\n  left: ","%;\n  top: ","%;\n  height: 12.5%;\n  width: 12.5%;\n  transition: top 1s ease-in-out;\n\n  background-color: ",";\n\n  background-color: ",";\n  border: ",";\n  z-index: ",";\n"])),(e=>12.5*e.left),(e=>12.5*e.top),(e=>(e.left+e.top)%2?"#575757":"gray"),(e=>e.highlighted&&"#176717"),(e=>e.highlighted&&"1px solid #726969"),(e=>e.highlighted&&"3")),X=h.a.div(V||(V=Object(l.a)(['\n  background-image: url("','");\n  background-size: cover;\n  cursor: pointer;\n  width: 100%;\n  height: 100%;\n\n  opacity: 0.8;\n  \n'])),(e=>e.image)),Y=h.a.div(q||(q=Object(l.a)(["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: grey;\n  opacity: 0.8;\n  z-index: 3;\n"]))),Z=h.a.div(G||(G=Object(l.a)(["\n  color: white;\n  font-size: 32px;\n  height: 40px;\n  margin-top: 20%;\n"]))),$=h.a.div(U||(U=Object(l.a)(["\n  color: white;\n  font-size: 26px;\n  margin-top: 16px;\n  margin-bottom: 4px;\n"]))),_=Object(h.a)(Y)(W||(W=Object(l.a)(["\n  position: fixed;\n"]))),ee=h.a.div(D||(D=Object(l.a)(["\n  width: 100px;\n  height: 100px;\n  z-index: 5;\n  border: 1px solid darkgray;\n  margin: 16px;\n  float: left;\n"]))),te=new class{constructor(){this.board=[],this.currentTurn=y,this.winner=null,this.moveHistory=[],this.resetGame=()=>{this.board=[],this.currentTurn=y,this.winner=null,this.initializeBoard()},this.initializeBoard=()=>{(e=>{for(let t=0;t<8;t++)for(let n=0;n<8;n++)e(t,n)})(((e,t)=>{this.board[e]||this.board.push([]);const n=g[e]&&g[e][t];if(n){const o=n.startsWith(y)?y:b,r=n.substring(n.indexOf("-")+1);this.board[e].push({x:e,y:t,moves:0,color:o,type:r})}else this.board[e].push(0)}))},this.swapPieces=(e,t)=>{this.getPieceAtPosition(t).type===p&&(this.winner=e.color),this.board[e.x][e.y]=0,this.board[t.x][t.y]=e,e.x=t.x,e.y=t.y,e.type===x&&(e.color===y&&0===e.x&&(e.type=d),e.color===b&&7===e.x&&(e.type=d)),e.moves++},this.getPieceAtPosition=(e,t)=>(t||this.board)[e.x][e.y],this.isValidMove=(e,t,n)=>{if(n=n||this.board,e.x===t.x&&e.y===t.y)return!1;const o=this.getPieceAtPosition(t,n);if(o&&o.color===e.color)return!1;const r=u[e.type];if(!r)return!1;const i=r(e,o||t),s=u.routeIsFree(n,e,t);if(e.type===p&&2===Math.abs(e.y-t.y)&&0===e.moves){let o=null,r=0;if(e.color===y&&(r=7),e.x===r){let c=1;return t.y>e.y?(o=n[r][7],c=5):(o=n[r][0],c=3),o&&s&&i&&0===o.moves}return!1}return s&&i},this.doMove=(e,t)=>{if(e.color===this.currentTurn&&this.isValidMove(e,t)){if(this.moveHistory=[{piece:e,target:this.getPieceAtPosition(t)||t},...this.moveHistory],e.type===p&&2===Math.abs(e.y-t.y)&&0===e.moves){let n=null,o=0;if(e.color===y&&(o=7),e.x===o){let r=1;t.y>e.y?(n=this.board[o][7],r=5):(n=this.board[o][0],r=3),n&&this.swapPieces(n,{x:o,y:r})}}return this.swapPieces(e,t),this.currentTurn=this.currentTurn===y?b:y,!0}return console.error("NOT VALID MOVE",e,t),!1},this.promote=({x:e,y:t},n)=>{this.board[e][t].type=n},this.getMovesForPiece=(e,t)=>{const n=[];for(let o=0;o<8;o++)for(let r=0;r<8;r++){const i={x:o,y:r},s=u.routeIsFree(t||this.board,e,i);this.isValidMove(e,i,t)&&s&&n.push(i)}return n},this.initializeBoard()}};let ne=null;const oe=i.a.memo((function({x:e,y:t,piece:n,highlighted:o,onClick:r,pieceKey:i}){return Object(m.jsx)(Q,{left:t,top:e,highlighted:o,onClick:()=>r(n,e,t),children:i?Object(m.jsx)(X,{image:"pieces-images/"+i+".png"}):null},e+"-"+t)}),(function(e,t){return t.highlighted===e.highlighted&&t.piece.type===e.piece.type&&t.piece.color===e.piece.color}));function re(){const e=Object(r.useState)(null),t=Object(a.a)(e,2),n=t[0],o=t[1],i=Object(r.useState)([]),s=Object(a.a)(i,2),c=s[0],l=s[1],h=Object(r.useState)(!1),u=Object(a.a)(h,2),y=u[0],b=u[1],p=Object(r.useState)(null),d=Object(a.a)(p,2),x=d[0],g=d[1],j=Object(r.useRef)(),v=e=>{const t=te.getMovesForPiece(e);l(t)},f=(e,t)=>{g(e);const n=12.5*e.y,o=12.5*e.x;j.current.style.left=n+"%",j.current.style.top=o+"%",j.current.style.display="block";const r=12.5*t.y,i=12.5*t.x,s=(r-n)/20,c=(i-o)/20;let a=n,l=o;const h=setInterval((()=>{a+=s,l+=c,j.current.style.left=a+"%",j.current.style.top=l+"%"}),20);setTimeout((()=>{clearInterval(h),j.current.style.left=r+"%",j.current.style.top=i+"%",j.current.style.display="none",g(null)}),400)},w=()=>{setTimeout((()=>{J(te).then((({element:e,target:t})=>{f(e,t),te.doMove(e,t),l([])}))}),500)},k=(e,t,r)=>{if(n){const i="pawn"===n.type;f(ne||n,{x:t,y:r}),te.doMove(ne||n,{x:t,y:r})?(i&&0===t?b({x:t,y:r}):w(),ne=null,o(null),l([])):"white"===e.color&&(ne=e,o(e),v(e))}else"white"===e.color&&(ne=e,o(e),v(e))},M=(e,t,n)=>c.find((e=>e.x===t&&e.y===n))&&(!e.color||e.color!==te.currentTurn),I=e=>{te.promote(y,e),b(!1),w()};return Object(m.jsxs)("div",{className:"App",children:[y&&Object(m.jsxs)(_,{children:[Object(m.jsx)(Z,{children:"Pawn promotion"}),Object(m.jsx)(ee,{onClick:()=>I("queen"),children:Object(m.jsx)(X,{image:"pieces-images/white-queen.png"})}),Object(m.jsx)(ee,{onClick:()=>I("bishop"),children:Object(m.jsx)(X,{image:"pieces-images/white-bishop.png"})}),Object(m.jsx)(ee,{onClick:()=>I("rook"),children:Object(m.jsx)(X,{image:"pieces-images/white-rook.png"})}),Object(m.jsx)(ee,{onClick:()=>I("knight"),children:Object(m.jsx)(X,{image:"pieces-images/white-knight.png"})})]}),Object(m.jsxs)($,{children:["Current Turn:","white"===te.currentTurn?" White (you)":" Black (AI)"]}),Object(m.jsx)("div",{id:"bot-points"}),Object(m.jsx)("div",{id:"bot-evaluated"}),te.winner&&Object(m.jsxs)(Y,{children:[Object(m.jsxs)(Z,{children:[te.winner[0].toUpperCase()+te.winner.substring(1)," wins!"]}),Object(m.jsx)("button",{onClick:()=>{te.resetGame(),l([])},children:"Play again"})]}),Object(m.jsxs)(R,{children:[te.board.map(((e,t)=>e.map(((e,n)=>Object(m.jsx)(oe,{pieceKey:x!==e&&e.color+"-"+e.type,y:n,x:t,piece:e,highlighted:M(e,t,n),onClick:k},t+"-"+n+e.color+"-"+e.type+x))))),Object(m.jsx)("div",{ref:j,style:{position:"absolute",width:"12.5%",height:"12.5%",zIndex:9,backgroundSize:"cover",transition:"",opacity:.8,backgroundImage:x&&'url("pieces-images/'.concat(x.color,"-").concat(x.type,'.png")')}})]}),Object(m.jsx)(O,{lastIsBot:!te.moveHistory.length||"black"===te.moveHistory[0].piece.color,children:te.moveHistory.map((({piece:e,target:t},n)=>Object(m.jsxs)("div",{children:[te.moveHistory.length-n+": ",e.color+" ",e.type," x: "+e.x," y: "+e.y,t.type?" takes "+t.color+" "+t.type:" to "," x: "+t.x," y: "+t.y]},n)))})]})}const ie=document.getElementById("root");c.a.render(Object(m.jsx)(r.StrictMode,{children:Object(m.jsx)(re,{})}),ie)}},[[24,1,2]]]);
//# sourceMappingURL=main.c57ed9a4.chunk.js.map