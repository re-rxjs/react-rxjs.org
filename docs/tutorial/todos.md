---
title: Todos
---

This section assumes you have installed `@react-rxjs/core` and React.
See the [Getting Started](/docs/getting-started) page for how to get started with
React-RxJS. Also, it's probably a good idea to have a look at the [Core Concepts](/docs/core-concepts)
page before starting this tutorial.

In this tutorial, we'll be building a simple todo-list application. Our app will
be able to do the following:

- Add todo items
- Edit todo items
- Delete todo items
- Filter todo items
- Display useful stats

Along the way, we'll also introduce the `@react-rxjs/utils` package, which is a set
of handful utilities that can come very handy when creating react apps.

## Capturing user input

The first thing that we have to do is to capture the input from the user (yes,
users are also producers of events!). Let's create some `Subject`s for this, and
some functions that wrap the subjects, which we can use from our components:

```tsx
import { Subject } from "rxjs"

const newTodo$ = new Subject<string>()
export const onNewTodo = (text: string) => text && newTodo.next(text)

const editTodo$ = new Subject<{ id: number; text: string }>()
export const onEditTodo = (id: number, text: string) =>
  editTodo$.next({ id, text })

const toggleTodo$ = new Subject<number>()
export const onToggleTodo = (id: number) => toggleTodo$.next(id)

const deleteTodo$ = new Subject<number>()
export const onDeleteTodo = (id: number) => deleteTodo.next(id)
```

## Creating a stream for all the events

It would be very convenient to have a merged stream with all those events. However,
if we did a traditional `merge`, then it would be very challenging to know where
each event came from.

That's why we expose the [`mergeWithKey`](../api/utils/mergeWithKey) operator from the
`@react-rxjs/utils` package. Let's use it:

```tsx
const todoActions$ = mergeWithKey({
  add: newTodo$.pipe(map(text, id) => ({ id, text })),
  edit: editTodo$,
  toggle: toggleTodo$.pipe(map(id => ({ id }))),
  delete: deleteTodo$.pipe(map(id => ({ id })))
})
```

Which is the equivalent of doing this:

```tsx
const todoActions$ = merge(
  newTodo$.pipe(map(text, id) => ({
    type: "add" as const
    payload: { id, text },
  })),
  editTodo$.pipe(map(payload => ({
    type: "edit" as const,
    payload,
  }))),
  toggleTodo$.pipe(map(id => ({
    type: "toggle" as const,
    payload: { id },
  }))),
  deleteTodo$.pipe(map(id => ({
    type: "delete" as const,
    payload: { id },
  }))),
)
```

## Creating a stream for each todo

Now that we have a stream for all the events, let's create a stream for
each todo. We will be using another operator from `@react-rxjs/utils` for that,
the [`split` operator](../api/utils/split) operator:

```ts
type Todo = { id: number, text: string, done: boolean }

const todos$: Observable<GroupedObservable<number, Todo>> = todoActions$.pipe(
  split(
    event => event.payload.id,
    (event$, id) => event.pipe(
      takeWhile(event => event.type !== 'delete'),
      scan(
        (state, action) => {
          switch (action.type) {
            case "add":
            case "edit":
              return { ...state, text: action.payload.text }
            case "toggle":
              return { ...state, done: !state.done},
            default:
              return state
          }
        },
        { id, text: "", done: false }
      )
    )
  )
)
```

# Collecting the GroupedObservables

`split` returns an Observable of GroupedObservables. However, it would be a lot
more convenient to have an Observable of a `Map<number, Todo>`, and that's
exactly what the `collectValues` operator does:

```ts
const todosMap$: Observable<Map<number, Todo>> = todos$.pipe(collectValues())
```
