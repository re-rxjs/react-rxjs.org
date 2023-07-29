"use strict";(self.webpackChunkreact_rxjs_org=self.webpackChunkreact_rxjs_org||[]).push([[121],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},l="mdxType",b={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),l=u(r),m=o,f=l["".concat(s,".").concat(m)]||l[m]||b[m]||a;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[l]="string"==typeof e?e:o,i[1]=c;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3648:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return c},metadata:function(){return u},toc:function(){return l}});var n=r(3117),o=r(102),a=(r(7294),r(3905)),i=["components"],c={id:"removeSubscribe",title:"<RemoveSubscribe />"},s=void 0,u={unversionedId:"api/core/removeSubscribe",id:"api/core/removeSubscribe",title:"<RemoveSubscribe />",description:"A React Component that prevents its children from using a parent ``.",source:"@site/docs/api/core/removeSubscribe.md",sourceDirName:"api/core",slug:"/api/core/removeSubscribe",permalink:"/docs/api/core/removeSubscribe",draft:!1,editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/api/core/removeSubscribe.md",tags:[],version:"current",frontMatter:{id:"removeSubscribe",title:"<RemoveSubscribe />"},sidebar:"someSidebar",previous:{title:"<Subscribe />",permalink:"/docs/api/core/subscribe"},next:{title:"StateObservable",permalink:"/docs/api/core/StateObservable"}},p={},l=[{value:"Example",id:"example",level:3},{value:"See also",id:"see-also",level:2}],b={toc:l},m="wrapper";function f(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)(m,(0,n.Z)({},b,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"A React Component that prevents its children from using a parent ",(0,a.kt)("a",{parentName:"p",href:"./Subscribe"},(0,a.kt)("inlineCode",{parentName:"a"},"<Subscribe>")),"."),(0,a.kt)("p",null,"This is useful when you need a Root component to have a ",(0,a.kt)("inlineCode",{parentName:"p"},"<Subscribe>"),", but you\ndon't want some of its children to leak subscriptions on it."),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"const user$ = state(/* ... */)\n\nfunction App() {\n  const user = useStateObservable(user$)\n\n  return (\n    <Content>\n      <Header>Application Example</Header>\n      <RemoveSubscribe>\n        {/* none of the routes will be able to use the top-level <Subscribe> */}\n        <AppRoutes />\n      </RemoveSubscribe>\n    </Content>\n  )\n}\n\ncreateRoot(rootElement).render(\n  <Subscribe>\n    <App />\n  </Subscribe>,\n)\n")),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"This component only prevents its children from leaking subscriptions to\na parent ",(0,a.kt)("inlineCode",{parentName:"p"},"<Subscribe />"),". If that ",(0,a.kt)("inlineCode",{parentName:"p"},"Subscribe")," had a fallback, it will not\nprevent the from using the Suspense boundary.")),(0,a.kt)("h2",{id:"see-also"},"See also"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"./Subscribe"},(0,a.kt)("inlineCode",{parentName:"a"},"<Subscribe />")))))}f.isMDXComponent=!0}}]);