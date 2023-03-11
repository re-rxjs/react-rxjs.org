"use strict";(self.webpackChunkreact_rxjs_org=self.webpackChunkreact_rxjs_org||[]).push([[195],{4338:function(e,t,r){r.r(t),r.d(t,{default:function(){return p}});var a=r(3117),n=r(7294);function l(e){var t,r,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(r=l(e[t]))&&(a&&(a+=" "),a+=r);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}function o(){for(var e,t,r=0,a="";r<arguments.length;)(e=arguments[r++])&&(t=l(e))&&(a&&(a+=" "),a+=t);return a}var s=r(4774),i=r(9960),c=r(2263),m=r(4996),u={heroBanner:"heroBanner_UJJx",buttons:"buttons_pzbO",features:"features_keug",featureImage:"featureImage_yA8i"},d=[{title:n.createElement(n.Fragment,null,"Truly reactive"),description:n.createElement(n.Fragment,null,"React-RxJS allows you to express the dynamic behavior of your app's state completely at the time of its definition.")},{title:n.createElement(n.Fragment,null,"Seamless React integration"),description:n.createElement(n.Fragment,null,"React-RxJS offers a hook-based API with first-class support for"," ",n.createElement(i.Z,{to:"https://reactjs.org/docs/concurrent-mode-suspense.html"},"React.Suspense")," ","and"," ",n.createElement(i.Z,{to:"https://reactjs.org/docs/error-boundaries.html"},"Error Boundaries"),". Also, all hooks created with React-RxJS can be used for sharing state.")},{title:n.createElement(n.Fragment,null,"Highly performant"),description:n.createElement(n.Fragment,null,"Modeling your state with"," ",n.createElement(i.Z,{to:"https://rxjs.dev/guide/observable"},"observables")," enables a highly performant state propagation system based on forward referencing subscriptions.")},,];function g(e){var t=e.imageUrl,r=e.title,a=e.description,l=(0,m.Z)(t);return n.createElement("div",{className:o("col col--4",u.feature)},l&&n.createElement("div",{className:"text--center"},n.createElement("img",{className:u.featureImage,src:l,alt:r})),n.createElement("h3",null,r),n.createElement("p",null,a))}var p=function(){var e=(0,c.Z)().siteConfig,t=void 0===e?{}:e;return n.createElement(s.Z,{title:t.title,description:"React bindings for RxJS"},n.createElement("div",{style:{background:"#111",padding:"10px 0",lineHeight:2}},n.createElement("div",{className:"container"},n.createElement("div",{style:{color:"white",fontWeight:"bold",textAlign:"center"}},"Black Lives Matter.",n.createElement("a",{style:{display:"inline-block",color:"white",fontWeight:"bold",margin:"0 10px",padding:"7px 20px",border:"1px solid white"},href:"https://support.eji.org/give/153413",target:"_blank",rel:"noopener noreferrer"},"Support the Equal Justice Initiative.")))),n.createElement("header",{className:o("hero hero--primary",u.heroBanner)},n.createElement("div",{className:"container"},n.createElement("div",{className:u.title},n.createElement("img",{src:"img/logo-128.png",alt:"React-RxJS logo",width:"100",height:"100"}),n.createElement("h1",{className:"hero__title"},t.title)),n.createElement("p",{className:"hero__subtitle"},t.tagline),n.createElement("div",{className:u.buttons},n.createElement(i.Z,{className:o("button button--outline button--secondary button--lg",u.getStarted),to:(0,m.Z)("docs/getting-started")},"Get Started")))),n.createElement("main",null,d&&d.length>0&&n.createElement("section",{className:u.features},n.createElement("div",{className:"container"},n.createElement("div",{className:"row"},d.map((function(e,t){return n.createElement(g,(0,a.Z)({key:t},e))})))))))}}}]);