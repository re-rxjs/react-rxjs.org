import React from "react"
import { map } from "rxjs/operators"
import { bind, Subscribe } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"

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

const [useCharCount, charCount$] = bind(text$.pipe(map((text) => text.length)))

function CharacterCount() {
  const count = useCharCount()

  return <>Character Count: {count}</>
}

export default function CharacterCounter() {
  return (
    <div>
      <Subscribe>
        <TextInput />
        <CharacterCount />
      </Subscribe>
    </div>
  )
}
