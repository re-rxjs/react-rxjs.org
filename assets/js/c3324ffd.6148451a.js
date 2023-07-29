"use strict";(self.webpackChunkreact_rxjs_org=self.webpackChunkreact_rxjs_org||[]).push([[870],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),p=c(n),f=i,m=p["".concat(l,".").concat(f)]||p[f]||d[f]||o;return n?r.createElement(m,a(a({ref:t},s),{},{components:n})):r.createElement(m,a({ref:t},s))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=f;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u[p]="string"==typeof e?e:i,a[1]=u;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},3671:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return u},metadata:function(){return c},toc:function(){return p}});var r=n(3117),i=n(102),o=(n(7294),n(3905)),a=["components"],u={title:"contextBinder()",sidebar_label:"contextBinder()"},l=void 0,c={unversionedId:"api/utils/contextBinder",id:"api/utils/contextBinder",title:"contextBinder()",description:"Returns a version of bind where its hook will have the first parameters bound",source:"@site/docs/api/utils/contextBinder.md",sourceDirName:"api/utils",slug:"/api/utils/contextBinder",permalink:"/docs/api/utils/contextBinder",draft:!1,editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/api/utils/contextBinder.md",tags:[],version:"current",frontMatter:{title:"contextBinder()",sidebar_label:"contextBinder()"},sidebar:"someSidebar",previous:{title:"combineKeys()",permalink:"/docs/api/utils/combineKeys"},next:{title:"createSignal()",permalink:"/docs/api/utils/createSignal"}},s={},p=[{value:"Arguments",id:"arguments",level:4},{value:"Returns",id:"returns",level:4},{value:"Example",id:"example",level:3}],d={toc:p},f="wrapper";function m(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)(f,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Returns a version of bind where its hook will have the first parameters bound\nthe results of the provided function (which can use hooks)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"export function contextBinder<A extends unknown[], T>(\n  ...args: Array<() => any>\n): typeof bind\n")),(0,o.kt)("h4",{id:"arguments"},"Arguments"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"...args"),": A list of functions that its result will be bound to the first arguments\nwithin ",(0,o.kt)("inlineCode",{parentName:"li"},"getObservable")," of the ",(0,o.kt)("inlineCode",{parentName:"li"},"bind")," function enhanced by this function.")),(0,o.kt)("h4",{id:"returns"},"Returns"),(0,o.kt)("p",null,"An enhanced ",(0,o.kt)("inlineCode",{parentName:"p"},"bind")," function where it will have its first arguments bound to the\nreturn values of the input functions"),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"const MyContext = React.createContext<number>(0);\n\nconst myContextBind = contextBinder(\n  () => useContext(MyContext)\n);\n\nconst [useValue, value$] = myContextBind(\n  (myContextValue, prefix: string) =>\n    of(prefix + ' ' + myContextValue)\n)\n\nconst Component = () => {\n  const contextDisplay = useValue('Current context value:'))\n\n  return <div>{contextDisplay}</div>\n}\n")))}m.isMDXComponent=!0}}]);