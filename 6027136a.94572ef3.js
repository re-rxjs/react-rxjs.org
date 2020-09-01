(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{153:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return i})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return u}));var n=r(2),a=r(9),c=(r(0),r(182)),o={id:"merge-with-key",title:"mergeWithKey()",sidebar_label:"mergeWithKey()"},i={id:"api/utils/merge-with-key",isDocsHomePage:!1,title:"mergeWithKey()",description:"Emits the values from all the streams of the provided object, in a result",source:"@site/docs/api/utils/mergeWithKey.md",permalink:"/react-rxjs.org/docs/api/utils/merge-with-key",editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/api/utils/mergeWithKey.md",sidebar_label:"mergeWithKey()",sidebar:"someSidebar",previous:{title:"collectValues()",permalink:"/react-rxjs.org/docs/api/utils/collect-values"},next:{title:"selfDepandant()",permalink:"/react-rxjs.org/docs/api/utils/self-dependant"}},l=[{value:"Arguments",id:"arguments",children:[]},{value:"Example",id:"example",children:[]}],s={rightToc:l};function u(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"Emits the values from all the streams of the provided object, in a result\nwhich provides the key of the stream of that emission."),Object(c.b)("h3",{id:"arguments"},"Arguments"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("inlineCode",{parentName:"li"},"inputObject"),": Object of streams")),Object(c.b)("h3",{id:"example"},"Example"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),'const inc$ = new Subject()\nconst dec$ = new Subject()\nconst resetTo$ = new Subject<number>()\n\nconst counter$ = mergeWithKey({\n  inc$,\n  dec$,\n  resetTo$,\n}).pipe(\n  scan((acc, current) => {\n    switch (current.type) {\n      case "inc$":\n        return acc + 1\n      case "dec$":\n        return acc - 1\n      case "resetTo$":\n        return current.payload\n      default:\n        return acc\n    }\n  }, 0),\n  startWith(0),\n)\n')))}u.isMDXComponent=!0},182:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return d}));var n=r(0),a=r.n(n);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=a.a.createContext({}),u=function(e){var t=a.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,c=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(r),b=n,d=p["".concat(o,".").concat(b)]||p[b]||m[b]||c;return r?a.a.createElement(d,i(i({ref:t},s),{},{components:r})):a.a.createElement(d,i({ref:t},s))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=r.length,o=new Array(c);o[0]=b;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,o[1]=i;for(var s=2;s<c;s++)o[s]=r[s];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"}}]);