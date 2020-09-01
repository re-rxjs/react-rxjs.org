---
title: Core Concepts
---

## Push vs Pull

Historically, React uses a **pull**-based architecture. This means that when React needs to re-render, it will call the render function of every affected component. This will return a new representation of the UI, which React can reconcile with the previous one. Any changes are then propogated to the DOM.

This kind of behavior is called _pull_ because the consumer (in this case, React), is the one that _requests_ the new value.

On the other hand, RxJS uses a **push**-based approach, where you declaratively define streams and their relationships, and RxJS will propagate every change from one stream to the next one.

This is called _push_ because now the producer of the state is responsible for _handing_ the new value over to those that depend on it. This has a positive effect: only those entities that depend on the value that has changed will update, and it can be done without having to make comparisons or detect changes.

Not only can this approach significantly improve performance, it also makes state management more declarative, in a way that can be read top-to-bottom.

React-RxJS bridges the gap between these two behaviors, making it possible to declare a _push_-based application state that works flawlessly with _pull_-based React.

## Streams as state

RxJS streams are used to represent events or changing values over time. They have an important property: Because of their declarative nature, they don't execute the effect until someone subscribes to it.

```ts
import { Observable } from "rxjs";

const first5Numbers = new Observable((obs) => {
  console.log("hello!");
  for (let i = 0; i < 5; i++) obs.next(i);
  obs.complete();
});
// Logs nothing

first5Numbers.subscribe((n) => {
  console.log(n);
});
// Logs "hello!" followed by 0 1 2 3 4
```

Not only that, but they are unicast: A new subscription is created for every new observer.

```ts
import { interval } from "rxjs";
import { take } from "rxjs/operators";

const first5SpacedNumbers = interval(1000).pipe(take(5));

first5SpacedNumbers.subscribe((v) => console.log("A", v));
// Will start logging A1... A2...

setTimeout(() => {
  first5SpacedNumbers.subscribe((v) => console.log("B", v));
}, 2000);
// Will continue with B1... A3... B2... A4
```

This makes sense because you might want to have a different state for each subscription. However, this doesn't play nicely with React. In React, you have different components, and they all need to receive the same value. Moreover, if that value dispatches a call to a service, you'd only want to make one single call to be shared among all of the components.

RxJS has an operator that helps with this, called `share`:

```ts
import { interval } from "rxjs";
import { take, share } from "rxjs/operators";

const first5SpacedNumbers = interval(1000).pipe(take(5), share());

first5SpacedNumbers.subscribe((v) => console.log("A", v));
// Will start logging A1... A2...

setTimeout(() => {
  first5SpacedNumbers.subscribe((v) => console.log("B", v));
}, 2000);
// Will continue with A3 B3... A4 B4...
```

The technical term for this is that `share` _multicasts_ the stream, so that it only makes one subscription to the source, and will propagate every change to all the subscriptions of the shared stream.

However, this now has a different issue for React's use case: If you look closely at the last snippet, even though `"B"` subscribed when the last value of the stream was `2`, it didn't receive that value. And it makes sense because the change to `2` was emitted in the past - `"B"` didn't receive that change because it subscribed later.

As React is _pull_-based, it needs access to the latest value emitted from the stream when it needs to re-render. With the current model, it would have to wait until a new change is emitted in the stream before it can receive the new state, which wouldn't really work. Here's where React-RxJS comes into play.

RxJS has another operator `shareReplay` which would cover this issue. However, it doesn't play nicely with the way that React works: when the source completes it will keep the last values in memory indefinitely, and replay it back when a new subscription is made, without re-subscribing to the source. This not only exposes a possible memory leak, but also makes it impossible to replay e.g. a fetch call once it has already resolved.

So that's why React-RxJS provides `shareLatest`. In essence, it addresses the issue of sharing the state between many components and keeping always the latest value, but without the additional issues that `shareReplay` exposes for this particular use case. So with React-RxJS our example would become:

```ts
import { interval } from "rxjs";
import { take } from "rxjs/operators";
import { shareLatest } from "@react-rxjs/core";

const first5SpacedNumbers = interval(1000).pipe(take(5), shareLatest());

first5SpacedNumbers.subscribe((v) => console.log("A", v));
// Will start logging A1... A2...

setTimeout(() => {
  first5SpacedNumbers.subscribe((v) => console.log("B", v));
}, 2000);
// Will continue with B2... A3 B3... A4 B4...
```

