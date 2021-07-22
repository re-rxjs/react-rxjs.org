---
title: Core Concepts
---

## Push vs Pull

Historically, React uses a **pull**-based architecture. This means that when React needs to re-render, it will call the render function of every affected component. This will return a new representation of the UI, which React can reconcile with the previous one. Any changes are then propagated to the DOM.

This kind of behavior is called _pull_ because the consumer (in this case, React), is the one that _requests_ the new value.

On the other hand, RxJS uses a **push**-based approach, where you declaratively define streams and their relationships, and RxJS will propagate every change from one stream to the next one.

This is called _push_ because now the producer of the state is responsible for _handing_ the new value over to those that depend on it. This has a positive effect: only those entities that depend on the value that has changed will update, and it can be done without having to make comparisons or detect changes.

Not only can this approach significantly improve performance, it also makes state management more declarative, in a way that can be read top-to-bottom.

React-RxJS bridges the gap between these two behaviors, making it possible to declare a _push_-based application state that works flawlessly with _pull_-based React.

## Streams as state

RxJS streams are used to represent events or changing values over time. They have an important property: Because of their declarative nature, they don't execute the effect until someone subscribes to it.

```ts
import { Observable } from "rxjs"

const first5Numbers = new Observable((obs) => {
  console.log("hello!")
  for (let i = 0; i < 5; i++) obs.next(i)
  obs.complete()
})
// Logs nothing

first5Numbers.subscribe((n) => {
  console.log(n)
})
// Logs "hello!" followed by 0 1 2 3 4
```

Not only that, but they are unicast: A new subscription is created for every new observer.

```ts
import { interval } from "rxjs"
import { take } from "rxjs/operators"

const first5SpacedNumbers = interval(1000).pipe(take(5))

first5SpacedNumbers.subscribe((v) => console.log("A", v))
// Will start logging A1... A2...

setTimeout(() => {
  first5SpacedNumbers.subscribe((v) => console.log("B", v))
}, 2000)
// Will continue with B1... A3... B2... A4
```

This makes sense because you might want to have a different state for each subscription. However, this doesn't play nicely with React. In React, you have different components, and they all need to receive the same value. Moreover, if that value dispatches a call to a service, you'd only want to make one single call to be shared among all of the components.

RxJS has an operator that helps with this, called `share`:

```ts
import { interval } from "rxjs"
import { take, share } from "rxjs/operators"

const first5SpacedNumbers = interval(1000).pipe(take(5), share())

first5SpacedNumbers.subscribe((v) => console.log("A", v))
// Will start logging A1... A2...

setTimeout(() => {
  first5SpacedNumbers.subscribe((v) => console.log("B", v))
}, 2000)
// Will continue with A3 B3... A4 B4...
```

The technical term for this is that `share` _multicasts_ the stream, so that it only makes one subscription to the source, and will propagate every change to all the subscriptions of the shared stream.

However, this now has a different issue for React's use case: If you look closely at the last snippet, even though `"B"` subscribed when the last value of the stream was `2`, it didn't receive that value. And it makes sense because the change to `2` was emitted in the past - `"B"` didn't receive that change because it subscribed later.

As React is _pull_-based, it needs access to the latest value emitted from the stream when it needs to re-render. With the current model, it would have to wait until a new change is emitted in the stream before it can receive the new state, which wouldn't really work. Here's where React-RxJS comes into play.

RxJS has another operator `shareReplay` which would cover this issue. However, it doesn't play nicely with the way that React works: when the source completes it will keep the last values in memory indefinitely, which would cause a possible memory leak.

So that's why React-RxJS provides `shareLatest`. In essence, it addresses the issue of sharing the state between many components and keeping always the latest value, but without the additional issues that `shareReplay` exposes for this particular use case. So with React-RxJS our example would become:

```ts
import { interval } from "rxjs"
import { take } from "rxjs/operators"
import { shareLatest } from "@react-rxjs/core"

const first5SpacedNumbers = interval(1000).pipe(take(5), shareLatest())

first5SpacedNumbers.subscribe((v) => console.log("A", v))
// Will start logging A1... A2...

setTimeout(() => {
  first5SpacedNumbers.subscribe((v) => console.log("B", v))
}, 2000)
// Will continue with B2... A3 B3... A4 B4...
```

Now this stream would be ready to be consumed by React. `shareLatest` in a way turns a stream into a state entity. Something that owns a current value, while also providing a way to subscribe to future updates.

The main function of React-RxJS, `bind`, uses this operator on every stream. `bind` is the function you need to use to get a React hook that will receive that value. This function not only adds `shareLatest` to the stream, but also applies a few more tricks to integrate with React, such as:

