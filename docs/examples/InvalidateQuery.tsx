import { bind, Subscribe } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"
import React, { useRef } from "react"
import { concat, defer } from "rxjs"
import { concatMap, switchMap } from "rxjs/operators"

const { getTodos, postTodo } = (() => {
  let todos = [
    {
      id: 0,
      title: "Grocery shopping",
    },
  ]

  return {
    getTodos: async () => todos,
    postTodo: async (todo) => {
      todos = [
        ...todos,
        {
          id: todos[todos.length - 1].id + 1,
          title: todo,
        },
      ]
    },
  }
})()

const [todoPost$, addTodo] = createSignal<string>()

const todoResult$ = todoPost$.pipe(concatMap(postTodo))

const [useTodos] = bind(
  // When do we need to request todos?
  concat(
    // 1. One single time when starting
    defer(getTodos),
    // 2. Every time we have created a new todo
    todoResult$.pipe(switchMap(getTodos)),
  ),
  [],
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

export default function InvalidateQuery() {
  return (
    <Subscribe fallback={<div>Loading...</div>}>
      <Todos />
    </Subscribe>
  )
}
