(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{64:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return b}));var a=n(2),r=n(6),o=(n(0),n(87)),s={title:"Core Concepts"},i={unversionedId:"core-concepts",id:"core-concepts",isDocsHomePage:!1,title:"Core Concepts",description:"Push vs Pull",source:"@site/docs/core-concepts.md",slug:"/core-concepts",permalink:"/docs/core-concepts",editUrl:"https://github.com/re-rxjs/react-rxjs.org/tree/master/docs/core-concepts.md",version:"current",sidebar:"someSidebar",previous:{title:"Motivation",permalink:"/docs/motivation"},next:{title:"Getting Started",permalink:"/docs/getting-started"}},c=[{value:"Push vs Pull",id:"push-vs-pull",children:[]},{value:"Streams as state",id:"streams-as-state",children:[]},{value:"Composing streams",id:"composing-streams",children:[]},{value:"Entry points",id:"entry-points",children:[]},{value:"Instances",id:"instances",children:[]},{value:"Suspense",id:"suspense",children:[]},{value:"Error boundaries",id:"error-boundaries",children:[]}],l={rightToc:c};function b(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"push-vs-pull"},"Push vs Pull"),Object(o.b)("p",null,"Historically, React uses a ",Object(o.b)("strong",{parentName:"p"},"pull"),"-based architecture. This means that when React needs to re-render, it will call the render function of every affected component. This will return a new representation of the UI, which React can reconcile with the previous one. Any changes are then propagated to the DOM."),Object(o.b)("p",null,"This kind of behavior is called ",Object(o.b)("em",{parentName:"p"},"pull")," because the consumer (in this case, React), is the one that ",Object(o.b)("em",{parentName:"p"},"requests")," the new value."),Object(o.b)("p",null,"On the other hand, RxJS uses a ",Object(o.b)("strong",{parentName:"p"},"push"),"-based approach, where you declaratively define streams and their relationships, and RxJS will propagate every change from one stream to the next one."),Object(o.b)("p",null,"This is called ",Object(o.b)("em",{parentName:"p"},"push")," because now the producer of the state is responsible for ",Object(o.b)("em",{parentName:"p"},"handing")," the new value over to those that depend on it. This has a positive effect: only those entities that depend on the value that has changed will update, and it can be done without having to make comparisons or detect changes."),Object(o.b)("p",null,"Not only can this approach significantly improve performance, it also makes state management more declarative, in a way that can be read top-to-bottom."),Object(o.b)("p",null,"React-RxJS bridges the gap between these two behaviors, making it possible to declare a ",Object(o.b)("em",{parentName:"p"},"push"),"-based application state that works flawlessly with ",Object(o.b)("em",{parentName:"p"},"pull"),"-based React."),Object(o.b)("h2",{id:"streams-as-state"},"Streams as state"),Object(o.b)("p",null,"RxJS streams are used to represent events or changing values over time. They have an important property: Because of their declarative nature, they don't execute the effect until someone subscribes to it."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { Observable } from "rxjs"\n\nconst first5Numbers = new Observable((obs) => {\n  console.log("hello!")\n  for (let i = 0; i < 5; i++) obs.next(i)\n  obs.complete()\n})\n// Logs nothing\n\nfirst5Numbers.subscribe((n) => {\n  console.log(n)\n})\n// Logs "hello!" followed by 0 1 2 3 4\n')),Object(o.b)("p",null,"Not only that, but they are unicast: A new subscription is created for every new observer."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { interval } from "rxjs"\nimport { take } from "rxjs/operators"\n\nconst first5SpacedNumbers = interval(1000).pipe(take(5))\n\nfirst5SpacedNumbers.subscribe((v) => console.log("A", v))\n// Will start logging A1... A2...\n\nsetTimeout(() => {\n  first5SpacedNumbers.subscribe((v) => console.log("B", v))\n}, 2000)\n// Will continue with B1... A3... B2... A4\n')),Object(o.b)("p",null,"This makes sense because you might want to have a different state for each subscription. However, this doesn't play nicely with React. In React, you have different components, and they all need to receive the same value. Moreover, if that value dispatches a call to a service, you'd only want to make one single call to be shared among all of the components."),Object(o.b)("p",null,"RxJS has an operator that helps with this, called ",Object(o.b)("inlineCode",{parentName:"p"},"share"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { interval } from "rxjs"\nimport { take, share } from "rxjs/operators"\n\nconst first5SpacedNumbers = interval(1000).pipe(take(5), share())\n\nfirst5SpacedNumbers.subscribe((v) => console.log("A", v))\n// Will start logging A1... A2...\n\nsetTimeout(() => {\n  first5SpacedNumbers.subscribe((v) => console.log("B", v))\n}, 2000)\n// Will continue with A3 B3... A4 B4...\n')),Object(o.b)("p",null,"The technical term for this is that ",Object(o.b)("inlineCode",{parentName:"p"},"share")," ",Object(o.b)("em",{parentName:"p"},"multicasts")," the stream, so that it only makes one subscription to the source, and will propagate every change to all the subscriptions of the shared stream."),Object(o.b)("p",null,"However, this now has a different issue for React's use case: If you look closely at the last snippet, even though ",Object(o.b)("inlineCode",{parentName:"p"},'"B"')," subscribed when the last value of the stream was ",Object(o.b)("inlineCode",{parentName:"p"},"2"),", it didn't receive that value. And it makes sense because the change to ",Object(o.b)("inlineCode",{parentName:"p"},"2")," was emitted in the past - ",Object(o.b)("inlineCode",{parentName:"p"},'"B"')," didn't receive that change because it subscribed later."),Object(o.b)("p",null,"As React is ",Object(o.b)("em",{parentName:"p"},"pull"),"-based, it needs access to the latest value emitted from the stream when it needs to re-render. With the current model, it would have to wait until a new change is emitted in the stream before it can receive the new state, which wouldn't really work. Here's where React-RxJS comes into play."),Object(o.b)("p",null,"RxJS has another operator ",Object(o.b)("inlineCode",{parentName:"p"},"shareReplay")," which would cover this issue. However, it doesn't play nicely with the way that React works: when the source completes it will keep the last values in memory indefinitely, which would cause a possible memory leak."),Object(o.b)("p",null,"So that's why React-RxJS provides ",Object(o.b)("inlineCode",{parentName:"p"},"shareLatest"),". In essence, it addresses the issue of sharing the state between many components and keeping always the latest value, but without the additional issues that ",Object(o.b)("inlineCode",{parentName:"p"},"shareReplay")," exposes for this particular use case. So with React-RxJS our example would become:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { interval } from "rxjs"\nimport { take } from "rxjs/operators"\nimport { shareLatest } from "@react-rxjs/core"\n\nconst first5SpacedNumbers = interval(1000).pipe(take(5), shareLatest())\n\nfirst5SpacedNumbers.subscribe((v) => console.log("A", v))\n// Will start logging A1... A2...\n\nsetTimeout(() => {\n  first5SpacedNumbers.subscribe((v) => console.log("B", v))\n}, 2000)\n// Will continue with B2... A3 B3... A4 B4...\n')),Object(o.b)("p",null,"Now this stream would be ready to be consumed by React. ",Object(o.b)("inlineCode",{parentName:"p"},"shareLatest")," in a way turns a stream into a state entity. Something that owns a current value, while also providing a way to subscribe to future updates."),Object(o.b)("p",null,"The main function of React-RxJS, ",Object(o.b)("inlineCode",{parentName:"p"},"bind"),", uses this operator on every stream. ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," is the function you need to use to get a React hook that will receive that value. This function not only adds ",Object(o.b)("inlineCode",{parentName:"p"},"shareLatest")," to the stream, but also applies a few more tricks to integrate with React, such as:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Leveraging Suspense, so that you can represent loading states from the streams."),Object(o.b)("li",{parentName:"ul"},"Leveraging Error Boundaries to allow graceful error recovery."),Object(o.b)("li",{parentName:"ul"},"Performance optimizations, making sure React doesn't update when it doesn't need to."),Object(o.b)("li",{parentName:"ul"},"Manages a cache of parametric observables (when using the factory overload).")),Object(o.b)("p",null,"If we use bind instead, our example will become:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { interval } from "rxjs"\nimport { take } from "rxjs/operators"\nimport { bind } from "@react-rxjs/core"\n\nconst [useFirst5SpacedNumbers, first5SpacedNumbers$] = bind(\n  interval(1000).pipe(take(5)),\n)\n')),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"useFirst5SpacedNumbers")," is a hook that will return just a number, which is shared for all components that use it."),Object(o.b)("p",null,"Something important to note, though, is that the subscription to the shared observable (in this case, ",Object(o.b)("inlineCode",{parentName:"p"},"first5SpacedNumbers$"),") must have an active subscription before the hook can execute. We can't rely on React renderer to make the initial subscription for us (the subscription which would trigger the side effect), because we can't rely on when rendering happens, nor if it will be interrupted or cancelled."),Object(o.b)("p",null,"React-RxJS provides different ways of addressing this: The most simple one is to declare the default value for that hook by using the optional argument in ",Object(o.b)("inlineCode",{parentName:"p"},"bind"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx"}),'import { interval } from "rxjs"\nimport { take } from "rxjs/operators"\nimport { bind } from "@react-rxjs/core"\n\nconst [useFirst5SpacedNumbers, first5SpacedNumbers$] = bind(\n  interval(1000).pipe(take(5)),\n  0 // Default value\n)\n\nfunction NumberDisplay() {\n  const number = useFirst5SpacedNumbers()\n\n  return <div>{number}</div>;\n}\n\nfunction App() {\n  return <NumberDisplay />\n}\n')),Object(o.b)("p",null,"When a React-RxJS hook has a default value and no one is subscribed to its observable, on the first render it will return that value, and then it will safely subscribe to the source after mounting. If the underlying observable did have a subscription before the component was mounted, it will directly get the current value instead."),Object(o.b)("p",null,"If you don't give it a default value, you will need to make sure that observable has a subscription active before the Component that uses that hook is called. React-RxJS has a utility that helps with this: ",Object(o.b)("inlineCode",{parentName:"p"},"<Subscribe source$={stream}>{ children }</Subscribe>")," will render ",Object(o.b)("inlineCode",{parentName:"p"},"{ children }")," only after subscribing to its ",Object(o.b)("inlineCode",{parentName:"p"},"source$"),". ",Object(o.b)("inlineCode",{parentName:"p"},"Subscribe")," also subscribes to all the observables used by its children (as if it were a React's Context), so in this case we can just omit ",Object(o.b)("inlineCode",{parentName:"p"},"source$")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx"}),'import { interval } from "rxjs"\nimport { take } from "rxjs/operators"\nimport { bind, Subscribe } from "@react-rxjs/core"\n\nconst [useFirst5SpacedNumbers, first5SpacedNumbers$] = bind(\n  interval(1000).pipe(take(5))\n)\n\nfunction NumberDisplay() {\n  const number = useFirst5SpacedNumbers()\n\n  return <div>{number}</div>;\n}\n\nfunction App() {\n  return <Subscribe>\n    <NumberDisplay />\n  </Subscribe>\n}\n')),Object(o.b)("p",null,"Keep in mind that ",Object(o.b)("inlineCode",{parentName:"p"},"<Subscribe>")," will hold a subscription to the observables until it gets unmounted, you need to decide where to put these ",Object(o.b)("inlineCode",{parentName:"p"},"<Subscribe>")," boundaries on your application so that subscriptions get cleaned up properly."),Object(o.b)("p",null,'With the mental model of "streams as state", it\'s also worth noting that the observables returned by ',Object(o.b)("inlineCode",{parentName:"p"},"bind")," won't complete: If the source of that observable completes, it will keep the last value and replay it back to new subscribers, as a completion on the source means that there won't be more changes to that stream. Remember that if the subscriber count reaches 0, this state will be cleaned up, and the subscription will restart when a new observer subscribes later on."),Object(o.b)("h2",{id:"composing-streams"},"Composing streams"),Object(o.b)("p",null,"As the stream returned by ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," is shared, it can be easily composed with other streams."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { interval } from "rxjs"\nimport { take } from "rxjs/operators"\nimport { bind } from "@react-rxjs/core"\n\nconst [useSeconds, second$] = bind(interval(1000))\n\nconst [useLatestNSeconds, latestNSeconds$] = bind((n: number) =>\n  second$.pipe(take(n)),\n)\n')),Object(o.b)("p",null,"Composition is an important factor in RxJS streams. It's often recommended to break down streams into smaller chunks, that you can later compose into more complex interactions."),Object(o.b)("p",null,"Note that you might not need to use ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," on every observable. ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," only makes sense when you need to get a hook for that stream, or to create a factory of observables (basically a function that returns observables based on its arguments)."),Object(o.b)("h2",{id:"entry-points"},"Entry points"),Object(o.b)("p",null,"Now, where does data for the state come from? Probably the first example that we might think in RxJS is something that fetches some data:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { ajax } from "rxjs/ajax"\nimport { bind } from "@react-rxjs/core"\n\nconst [useTodos, todo$] = bind(ajax.getJSON("/todos"))\n')),Object(o.b)("p",null,"And of course, this will work: Any component can use ",Object(o.b)("inlineCode",{parentName:"p"},"useTodos")," to get the list of todos."),Object(o.b)("p",null,"However, there are some times where we need to use data coming directly from the user. This is where RxJS ",Object(o.b)("inlineCode",{parentName:"p"},"Subject"),"s come into play. In React-RxJS we've abstracted this into ",Object(o.b)("em",{parentName:"p"},"signals"),", which separate the producer and the consumer of that subject."),Object(o.b)("p",null,"With a signal you can create an entry point for your streams. For example, in a local todos app, you can define your state as:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { scan } from "rxjs/operators"\nimport { bind } from "@react-rxjs/core"\nimport { createSignal } from "@react-rxjs/utils"\n\nconst [newTodos$, postNewTodo] = createSignal();\n\nconst [useTodoList, todoList$] = bind(\n  newTodos$.pipe(\n    scan((acc, todo) => [...acc, todo], [])\n  ),\n  []\n)\n')),Object(o.b)("p",null,'And now the "TodoForm" component can directly call ',Object(o.b)("inlineCode",{parentName:"p"},"postNewTodo")," whenever the user creates a todo, and the change will be propagated down to the list."),Object(o.b)("p",null,"Keep in mind that ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," doesn't do magic. If no one is subscribed to ",Object(o.b)("inlineCode",{parentName:"p"},"todoList$")," (not even from the hook) then that stream won't be listening for changes on ",Object(o.b)("inlineCode",{parentName:"p"},"newTodos")," subject, and if a subscription happens late, the subject won't replay the todos created, so they would get lost."),Object(o.b)("h2",{id:"instances"},"Instances"),Object(o.b)("p",null,"There are many times where you need components to access a particular instance - Classic example is a list of posts. To help with that, ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," can also take a factory function that returns an Observable for that instance."),Object(o.b)("p",null,"For example, if we have a list of posts, we might have an observable that has all of them in a dictionary:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"const [usePosts, posts$] = bind(service.getPost$()) // Dictionary<Post>\n")),Object(o.b)("p",null,"Although from within each instance component we could theoretically call ",Object(o.b)("inlineCode",{parentName:"p"},"usePosts()"),", and then take the post that component actually needs, this would cause unnecessary re-renders when other instances change. We solve this by using the factory overload:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"const [usePost, post$] = bind((id: string) =>\n  posts$.pipe(map((posts) => posts[id])),\n)\n")),Object(o.b)("p",null,"And now the component can use ",Object(o.b)("inlineCode",{parentName:"p"},"usePost(id)")," by passing it's own id, and that component will re-render only when that post changes. The second parameter returned, ",Object(o.b)("inlineCode",{parentName:"p"},"post$"),", it's actually also a function so that it can be composed in other streams: ",Object(o.b)("inlineCode",{parentName:"p"},"post$(id)")," returns the observable instance that emits Posts for that specific id."),Object(o.b)("p",null,"Lastly, do not use this overload of ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," as a way of calling the server. React-RxJS' mental model is that the observables are state, using bind to create a hook ",Object(o.b)("inlineCode",{parentName:"p"},"useCreateUser(userName, email)")," that makes the action of creating a new user won't work as you'd like to. Instead, create a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"#entry-points"}),Object(o.b)("inlineCode",{parentName:"a"},"signal"))," and have an observable depend on that signal to send the request to the server."),Object(o.b)("h2",{id:"suspense"},"Suspense"),Object(o.b)("p",null,"In an earlier example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { ajax } from "rxjs/ajax"\nimport { bind } from "@react-rxjs/core"\n\nconst [useTodos, todo$] = bind(ajax.getJSON("/todos"))\n')),Object(o.b)("p",null,"You might be wondering - how does this ",Object(o.b)("em",{parentName:"p"},"exactly")," work with React? If React is pull-based and it ",Object(o.b)("em",{parentName:"p"},"needs")," a value at the time it's re-rendering, this stream might not have a value until the ajax call is resolved."),Object(o.b)("p",null,"Well, React added a feature called Suspense. With Suspense, we can represent values that are not yet ready, and we can notify React when those values have been loaded."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"react-rxjs")," comes with full support for Suspense, and it treats it as a first-class citizen. This means that by default, using a hook from a stream that hasn't emitted any value will result in that hook suspending the component."),Object(o.b)("p",null,"Note that for this to work properly, you need to have proper Suspense boundaries throughout your component tree. If you don't want to use Suspense just yet, the solution is simple: Make sure that the stream always has a value. ",Object(o.b)("inlineCode",{parentName:"p"},"bind")," also takes an optional parameter for the default value, which guarantees that the hook won't invoke suspense:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),'import { ajax } from "rxjs/ajax"\nimport { bind } from "@react-rxjs/core"\n\nconst [useTodos, todos$] = bind(ajax.getJSON("/todos"), null)\n')),Object(o.b)("p",null,"Now ",Object(o.b)("inlineCode",{parentName:"p"},"useTodos")," will emit ",Object(o.b)("inlineCode",{parentName:"p"},"null")," immediately while it's fetching data (so that we can manually handle that), instead of suspending the component, and when the ajax call is resolved, it will emit the result of that call."),Object(o.b)("p",null,"When using Suspense, however, there's also another way to suspend a component with ",Object(o.b)("inlineCode",{parentName:"p"},"react-rxjs"),": by emitting ",Object(o.b)("inlineCode",{parentName:"p"},"SUSPENSE"),". For example, this can come in handy if you need to refresh the data because some filter has changed."),Object(o.b)("h2",{id:"error-boundaries"},"Error boundaries"),Object(o.b)("p",null,"React 16 added the concept of Error Boundaries: A way to catch errors in the component tree and show a fallback UI so it can be recovered from."),Object(o.b)("p",null,"React-RxJS is mindful of these, in a way that if one of the streams emits an error, the components that are subscribed to that stream will propagate that error to the nearest Error Boundary."),Object(o.b)("p",null,"We recommend creating Error Boundaries with ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/bvaughn/react-error-boundary"}),"react-error-boundary"),", because it creates a good abstraction to build them, by declaring a fallback component and recovery strategy, in a similar way to Suspense Boundaries."),Object(o.b)("p",null,"Let's take a look at an example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-tsx"}),'import { bind } from "@react-rxjs/core"\nimport { interval } from "rxjs"\nimport { map, startWith } from "rxjs/operators"\nimport { ErrorBoundary } from "react-error-boundary"\n\nconst [useTimedBomb, timedBomb$] = bind(\n  interval(1000).pipe(\n    map((v) => v + 1),\n    startWith(0),\n    map((v) => {\n      if (v === 3) {\n        throw new Error("boom")\n      }\n      return v\n    }),\n  ),\n)\n\nfunction Bomb() {\n  const time = useTimedBomb()\n\n  return <div>{time}</div>\n}\n\nfunction ErrorFallback({ error, componentStack, resetErrorBoundary }) {\n  return (\n    <div>\n      <p>Something went wrong:</p>\n      <pre>{error?.message}</pre>\n      <pre>{componentStack}</pre>\n      <button onClick={resetErrorBoundary}>Try again</button>\n    </div>\n  )\n}\n\nfunction App() {\n  return (\n    <div className="App">\n      <ErrorBoundary FallbackComponent={ErrorFallback}>\n        <Subscribe source$={timedBomb$}>\n          <Bomb />\n        </Subscribe>\n      </ErrorBoundary>\n    </div>\n  )\n}\n')),Object(o.b)("p",null,"In here, ",Object(o.b)("inlineCode",{parentName:"p"},"useTimedBomb")," will start counting from 0 and emit an ",Object(o.b)("inlineCode",{parentName:"p"},"error")," in the 3rd second. React-RxJS ensures that this error will be caught in the ErrorBoundary defined for the component that's using this stream, so the fallback UI will be shown."),Object(o.b)("p",null,"When a rxjs stream emits an error, the stream gets immediately closed. This way, if our strategy to recover from the error is to try again, when our ",Object(o.b)("inlineCode",{parentName:"p"},"Subscribe")," boundary resubscribes to the stream it will create a new subscription and start over again."),Object(o.b)("p",null,"In this case, after 3 seconds it will throw an error again, but in a real-world case this might be different, and you might need different recovery strategies depending on each case. ",Object(o.b)("inlineCode",{parentName:"p"},"react-error-boundary")," helps by providing a declarative way to define these strategies."))}b.isMDXComponent=!0},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),b=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=b(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=b(n),d=a,h=p["".concat(s,".").concat(d)]||p[d]||u[d]||o;return n?r.a.createElement(h,i(i({ref:t},l),{},{components:n})):r.a.createElement(h,i({ref:t},l))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var l=2;l<o;l++)s[l]=n[l];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);