- Leveraging Suspense, so that you can represent loading states from the streams.
- Leveraging Error Boundaries to allow graceful error recovery.
- Performance optimizations, making sure React doesn't update when it doesn't need to.
- Manages a cache of parametric observables (when using the factory overload).

If we use bind instead, our example will become:

```ts
import { interval } from "rxjs"
import { take } from "rxjs/operators"
import { bind } from "@react-rxjs/core"

const [useFirst5SpacedNumbers, first5SpacedNumbers$] = bind(
  interval(1000).pipe(take(5)),
)
```

`useFirst5SpacedNumbers` is a hook that will return just a number, which is shared for all components that use it.

Something important to note, though, is that the subscription to the shared observable (in this case, `first5SpacedNumbers$`) must have an active subscription before the hook can execute. We can't rely on React renderer to make the initial subscription for us (the subscription which would trigger the side effect), because we can't rely on when rendering happens, nor if it will be interrupted or cancelled.

React-RxJS provides different ways of addressing this: The most simple one is to declare the default value for that hook by using the optional argument in `bind`:

```tsx
import { interval } from "rxjs"
import { take } from "rxjs/operators"
import { bind } from "@react-rxjs/core"

const [useFirst5SpacedNumbers, first5SpacedNumbers$] = bind(
  interval(1000).pipe(take(5)),
  0 // Default value
)

function NumberDisplay() {
  const number = useFirst5SpacedNumbers()

  return <div>{number}</div>;
}

function App() {
  return <NumberDisplay />
}
```

When a React-RxJS hook has a default value and no one is subscribed to its observable, on the first render it will return that value, and then it will safely subscribe to the source after mounting. If the underlying observable did have a subscription before the component was mounted, it will directly get the current value instead.

If you don't give it a default value, you will need to make sure that observable has a subscription active before the Component that uses that hook is called. React-RxJS has a utility that helps with this: `<Subscribe source$={stream}>{ children }</Subscribe>` will render `{ children }` only after subscribing to its `source$`. `Subscribe` also subscribes to all the observables used by its children (as if it were a React's Context), so in this case we can just omit `source$`


```tsx
import { interval } from "rxjs"
import { take } from "rxjs/operators"
import { bind, Subscribe } from "@react-rxjs/core"

const [useFirst5SpacedNumbers, first5SpacedNumbers$] = bind(
  interval(1000).pipe(take(5))
)

function NumberDisplay() {
  const number = useFirst5SpacedNumbers()

  return <div>{number}</div>;
}

function App() {
  return <Subscribe>
    <NumberDisplay />
  </Subscribe>
}
```

Keep in mind that `<Subscribe>` will hold a subscription to the observables until it gets unmounted, you need to decide where to put these `<Subscribe>` boundaries on your application so that subscriptions get cleaned up properly.

With the mental model of "streams as state", it's also worth noting that the observables returned by `bind` won't complete: If the source of that observable completes, it will keep the last value and replay it back to new subscribers, as a completion on the source means that there won't be more changes to that stream. Remember that if the subscriber count reaches 0, this state will be cleaned up, and the subscription will restart when a new observer subscribes later on.

## Composing streams

As the stream returned by `bind` is shared, it can be easily composed with other streams.

```ts
import { interval } from "rxjs"
import { take } from "rxjs/operators"
import { bind } from "@react-rxjs/core"

const [useSeconds, second$] = bind(interval(1000))

const [useLatestNSeconds, latestNSeconds$] = bind((n: number) =>
  second$.pipe(take(n)),
)
```

Composition is an important factor in RxJS streams. It's often recommended to break down streams into smaller chunks, that you can later compose into more complex interactions.

Note that you might not need to use `bind` on every observable. `bind` only makes sense when you need to get a hook for that stream, or to create a factory of observables (basically a function that returns observables based on its arguments).

## Entry points

Now, where does data for the state come from? Probably the first example that we might think in RxJS is something that fetches some data:

```ts
import { ajax } from "rxjs/ajax"
import { bind } from "@react-rxjs/core"

const [useTodos, todo$] = bind(ajax.getJSON("/todos"))
```

And of course, this will work: Any component can use `useTodos` to get the list of todos.

However, there are some times where we need to use data coming directly from the user. This is where RxJS `Subject`s come into play. In React-RxJS we've abstracted this into *signals*, which separate the producer and the consumer of that subject.

With a signal you can create an entry point for your streams. For example, in a local todos app, you can define your state as:

```ts
import { scan } from "rxjs/operators"
import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"

const [newTodos$, postNewTodo] = createSignal();

const [useTodoList, todoList$] = bind(
  newTodos$.pipe(
    scan((acc, todo) => [...acc, todo], [])
  ),
  []
)
```

And now the "TodoForm" component can directly call `postNewTodo` whenever the user creates a todo, and the change will be propagated down to the list.

