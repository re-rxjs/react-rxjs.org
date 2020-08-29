---
id: motivation
title: Motivation
sidebar_label: Motivation
---

React is not Reactive. [Richard Harris](https://twitter.com/Rich_Harris) does a
great job at explaining that in his talk [Rethinking Reactivity](https://www.youtube.com/watch?v=AdNJ3fydeao).
In that talk he borrows the following quote from [Heinrich Apfelmus](https://apfelmus.nfshost.com/),
which brilliantly defines the essence of functional reactive programming:

> The essence of functional reactive programming is to specify the dynamic
behavior of a value completely at the time of declaration

Our goal is to bring the essence of reactive programming into React. We do that by
enabling a state management system based on RxJS streams. No stores. No context.
Just reactive streams that integrate seamlessly with React.

Working with Reactive solutions has many advantages, among them:
- They provide loosely coupled solutions: reactive streams are only coupled to those
streams that they directly depend on.
- Avoiding unnecessary computations, which translates into optimal react updates.
- Improving code navigability, by avoiding unnecessary layers of indirection.
- If we compare them with Flux based architectures, they generate a lot less boilerplate.
- By avoiding central stores we get code-splitting out of the box.
