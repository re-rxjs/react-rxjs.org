---
id: coreConcepts
title: Core Concepts
sidebar_label: Core Concepts
---

## Push vs Pull

Historically, React uses a **pull**-based architecture. This means that when react needs to re-render, it will call the render function of every affected component, which will access the state at that moment and return a new representation of the UI, which React will reconcile with the previous one to propagate the changes to the DOM.

This kind of behavior is called _pull_ because the consumer of the state (in this case, React), is the one that _requests_ the new value.

On the other hand, RxJS uses a **push**-based approach, where you declaratively define streams and their relationships, and RxJS will propagate every change from one stream to the next one.

This is called _push_ because now the producer of the state is the responsible of _handing_ the new value over to those that depend on it. This has a positive effect: only those entities that depend on a value that has changed will update, without needing to make comparisons with the previous value to catch what parts have changed.

This in turn not only improves performance, but also makes the state management more declarative, and in a way that can be read top-to-bottom.

React-RxJS bridges the gap between these two behaviors, making it possible to declare a _push_ based global state that works flawlessly with React.

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

Not only that, but even if the observable doesn't complete, for every new subscription it will run the side effect again.

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

This in a way makes might make sense because you might want to have a different state for each subscription, however, this doesn't play nicely with React. You might have different components, and they all need to receive the same value. Moreover, if that value dispatches a call to a service, you'd only want to make one single call to be shared among all of the components.

RxJS has an operator that helps with this, `share`:

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

However, this now has a different issue for React's use case: You might have noticed in the last snippet that even though `"B"` subscribed when the last value of the stream was `2`, it didn't receive that value. And it makes sense because as the change was emitted in the past, it subscribed late and it won't receive it straight away.

React needs access to the latest value emitted from the stream. It can't wait until the state changes, and here's when React-RxJS comes into play.

RxJS has another operator `shareReplay` which would cover this issue. However, it doesn't play nicely with the way that React works, because when the source completes it will keep the last values in memory indefinitely, and replay them back when a new subscriber comes without re-subscribing to the source. This not only exposes a possible memory leak, but also makes it impossible to replay e.g. a fetch call once it has already resolved.

So that's why React-RxJS exports `shareLatest`. In essence, it addresses the issue of sharing the state between many components and keeping always the latest value, but without the additional issues that `shareReplay` exposes for this particular use case. So now our example would become:

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

Now this stream would be ready to be consumed by React. `shareLatest` in a way turns a stream into a state entity. Something that owns a current value, while allowing others to subscribe for future changes.

The main function of React-RxJS, `bind`, uses this operator on every stream, so in general, you shouldn't need to use `shareLatest` directly. At the same time, `bind` does more to fully integrate RxJS with react (such as leveraging suspense, and a few performance optimizations), so it's the function that you'd call to get a hook that will receive that value.

```ts
import { interval } from "rxjs";
import { take } from "rxjs/operators";
import { bind } from "@react-rxjs/core";

const [useFirst5SpacedNumbers] = bind(interval(1000).pipe(take(5)));
```

`useFirst5SpacedNumbers` is a hook that will return just a number (ready to be used in a component), which is shared for all components.

Something important to note, though, is that the subscription will happen as soon as there's a subscriber (duh) and it will be alive until there are no more subscribers. This means that if all of the components that subscribe to this stream unmount for a while, the latest value will be forgotten, and it will restart the stream when there's a new subscription.

If you want to persist that value make sure to keep a subscription alive in the relevant bit of your component tree with `<Subscribe source$={stream} />` or `useSubscribe(stream)` from `@react-rxjs/utils`

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

Note that you might not need to use `bind` on every observable. `bind` only makes sense when you want to represent a value which you'd like to share with other streams, and if you need to access that stream from React. Think of `bind` as a way of turning a stream into a state.

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

Keep in mind that `bind` doesn't do magic. If no one is subscribed to `todoList$` (not even from the hook) then that stream won't be listening for changes on `newTodos` subject, and if a subscription happens late, the subject won't replay the todos created so they would get lost.

Remember, if you have a case like this (where you are pushing a Subject but no one is subscribed to those changes), make sure you have an active subscription to the stream by using `<Subscribe source$={stream} />` or `useSubscribe(stream)` from `@react-rxjs/utils`. This way, `todoList$` will update when a new value is pushed to the subject, and the result will be replayed for every new subscriber that comes later on.

## Suspense

In an earlier example:

```ts
import { ajax } from "rxjs/ajax";
import { bind } from "@react-rxjs/core";

const [usePost, post$] = bind((id: string) => ajax.getJSON("/posts/" + id));
```

You might be wondering - how does this _exactly_ work with React? If React is pull-based and it _needs_ a value at the time it's re-rendering, this stream won't have a value until the ajax call is resolved.

Well, React added a feature that makes it a bit less pull-based: Suspense. With Suspense, we can represent values that are not yet ready, and we can notify React when those values have been loaded.

`react-rxjs` comes with full support with Suspense, and it treats it as a first-class citizen. This means that by default, using a hook from a stream that hasn't emitted any value will result in that hook suspending the Component.

Note that for this to work properly, you need to have proper Suspense boundaries throughout your component tree. If you don't want to use Suspense just yet the solution is simple: Make sure that the stream always has a value. In our example, if we want to describe that the post is missing with a `null`, it's as simple as:

```ts
import { ajax } from "rxjs/ajax";
import { startWith } from "rxjs/operators";
import { bind } from "@react-rxjs/core";

const [usePost, post$] = bind((id: string) =>
  ajax.getJSON("/posts/" + id).pipe(startWith(null))
);
```

Now `usePost` will return `null` while it's fetching data (so that we can manually handle that) instead of suspending the component, and when the ajax call is resolved it will return the result of that call.

Back to using React's Suspense, there are more ways to suspend a component with `react-rxjs` than in the initial call.

You can suspend any component that depends on a stream by emitting `SUSPENSE` from `@rxjs/core`. For instance, that can come in handy to suspend a component that has already fetched some data from a service, but that we will start refreshing because it's stale.

There's something to keep in mind though: React Suspense works in series within a Component. Imagine this example:

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

There are two solutions to this. One is to build a stream that merges both sub-streams:

```ts
const [useUserDetailsAndPosts] = bind(combineLatest(userDetail$, userPosts$));
```

Now `useUserDetailsAndPosts` will start fetching both resources and suspend the component just once for both of them.

But in this particular example, it would make more sense a different solution: We can move the usage of those two hooks down into `<UserDetails />` and `<UserPosts />`. This way, react will render both components, and both of them will suspend at the same time, while also subscribing to both streams simultaneously.
