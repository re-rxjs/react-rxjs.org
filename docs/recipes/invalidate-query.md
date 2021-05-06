---
title: Invalidate Query
---

import InvalidateQuery from "../examples/InvalidateQuery"
import BrowserOnly from '@docusaurus/BrowserOnly';

```tsx
import { bind, Subscribe } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"
import { concat, defer } from "rxjs"
import { concatMap, switchMap } from "rxjs/operators"
import { getTodos, postTodo } from "../my-api"

const [todoPost$, addTodo] = createSignal<string>()

const todoResult$ = todoPost$.pipe(
  concatMap(postTodo)
)

const [useTodos] = bind(
  // When do we need to request todos?
  concat(
    // 1. One single time when starting
    defer(getTodos),
    // 2. Every time we have created a new todo
    todoResult$.pipe(
      switchMap(getTodos)
    )
  ),
  []
)

function Todos() {
  const todos = useTodos()

  const ref = useRef<HTMLInputElement>()
  const handleAddClick = () => {
    addTodo(ref.current!.value)
    ref.current!.value = ""
    ref.current!.focus()
  }

  return (
    <div>
      <input type="text" defaultValue="Do Laundry" ref={ref} />
      <button onClick={handleAddClick}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return (
    <Subscribe>
      <Todos />
    </Subscribe>
  )
}
```

### Interactive result

<BrowserOnly>
  {() => <InvalidateQuery />}
</BrowserOnly>
