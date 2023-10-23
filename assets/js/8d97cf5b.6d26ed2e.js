"use strict";(self.webpackChunkreact_rxjs_org=self.webpackChunkreact_rxjs_org||[]).push([[761],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return d}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=l(r),f=a,d=u["".concat(c,".").concat(f)]||u[f]||m[f]||o;return r?n.createElement(d,s(s({ref:t},p),{},{components:r})):n.createElement(d,s({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,s=new Array(o);s[0]=f;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:a,s[1]=i;for(var l=2;l<o;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},2186:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return d},frontMatter:function(){return i},metadata:function(){return l},toc:function(){return u}});var n=r(3117),a=r(102),o=(r(7294),r(3905)),s=["components"],i={title:"SUSPENSE"},c=void 0,l={unversionedId:"api/core/suspense",id:"api/core/suspense",title:"SUSPENSE",description:"SUSPENSE is a special symbol that can be emitted from observables to let the React hook",source:"@site/docs/api/core/suspense.md",sourceDirName:"api/core",slug:"/api/core/suspense",permalink:"/docs/api/core/suspense",draft:!1,editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/api/core/suspense.md",tags:[],version:"current",frontMatter:{title:"SUSPENSE"},sidebar:"someSidebar",previous:{title:"shareLatest()",permalink:"/docs/api/core/shareLatest"},next:{title:"<Subscribe />",permalink:"/docs/api/core/subscribe"}},p={},u=[{value:"Example",id:"example",level:3},{value:"See also",id:"see-also",level:2}],m={toc:u},f="wrapper";function d(e){var t=e.components,r=(0,a.Z)(e,s);return(0,o.kt)(f,(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"SUSPENSE")," is a special symbol that can be emitted from observables to let the React hook\nknow that there is a value on its way, and that we want to leverage React Suspense\nwhile we are waiting for that value."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"const SUSPENSE: unique symbol\n")),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { concat, of } from "rxjs"\nimport { switchMap } from "rxjs/operators"\nimport { SUSPENSE } from "@react-rxjs/core"\n\nconst story$ = selectedStoryId$.pipe(\n  switchMap((id) => concat(of(SUSPENSE), getStory$(id))),\n)\n')),(0,o.kt)("h2",{id:"see-also"},"See also"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"../utils/suspend"},(0,o.kt)("inlineCode",{parentName:"a"},"suspend()"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"../utils/suspended"},(0,o.kt)("inlineCode",{parentName:"a"},"suspended()"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://reactjs.org/docs/concurrent-mode-suspense.html"},(0,o.kt)("inlineCode",{parentName:"a"},"<Suspense />"))," (React)")))}d.isMDXComponent=!0}}]);