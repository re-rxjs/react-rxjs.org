(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{164:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return u}));var r=n(2),o=n(9),a=(n(0),n(182)),c={id:"collect-values",title:"collectValues()",sidebar_label:"collectValues()"},l={id:"api/utils/collect-values",isDocsHomePage:!1,title:"collectValues()",description:"A pipeable operator that collects all the GroupedObservables emitted by",source:"@site/docs/api/utils/collectValues.md",permalink:"/react-rxjs.org/docs/api/utils/collect-values",editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/api/utils/collectValues.md",sidebar_label:"collectValues()",sidebar:"someSidebar",previous:{title:"collect()",permalink:"/react-rxjs.org/docs/api/utils/collect"},next:{title:"mergeWithKey()",permalink:"/react-rxjs.org/docs/api/utils/merge-with-key"}},s=[{value:"Example",id:"example",children:[]}],i={rightToc:s};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"A pipeable operator that collects all the GroupedObservables emitted by\nthe source and emits a Map with the latest values of the inner observables."),Object(a.b)("h3",{id:"example"},"Example"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),'const votesByKey$ = new Subject<{ key: string }>()\nconst counters$ = votesByKey$.pipe(\n  split(\n    (vote) => vote.key,\n    (votes$) =>\n      votes$.pipe(\n        mapTo(1),\n        scan((count) => count + 1),\n        takeWhile((count) => count < 3),\n      ),\n  ),\n  collectValues(),\n)\n\ncounters$.subscribe((counters) => {\n  console.log("counters$:")\n  counters.forEach((value, key) => {\n    console.log(`${key}: ${value}`)\n  })\n})\n\nvotesByKey$.next({ key: "foo" })\n// > counters$:\n// > foo: 1\n\nvotesByKey$.next({ key: "foo" })\n// > counters$:\n// > foo: 2\n\nvotesByKey$.next({ key: "bar" })\n// > counters$:\n// > foo: 2\n// > bar: 1\n\nvotesByKey$.next({ key: "foo" })\n// > counters$:\n// > bar: 1\n\nvotesByKey$.next({ key: "bar" })\n// > counters$:\n// > bar: 2\n//\nvotesByKey$.next({ key: "bar" })\n// > counters$:\n')))}u.isMDXComponent=!0},182:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=o.a.createContext({}),u=function(e){var t=o.a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(i.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},y=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),p=u(n),y=r,f=p["".concat(c,".").concat(y)]||p[y]||b[y]||a;return n?o.a.createElement(f,l(l({ref:t},i),{},{components:n})):o.a.createElement(f,l({ref:t},i))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,c=new Array(a);c[0]=y;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,c[1]=l;for(var i=2;i<a;i++)c[i]=n[i];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,n)}y.displayName="MDXCreateElement"}}]);