---
title: Getting Started
---

import CharacterCounter from "./examples/CharacterCounter"

## Installation

React-RxJS is published in npm as `@react-rxjs/core`

```sh
npm i rxjs @react-rxjs/core
```

or using yarn

```sh
yarn add rxjs @react-rxjs/core
```

## Create a hook from an observable

`@react-rxjs/core` exports a function called `bind` which is used to connect a stream to a hook.

```tsx
import { Subject } from "rxjs"
import { startWith } from "rxjs/operators"
import { bind } from "@react-rxjs/core"

const textSubject = new Subject()
const setText = (newText) => textSubject.next(newText)
const [useText, text$] = bind(textSubject.pipe(startWith("")))

function TextInput() {
  const text = useText()

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      Echo: {text}
    </div>
  )
}
```

`bind` returns a tuple that contains the hook, plus the underlying shared observable so it can be used by other streams:

```tsx
import { pluck } from "rxjs/operators"
import { bind } from "@react-rxjs/core"

// Previously...
// const [useText, text$] = bind(...);

const [useCharCount] = bind(text$.pipe(pluck("length")))

function CharacterCount() {
  const count = useCharCount()

  return <>Character Count: {count}</>
}
```

If we put everything together

```tsx
function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  )
}
```

This is shown as:

<CharacterCounter />

## Next steps

We strongly recommend reading through [core concepts](core-concepts.md) to
understand the mindset of this library.
