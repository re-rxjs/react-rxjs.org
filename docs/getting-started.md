---
title: Getting Started
---

import CharacterCounter from "./examples/CharacterCounter"
import BrowserOnly from '@docusaurus/BrowserOnly';

## Installation

React-RxJS is published in npm as `@react-rxjs/core`

```sh
npm i rxjs @react-rxjs/core @react-rxjs/utils
```

or using yarn

```sh
yarn add rxjs @react-rxjs/core @react-rxjs/utils
```

## Create a hook from an observable

`@react-rxjs/core` exports a function called `bind` which is used to connect a stream to a hook.

```tsx
import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"

// A signal is an entry point to react-rxjs. It's equivalent to using a subject
const [textChange$, setText] = createSignal();

const [useText, text$] = bind(textChange$, "")

function TextInput() {
  const text = useText()

  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder="Type something..."
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
import { map } from "rxjs/operators"
import { bind, Subscribe } from "@react-rxjs/core"

// Previously...
// const [useText, text$] = bind(...);

const [useCharCount, charCount$] = bind(
  text$.pipe(
    map((text) => text.length)
  )
)

function CharacterCount() {
  const count = useCharCount()

  return <>Character Count: {count}</>
}
```

Something to note is that a subscription on the underlying observable must be present before the hook is executed. We can use `Subscribe` to help us with it:

```tsx
function CharacterCounter() {
  return (
    <div>
      <Subscribe>
        <TextInput />
        <CharacterCount />
      </Subscribe>
    </div>
  )
}
```

The interactive result:

<BrowserOnly>
  {() => <CharacterCounter />}
</BrowserOnly>

## Next steps

We strongly recommend reading through [core concepts](core-concepts.md) to
understand the mindset of this library.