Now this stream would be ready to be consumed by React. `shareLatest` in a way turns a stream into a state entity. Something that owns a current value, while also providing a way to subscribe to future updates.

The main function of React-RxJS, `bind`, uses this operator on every stream. `bind` is the function you need to use to get a React hook that will receive that value. This function not only adds `shareLatest` to the stream, but also applies a few more tricks to integrate with React, such as:

- Leveraging Suspense, so that you can represent loading states from the streams.
- Leveraging Error Boundaries to allow graceful error recovery.
- Performance optimizations, making sure React doesn't update when it doesn't need to.
- Manages a cache of parametric observables (when using the factory overload).
- Delays unsubscriptions from hooks to keep the stream alive between re-renders.

If we use bind instead, our example will become:

```ts
import { interval } from "rxjs";
import { take } from "rxjs/operators";
import { bind } from "@react-rxjs/core";

const [useFirst5SpacedNumbers, first5SpacedNumbers] = bind(
  interval(1000).pipe(take(5))
);
```

`useFirst5SpacedNumbers` is a hook that will return just a number, which is shared for all components that use it.

Something important to note, though, is that the subscription will happen as soon as there's a subscriber and it will be alive until there are no more subscribers. This means that if all of the components that subscribe to this stream unmount for a while, the latest value will be forgotten, and it will restart the stream when there's a new subscription.

`bind` already handles the case of quick unmount/remount that happen quite often in React (such as when moving one component between different subtrees), but if you want to keep the subscription and the latest value alive even if the component unmounts, you can use `<Subscribe source$={stream} />` or `useSubscribe(stream)` in the relevant bit of your component tree: Within some component that will keep mounted until you don't need the subscription anymore.

## Composing streams

You might have noticed that `bind` returns the hook inside a tuple. This is because `bind` also exposes the stream with `shareLatest` applied so it can be easily composed.

```ts
import { interval } from "rxjs";
import { take } from "rxjs/operators";
import { bind } from "@react-rxjs/core";

const [useSeconds, second$] = bind(interval(1000));

const [useLatestNSeconds, latestNSeconds$] = bind((n: number) =>
  second$.pipe(take(n))
);
```

Composition is an important factor in RxJS streams. It's often recommended to break down streams into smaller chunks, that you can later compose into more complex interactions.

Note that you might not need to use `bind` on every observable. `bind` only makes sense when you need to get a hook for that stream, or to create a _parametric_ observable (basically a function that returns an observable).

## Entry points

Now, where does data for the state come from? Probably the first example that we might think in RxJS is something that fetches some data:

```ts
import { ajax } from "rxjs/ajax";
import { bind } from "@react-rxjs/core";

const [usePost, post$] = bind((id: string) => ajax.getJSON("/posts/" + id));
```

And of course, this will work: Any component can use `usePost` to fetch the post of a specific id.

However, there are some times where we need to use data coming directly from the user. This is where RxJS `Subject`s come into play.

With a `Subject` you can create an entry point for your streams. For example, in a local todos app, you can define your state as:

```ts
import { Subject } from "rxjs";
import { scan, startWith } from "rxjs/operators";
import { bind } from "@react-rxjs/core";

const newTodos = new Subject();
const postNewTodo = (todo) => newTodos.next(todo);

const [useTodoList, todoList$] = bind(
  newTodos.pipe(
    scan((acc, todo) => [...acc, todo], []),
    startWith([])
  )
);
```

And now the "TodoForm" component can directly call `postNewTodo` whenever the user creates a todo, and the change will be propagated down to the list.

Keep in mind that `bind` doesn't do magic. If no one is subscribed to `todoList$` (not even from the hook) then that stream won't be listening for changes on `newTodos` subject, and if a subscription happens late, the subject won't replay the todos created, so they would get lost.

Remember, if you have a case like this (where you are pushing a Subject but no one is subscribed to those changes), make sure you have an active subscription to the stream by using `<Subscribe source$={stream} />` or `useSubscribe(stream)`. This way, `todoList$` will update when a new value is pushed to the subject, and the result will be replayed for every new subscriber that arrives later.

## Suspense

In an earlier example:

```ts
import { ajax } from "rxjs/ajax";
import { bind } from "@react-rxjs/core";

const [usePost, post$] = bind((id: string) => ajax.getJSON("/posts/" + id));
```

