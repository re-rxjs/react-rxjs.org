---
title: Motivation
---

As you probably already know, React's state management system is not Reactive.
[Richard Harris](https://twitter.com/Rich_Harris) does a great job explaining this
in his talk [Rethinking Reactivity](https://www.youtube.com/watch?v=AdNJ3fydeao).
In that same talk Rich borrows the following quote from [Heinrich Apfelmus](https://apfelmus.nfshost.com/),
which brilliantly defines the essence of Functional Reactive Programming:

> The essence of functional reactive programming is to specify the dynamic
behavior of a value completely at the time of declaration

The goal of this library is to create a set of bindings that bring this essence
of Reactive Programming into React. We may not be able to use Svelte's destiny
operator :shrug:, but we will be able to declare the dynamic behavior of our state
at the time of its declaration using RxJS streams. No stores. No context.
Just reactive streams that integrate seamlessly with React.

Working with Reactive solutions has many advantages, among them:
- They provide loosely coupled solutions: reactive streams are only coupled to events that they directly depend on.
- Avoiding unnecessary computations, which translates into optimal react updates.
- Improving code navigability, by avoiding unnecessary layers of indirection.
- If we compare them with Flux based architectures, they generate a lot less boilerplate.
- By avoiding central stores we get code-splitting out of the box.
