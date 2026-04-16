import{A as e,N as t,a as n,d as r,i,j as a,s as o,t as s,u as c}from"./jsx-runtime-CAtC83zY.js";import{i as l,n as u,r as d,t as f}from"./theme-C7uT9Cig.js";var p=t(a(),1),m=s(),h=`
(function() {
  try {
    var theme = localStorage.getItem('chroma-theme');
    if (!theme || theme === 'auto') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.remove('${l}', '${d}');
    document.documentElement.classList.add(theme === 'dark' ? '${d}' : '${l}');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('${d}');
  }
})();
`;function g({children:e}){let[t,a]=(0,p.useState)(()=>typeof document>`u`?d:document.documentElement.classList.contains(`_1hrksiz1`)?l:d);return(0,p.useEffect)(()=>{let e=()=>{let e=u();f(e),a(e===`light`?l:d)};e();let t=t=>{t.key===`chroma-theme`&&e()};return window.addEventListener(`storage`,t),()=>window.removeEventListener(`storage`,t)},[]),(0,m.jsxs)(`html`,{lang:`zh-CN`,className:t,children:[(0,m.jsxs)(`head`,{children:[(0,m.jsx)(`meta`,{charSet:`utf-8`}),(0,m.jsx)(`meta`,{name:`viewport`,content:`width=device-width, initial-scale=1`}),(0,m.jsx)(`link`,{rel:`preconnect`,href:`https://fonts.googleapis.com`}),(0,m.jsx)(`link`,{rel:`preconnect`,href:`https://fonts.gstatic.com`,crossOrigin:`anonymous`}),(0,m.jsx)(`link`,{href:`https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap`,rel:`stylesheet`}),(0,m.jsx)(n,{}),(0,m.jsx)(i,{}),(0,m.jsx)(`script`,{dangerouslySetInnerHTML:{__html:h}})]}),(0,m.jsxs)(`body`,{children:[e,(0,m.jsx)(r,{}),(0,m.jsx)(c,{})]})]})}var _=e(function(){return(0,m.jsx)(o,{})});export{g as Layout,_ as default};