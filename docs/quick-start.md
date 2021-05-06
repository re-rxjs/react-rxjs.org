---
title: Quick Start
---

import CharacterCounter from "./examples/CharacterCounter"
import BrowserOnly from '@docusaurus/BrowserOnly';

## Installation

React-RxJS is published in npm as `@react-rxjs/core`.
We also publish a recommended `@react-rxjs/utils` package with some useful functions to build reactive state streams.

```sh
npm i rxjs @react-rxjs/core @react-rxjs/utils
```

or using yarn

```sh
yarn add rxjs @react-rxjs/core @react-rxjs/utils
```

## Usage

```tsx
import { map } from "rxjs/operators"
import { bind, Subscribe } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"

// A signal is an entry point to react-rxjs. It's equivalent to using a subject
const [textChange$, setText] = createSignal();

// bind returns a hook to get the value of the observable.
const [useText, text$] = bind(textChange$, "")

// And it also returns an observable so we can compose this state with other observables
// in here we're making a derived state by calculating the text$'s length.
const [useCharCount, charCount$] = bind(
  text$.pipe(
    map((text) => text.length)
  )
)

function TextInput() {
  // Just use the hook!
  const text = useText()

  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder="Type something..."
        onChange={
          // And trigger the signal
          (e) => setText(e.target.value)
        }
      />
      <br />
      Echo: {text}
    </div>
  )
}

function CharacterCount() {
  const count = useCharCount()

  return <>Character Count: {count}</>
}

function CharacterCounter() {
  // `Subscribe` manages the subscription lifetime of its children
  return (
    <Subscribe>
      <TextInput />
      <CharacterCount />
    </Subscribe>
  )
}
```

The interactive result:

<BrowserOnly>
  {() => <CharacterCounter />}
</BrowserOnly>

## There's more!

This is just a simple example of two components sharing a synchronous state.

React-RxJS gets even more fun when you start using asynchronous state, leveraging Suspense and enhancing code-splitting!