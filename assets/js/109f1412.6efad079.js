"use strict";(self.webpackChunkreact_rxjs_org=self.webpackChunkreact_rxjs_org||[]).push([[559],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return y}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=l(n),f=o,y=p["".concat(s,".").concat(f)]||p[f]||m[f]||a;return n?r.createElement(y,i(i({ref:t},u),{},{components:n})):r.createElement(y,i({ref:t},u))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[p]="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6585:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return y},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return p}});var r=n(3117),o=n(102),a=(n(7294),n(3905)),i=["components"],c={title:"Motivation"},s=void 0,l={unversionedId:"motivation",id:"motivation",title:"Motivation",description:"As you probably already know, React's state management system is not Reactive.",source:"@site/docs/motivation.md",sourceDirName:".",slug:"/motivation",permalink:"/docs/motivation",draft:!1,editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/motivation.md",tags:[],version:"current",frontMatter:{title:"Motivation"},sidebar:"someSidebar",next:{title:"Core Concepts",permalink:"/docs/core-concepts"}},u={},p=[],m={toc:p},f="wrapper";function y(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)(f,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"As you probably already know, React's state management system is not Reactive.\n",(0,a.kt)("a",{parentName:"p",href:"https://twitter.com/Rich_Harris"},"Richard Harris")," does a great job explaining this\nin his talk ",(0,a.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=AdNJ3fydeao"},"Rethinking Reactivity"),".\nIn that same talk Rich borrows the following quote from ",(0,a.kt)("a",{parentName:"p",href:"https://apfelmus.nfshost.com/"},"Heinrich Apfelmus"),",\nwhich brilliantly defines the essence of Functional Reactive Programming:"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"The essence of functional reactive programming is to specify the dynamic\nbehavior of a value completely at the time of declaration")),(0,a.kt)("p",null,"The goal of this library is to create a set of bindings that bring this essence\nof Reactive Programming into React. We may not be able to use Svelte's destiny\noperator \ud83e\udd37, but we will be able to declare the dynamic behavior of our state\nat the time of its declaration using RxJS streams. No stores. No context.\nJust reactive streams that integrate seamlessly with React."),(0,a.kt)("p",null,"Working with Reactive solutions has many advantages, among them:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"They provide loosely coupled solutions: reactive streams are only coupled to events that they directly depend on."),(0,a.kt)("li",{parentName:"ul"},"Avoiding unnecessary computations, which translates into optimal react updates."),(0,a.kt)("li",{parentName:"ul"},"Improving code navigability, by avoiding unnecessary layers of indirection."),(0,a.kt)("li",{parentName:"ul"},"If we compare them with Flux based architectures, they generate a lot less boilerplate."),(0,a.kt)("li",{parentName:"ul"},"By avoiding central stores we get code-splitting out of the box.")))}y.isMDXComponent=!0}}]);