Keep in mind that `bind` doesn't do magic. If no one is subscribed to `todoList$` (not even from the hook) then that stream won't be listening for changes on `newTodos` subject, and if a subscription happens late, the subject won't replay the todos created, so they would get lost.

## Instances

There are many times where you need components to access a particular instance - Classic example is a list of posts. To help with that, `bind` can also take a factory function that returns an Observable for that instance.

For example, if we have a list of posts, we might have an observable that has all of them in a dictionary:

```ts
const [usePosts, posts$] = bind(service.getPost$()) // Dictionary<Post>
```

Although from within each instance component we could theoretically call `usePosts()`, and then take the post that component actually needs, this would cause unnecessary re-renders when other instances change. We solve this by using the factory overload:

```ts
const [usePost, post$] = bind((id: string) =>
  posts$.pipe(map((posts) => posts[id])),
)
```

And now the component can use `usePost(id)` by passing it's own id, and that component will re-render only when that post changes. The second parameter returned, `post$`, it's actually also a function so that it can be composed in other streams: `post$(id)` returns the observable instance that emits Posts for that specific id.

Lastly, do not use this overload of `bind` as a way of calling the server. React-RxJS' mental model is that the observables are state, using bind to create a hook `useCreateUser(userName, email)` that makes the action of creating a new user won't work as you'd like to. Instead, create a [`signal`](#entry-points) and have an observable depend on that signal to send the request to the server.

## Suspense

In an earlier example:

```ts
import { ajax } from "rxjs/ajax"
import { bind } from "@react-rxjs/core"

const [useTodos, todo$] = bind(ajax.getJSON("/todos"))
```

You might be wondering - how does this _exactly_ work with React? If React is pull-based and it _needs_ a value at the time it's re-rendering, this stream might not have a value until the ajax call is resolved.

Well, React added a feature called Suspense. With Suspense, we can represent values that are not yet ready, and we can notify React when those values have been loaded.

`react-rxjs` comes with full support for Suspense, and it treats it as a first-class citizen. This means that by default, using a hook from a stream that hasn't emitted any value will result in that hook suspending the component.

Note that for this to work properly, you need to have proper Suspense boundaries throughout your component tree. If you don't want to use Suspense just yet, the solution is simple: Make sure that the stream always has a value. `bind` also takes an optional parameter for the default value, which guarantees that the hook won't invoke suspense:

```ts
import { ajax } from "rxjs/ajax"
import { bind } from "@react-rxjs/core"

const [useTodos, todos$] = bind(ajax.getJSON("/todos"), null)
```

Now `useTodos` will emit `null` immediately while it's fetching data (so that we can manually handle that), instead of suspending the component, and when the ajax call is resolved, it will emit the result of that call.

When using Suspense, however, there's also another way to suspend a component with `react-rxjs`: by emitting `SUSPENSE`. For example, this can come in handy if you need to refresh the data because some filter has changed.

## Error boundaries

React 16 added the concept of Error Boundaries: A way to catch errors in the component tree and show a fallback UI so it can be recovered from.

React-RxJS is mindful of these, in a way that if one of the streams emits an error, the components that are subscribed to that stream will propagate that error to the nearest Error Boundary.

We recommend creating Error Boundaries with [react-error-boundary](https://github.com/bvaughn/react-error-boundary), because it creates a good abstraction to build them, by declaring a fallback component and recovery strategy, in a similar way to Suspense Boundaries.

Let's take a look at an example:

```tsx
import { bind } from "@react-rxjs/core"
import { interval } from "rxjs"
import { map, startWith } from "rxjs/operators"
import { ErrorBoundary } from "react-error-boundary"

const [useTimedBomb, timedBomb$] = bind(
  interval(1000).pipe(
    map((v) => v + 1),
    startWith(0),
    map((v) => {
      if (v === 3) {
        throw new Error("boom")
      }
      return v
    }),
  ),
)

function Bomb() {
  const time = useTimedBomb()

  return <div>{time}</div>
}

function ErrorFallback({ error, componentStack, resetErrorBoundary }) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Subscribe>
          <Bomb />
        </Subscribe>
      </ErrorBoundary>
    </div>
  )
}
```

In here, `useTimedBomb` will start counting from 0 and emit an `error` in the 3rd second. React-RxJS ensures that this error will be caught in the ErrorBoundary defined for the component that's using this stream, so the fallback UI will be shown.

When a rxjs stream emits an error, the stream gets immediately closed. This way, if our strategy to recover from the error is to try again, when our `Subscribe` boundary resubscribes to the stream it will create a new subscription and start over again.

In this case, after 3 seconds it will throw an error again, but in a real-world case this might be different, and you might need different recovery strategies depending on each case. `react-error-boundary` helps by providing a declarative way to define these strategies.
