(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{52:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return a})),r.d(t,"metadata",(function(){return i})),r.d(t,"rightToc",(function(){return s})),r.d(t,"default",(function(){return p}));var n=r(2),o=r(6),c=(r(0),r(83)),a={title:"<Subscribe />"},i={unversionedId:"api/core/subscribe",id:"api/core/subscribe",isDocsHomePage:!1,title:"<Subscribe />",description:"A React Component that creates a subscription to the provided observable once",source:"@site/docs/api/core/subscribe.md",slug:"/api/core/subscribe",permalink:"/react-rxjs.org/docs/api/core/subscribe",editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/api/core/subscribe.md",version:"current",sidebar:"someSidebar",previous:{title:"useSubscribe()",permalink:"/react-rxjs.org/docs/api/core/useSubscribe"},next:{title:"collect()",permalink:"/react-rxjs.org/docs/api/utils/collect"}},s=[],u={rightToc:s};function p(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},u,r,{components:t,mdxType:"MDXLayout"}),Object(c.b)("p",null,"A React Component that creates a subscription to the provided observable once\nthe component mounts, and unsubscribes when the component unmounts."),Object(c.b)("p",null,"Properties:"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("inlineCode",{parentName:"li"},"source$"),": Source observable that the Component will subscribe to."),Object(c.b)("li",{parentName:"ul"},Object(c.b)("inlineCode",{parentName:"li"},"graceTime"),": an optional property that describes the amount of time in ms\nthat the Component should wait before unsubscribing from the source observable\nafter it unmounts (default = 200).")),Object(c.b)("p",null,"Important: This Component doesn't trigger any updates."))}p.isMDXComponent=!0},83:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return f}));var n=r(0),o=r.n(n);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=o.a.createContext({}),p=function(e){var t=o.a.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},b=function(e){var t=p(e.components);return o.a.createElement(u.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,c=e.originalType,a=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),b=p(r),m=n,f=b["".concat(a,".").concat(m)]||b[m]||l[m]||c;return r?o.a.createElement(f,i(i({ref:t},u),{},{components:r})):o.a.createElement(f,i({ref:t},u))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=r.length,a=new Array(c);a[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:n,a[1]=i;for(var u=2;u<c;u++)a[u]=r[u];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);