You might be wondering - how does this _exactly_ work with React? If React is pull-based and it _needs_ a value at the time it's re-rendering, this stream won't have a value until the ajax call is resolved.

Well, React added a feature called Suspense. With Suspense, we can represent values that are not yet ready, and we can notify React when those values have been loaded.

`react-rxjs` comes with full support for Suspense, and it treats it as a first-class citizen. This means that by default, using a hook from a stream that hasn't emitted any value will result in that hook suspending the component.

Note that for this to work properly, you need to have proper Suspense boundaries throughout your component tree. If you don't want to use Suspense just yet, the solution is simple: Make sure that the stream always has a value. In our example, if we decide that `null` represents missing values, the solution is as simple as:

```ts
import { ajax } from "rxjs/ajax";
import { startWith } from "rxjs/operators";
import { bind } from "@react-rxjs/core";

const [usePost, post$] = bind((id: string) =>
  ajax.getJSON("/posts/" + id).pipe(startWith(null))
);
```

Now `usePost` will emit `null` immediately while it's fetching data (so that we can manually handle that), instead of suspending the component, and when the ajax call is resolved, it will emit the result of that call.

When using Suspense, however, there's also another way to suspend a component with `react-rxjs`: by emitting `SUSPENSE`. For example, this can come in handy if you need to refresh the data because some filter has changed.

There's something to keep in mind though: React Suspense works in a serialized way within a Component. Imagine this example:

```tsx
const UserProfile = () => {
  const details = useUserDetails();
  const posts = useUserPosts();

  return (
    <div>
      <UserDetails details={details} />
      <UserPosts posts={posts} />
    </div>
  );
};
```

In this case, because of the way that Suspense works, these fetches will happen in sequential order. This means that initially `useUserDetails` will subscribe to `userDetails$`, which will start fetching data and suspend the component. When the fetch call resolves, `useUserDetails` will "resume" the component, and `useUserPosts` will run, subscribing and fetching the data, and suspending the component yet again.

This is usually a code smell. If you need to use many react-rxjs hooks in a component, each of which will do some asynchronous work, it's often better to move this logic into a single stream (and hook) by using composition:

```ts
const [useUserDetailsAndPosts] = bind(combineLatest(userDetail$, userPosts$));
```

Now `useUserDetailsAndPosts` will start fetching both resources and suspend the component just once for both of them.

However, in this particular example, there is an even better solution. Note that `UserProfile` is not using `details` or `posts` directly, so we can move the usage of those two hooks down into the components that actually use them, `<UserDetails />` and `<UserPosts />`. This way, React will render both components, and both of them will suspend at the same time, while also subscribing to both streams simultaneously.

## Error boundaries

React 16 added the concept of Error Boundaries: A way to catch errors in the component tree and show a fallback UI so it can be recovered from.

React-RxJS is mindful of these, in a way that if one of the streams emits an error, the components that are subscribed to that stream will propagate that error to the nearest Error Boundary.

We recommend creating Error Boundaries with [react-error-boundary](https://github.com/bvaughn/react-error-boundary), because it creates a good abstraction to build them, by declaring a fallback component and recovery strategy, in a similar way to Suspense Boundaries.

Let's take a look at an example:

```tsx
import { bind } from "@react-rxjs/core";
import { interval } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ErrorBoundary } from "react-error-boundary";

const [useTimedBomb] = bind(
  interval(1000).pipe(
    map((v) => v + 1),
    startWith(0),
    map((v) => {
      if (v === 3) {
        throw new Error("boom");
      }
      return v;
    })
  )
);

function Bomb() {
  const time = useTimedBomb();

  return <div>{time}</div>;
}

function ErrorFallback({ error, componentStack, resetErrorBoundary }) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Bomb />
      </ErrorBoundary>
    </div>
  );
}
```

In here, `useTimedBomb` will start counting from 0 and emit an `error` in the 3rd second. React-RxJS ensures that this error will be caught in the ErrorBoundary defined for the component that's using this stream, so the fallback UI will be shown.

When a rxjs stream emits an error, the stream gets immediately closed. This way, if our strategy to recover from the error is to try again, when `Bomb` resubscribes to the stream it will create a new subscription and start over again.

In this case, after 3 seconds it will throw an error again, but in a real-world case this might be different, and you might need different recovery strategies depending on each case. `react-error-boundary` helps by providing a declarative way to define these strategies.
