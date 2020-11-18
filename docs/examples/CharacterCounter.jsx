import React from "react"
import { Subject } from "rxjs"
import { map, startWith } from "rxjs/operators"
import { bind, Subscribe } from "@react-rxjs/core"

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

const [useCharCount, charCount$] = bind(text$.pipe(map((text) => text.length)))

function CharacterCount() {
  const count = useCharCount()

  return <>Character Count: {count}</>
}

export default function CharacterCounter() {
  return (
    <div>
      <Subscribe source$={charCount$}>
        <TextInput />
        <CharacterCount />
      </Subscribe>
    </div>
  )
}
