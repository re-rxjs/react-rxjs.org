"use strict";(self.webpackChunkreact_rxjs_org=self.webpackChunkreact_rxjs_org||[]).push([[688],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return f}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=l(r),m=a,f=c["".concat(s,".").concat(m)]||c[m]||d[m]||i;return r?n.createElement(f,p(p({ref:t},u),{},{components:r})):n.createElement(f,p({ref:t},u))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,p=new Array(i);p[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[c]="string"==typeof e?e:a,p[1]=o;for(var l=2;l<i;l++)p[l]=r[l];return n.createElement.apply(null,p)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},4759:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return o},metadata:function(){return l},toc:function(){return c}});var n=r(3117),a=r(102),i=(r(7294),r(3905)),p=["components"],o={title:"switchMapSuspended()"},s=void 0,l={unversionedId:"api/utils/switchMapSuspended",id:"api/utils/switchMapSuspended",title:"switchMapSuspended()",description:"Like switchMap], but applying a [startWith(SUSPENSE) to the inner Observable.",source:"@site/docs/api/utils/switchMapSuspended.md",sourceDirName:"api/utils",slug:"/api/utils/switchMapSuspended",permalink:"/docs/api/utils/switchMapSuspended",draft:!1,editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/api/utils/switchMapSuspended.md",tags:[],version:"current",frontMatter:{title:"switchMapSuspended()"},sidebar:"someSidebar",previous:{title:"suspended()",permalink:"/docs/api/utils/suspended"},next:{title:"toKeySet()",permalink:"/docs/api/utils/toKeySet"}},u={},c=[{value:"Arguments",id:"arguments",level:4},{value:"Returns",id:"returns",level:4},{value:"Example",id:"example",level:3},{value:"See also",id:"see-also",level:2}],d={toc:c},m="wrapper";function f(e){var t=e.components,r=(0,a.Z)(e,p);return(0,i.kt)(m,(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Like ",(0,i.kt)("a",{parentName:"p",href:"https://rxjs.dev/api/operators/switchMap"},(0,i.kt)("inlineCode",{parentName:"a"},"switchMap")),", but applying a ",(0,i.kt)("a",{parentName:"p",href:"https://rxjs.dev/api/operators/startWith"},(0,i.kt)("inlineCode",{parentName:"a"},"startWith(SUSPENSE)"))," to the inner Observable."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"function switchMapSuspended<T, O extends ObservableInput<any>>(project: (value: T, index: number) => O): \n    OperatorFunction<T, ObservedValueOf<O> | typeof SUSPENSE>;\n")),(0,i.kt)("h4",{id:"arguments"},"Arguments"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"project"),": A function that, when applied to an item emitted by the source Observable, returns an Observable.")),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://rxjs.dev/api/index/interface/OperatorFunction"},(0,i.kt)("inlineCode",{parentName:"a"},"OperatorFunction<T, ObservedValueOf<O> | typeof SUSPENSE>")),": An Observable that emits the result\nof applying the projection function to each item emitted by the source Observable, and taking only the values from\nthe most recently projected inner Observable, prepended with ",(0,i.kt)("a",{parentName:"p",href:"../core/suspense"},(0,i.kt)("inlineCode",{parentName:"a"},"SUSPENSE")),"."),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"import { switchMapSuspended } from '@react-rxjs/utils'\n\nconst story$ = selectedStoryId$.pipe(switchMapSuspended(getStory$))\n")),(0,i.kt)("h2",{id:"see-also"},"See also"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../core/suspense"},(0,i.kt)("inlineCode",{parentName:"a"},"SUSPENSE"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://rxjs.dev/api/operators/switchMap"},(0,i.kt)("inlineCode",{parentName:"a"},"switchMap")),", ",(0,i.kt)("a",{parentName:"li",href:"https://rxjs.dev/api/operators/startWith"},(0,i.kt)("inlineCode",{parentName:"a"},"startWith"))," (RxJS)")))}f.isMDXComponent=!0}}]);