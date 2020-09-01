(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{66:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var r=n(2),o=n(6),a=(n(0),n(83)),i={title:"Basic Todos"},c={unversionedId:"tutorial/basic",id:"tutorial/basic",isDocsHomePage:!1,title:"Basic Todos",description:"Capturing user input",source:"@site/docs/tutorial/basic.md",slug:"/tutorial/basic",permalink:"/react-rxjs.org/docs/tutorial/basic",editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/tutorial/basic.md",version:"current",sidebar:"someSidebar",previous:{title:"Intro",permalink:"/react-rxjs.org/docs/tutorial/intro"},next:{title:"bind()",permalink:"/react-rxjs.org/docs/api/core/bind"}},s=[{value:"Capturing user input",id:"capturing-user-input",children:[]},{value:"Creating a stream for all the events",id:"creating-a-stream-for-all-the-events",children:[]},{value:"Creating a stream for each todo",id:"creating-a-stream-for-each-todo",children:[]}],l={rightToc:s};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"capturing-user-input"},"Capturing user input"),Object(a.b)("p",null,"The first thing that we have to do is to capture the input from the user (yes,\nusers are also producers of events!). Let's create some ",Object(a.b)("inlineCode",{parentName:"p"},"Subject"),"s for this, and\nsome functions that wrap the subjects, which we can use from our components:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-tsx"}),"import { Subject } from 'rxjs'\n\nconst newTodo$ = new Subject<string>()\nexport const onNewTodo = (text: string) => text && newTodo.next(text)\n\nconst editTodo$ = new Subject<{id: number, text: string}>();\nexport const onEditTodo = (id: number, text: string) =>\n  editTodo$.next({id, text});\n\nconst toggleTodo$ = new Subject<number>()\nexport const onToggleTodo = (id: number) => toggleTodo$.next(id)\n\nconst deleteTodo$ = new Subject<number>()\nexport const onDeleteTodo = (id: number) => deleteTodo.next(id)\n")),Object(a.b)("h2",{id:"creating-a-stream-for-all-the-events"},"Creating a stream for all the events"),Object(a.b)("p",null,"It would be very convenient to have a merged stream with all those events. However,\nif we did a traditional ",Object(a.b)("inlineCode",{parentName:"p"},"merge"),", then it would be very challenging to know where\neach event came from."),Object(a.b)("p",null,"That's why we expose the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"../api/utils/mergeWithKey"}),Object(a.b)("inlineCode",{parentName:"a"},"mergeWithKey"))," operator from the\n",Object(a.b)("inlineCode",{parentName:"p"},"@react-rxjs/utils")," package. Let's use it:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-tsx"}),"const todoActions$ = mergeWithKey({\n  add: newTodo$.pipe(map(text, id) => ({ id, text })),\n  edit: editTodo$,\n  toggle: toggleTodo$.pipe(map(id => ({ id }))),\n  delete: deleteTodo$.pipe(map(id => ({ id })))\n})\n")),Object(a.b)("p",null,"Which is the equivalent of doing this:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-tsx"}),'const todoActions$ = merge(\n  newTodo$.pipe(map(text, id) => ({\n    type: "add" as const\n    payload: { id, text },\n  })),\n  editTodo$.pipe(map(payload => ({\n    type: "edit" as const,\n    payload,\n  }))),\n  toggleTodo$.pipe(map(id => ({\n    type: "toggle" as const,\n    payload: { id },\n  }))),\n  deleteTodo$.pipe(map(id => ({\n    type: "delete" as const,\n    payload: { id },\n  }))),\n)\n')),Object(a.b)("h2",{id:"creating-a-stream-for-each-todo"},"Creating a stream for each todo"),Object(a.b)("p",null,"Now that we have a stream for all the events, let's create a stream for\neach todo. We will be using another operator from ",Object(a.b)("inlineCode",{parentName:"p"},"@react-rxjs/utils")," for that,\nthe ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"../api/utils/split"}),Object(a.b)("inlineCode",{parentName:"a"},"split")," operator")," operator:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),'type Todo = { id: number, text: string, done: boolean }\n\nconst todos$: Observable<GroupedObservable<number, Todo>> = todoActions$.pipe(\n  split(\n    event => event.payload.id,\n    (event$, id) => event.pipe(\n      takeWhile(event => event.type !== \'delete\'),\n      scan(\n        (state, action) => {\n          switch (action.type) {\n            case "add":\n            case "edit":\n              return { ...state, text: action.payload.text }\n            case "toggle":\n              return { ...state, done: !state.done},\n            default:\n              return state\n          }\n        },\n        { id, text: "", done: false }\n      )\n    )\n  )\n)\n')),Object(a.b)("h1",{id:"collecting-the-groupedobservables"},"Collecting the GroupedObservables"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"split")," returns an Observable of GroupedObservables. However, it would be a lot\nmore convenient to have an Observable of a ",Object(a.b)("inlineCode",{parentName:"p"},"Map<number, Todo>"),", and that's\nexactly what the ",Object(a.b)("inlineCode",{parentName:"p"},"collectValues")," operator does:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"const todosMap$: Observable<Map<number, Todo>> = todos$.pipe(collectValues())\n")))}p.isMDXComponent=!0},83:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=p(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),d=p(n),b=r,m=d["".concat(i,".").concat(b)]||d[b]||u[b]||a;return n?o.a.createElement(m,c(c({ref:t},l),{},{components:n})):o.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<a;l++)i[l]=n[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);