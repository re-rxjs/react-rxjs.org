---
title: Todo App
---

:::info Note
This tutorial assumes you have gone through the [Github Issues Viewer](/docs/tutorial/github-issues) 
tutorial, and that you are already familiar with both [RxJS](https://rxjs.dev) and [React](https://reactjs.org).
:::

The purpose of the tutorial is to introduce the most important APIs of the
`@react-rxjs/utils` package, and for that we are going to build a simple todo-list
application. Our app will be able to do the following:

- Add todo items
- Edit todo items
- Delete todo items
- Filter todo items
- Display useful stats

## Capturing user input

The first thing that we should do is to capture the events triggered by the user.
Let's create a few `Subject`s for this. Also, it's probably best if our presentational
components don't know about the existence of these Subjects. So we will also create
a set of functions that capture the user-evens and push then into the Subjects:

```tsx
import { Subject } from "rxjs"

const newTodo$ = new Subject<string>()
export const onNewTodo = (text: string) => text && newTodo$.next(text)

const editTodo$ = new Subject<{ id: number; text: string }>()
export const onEditTodo = (id: number, text: string) =>
  editTodo$.next({ id, text })

const toggleTodo$ = new Subject<number>()
export const onToggleTodo = (id: number) => toggleTodo$.next(id)

const deleteTodo$ = new Subject<number>()
export const onDeleteTodo = (id: number) => deleteTodo$.next(id)
```

## Creating a single stream for all the user events

It would be very convenient to have a merged stream with all those events. However,
if we did a traditional `merge`, then it would be very challenging to know the
origin of each event.

That's why `@react-rxjs/utils` exposes the [`mergeWithKey`](../api/utils/mergeWithKey)
operator. Let's use it:

```tsx
const todoActions$ = mergeWithKey({
  add: newTodo$.pipe(map((text, id) => ({ id, text }))),
  edit: editTodo$,
  toggle: toggleTodo$.pipe(map(id => ({ id }))),
  delete: deleteTodo$.pipe(map(id => ({ id })))
})
```

Which is basically the same as doing this (but a lot shorter, of course :smile:):

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

Now that we have put all the streams together, let's create a stream for
each todo. And for that, we will be using another operator from `@react-rxjs/utils`:
the [`split`](../api/utils/split) operator: 

```ts
type Todo = { id: number, text: string, done: boolean }

const todos$: Observable<GroupedObservable<number, Todo>> = todoActions$.pipe(
  split(
    event => event.payload.id,
    (event$, id) => event$.pipe(
      takeWhile(event => event.type !== 'delete'),
      scan(
        (state, action) => {
          switch (action.type) {
            case "add":
            case "edit":
              return { ...state, text: action.payload.text }
            case "toggle":
              return { ...state, done: !state.done}
            default:
              return state
          }
        },
        { id, text: "", done: false } as Todo
      )
    )
  )
)
```

As you can see `split` is very similar to the `groupBy` operator that's exposed
from RxJS. However, there are some important differences:

- The first difference is that `split` doesn't have a "duration selector" argument
for determining the duration of an inner stream. Once an inner stream completes, `split`
will forget about it, meaning that it will remove it from its internal cache.
Therefore, if afterwords the source emits a value with the same key, then `split`
will create (and emit) a new `GroupedObservable`.

- Another important difference is the second argument of `split`, which allows you
to create a complex inner stream that will become the "grouped" stream that is emitted.

- Also, this returned stream is enhanced with a `shareReplay(1)`, and `split` internally
subscribes to it as soon as it is created to ensure that the consumer always has the
latest value.

## Collecting the GroupedObservables

Our `todos$` variable is an `Observable` of `GroupedObservables<number, Todo>` and
that in itself is not very useful. It would be a lot more convenient to have an `Observable`
of `Map<number, Todo>`. Which is exactly what the [`collectValues`](../api/utils/collectValues)
operator is for. Let's try it:

```ts
const todosMap$: Observable<Map<number, Todo>> = todos$.pipe(collectValues())
```

And with this we are ready to start wiring things up.

## Wiring up a basic version

Let's start with the top-level component:

```tsx
const [useTodos] = bind(todosMap$.pipe(map(todosMap => [...todosMap.values()])))

function TodoList() {
  const todoList = useTodos()

  return (
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}
```

Next, let's implement the `TodoItemCreator`:

```tsx
function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    onNewTodo(inputValue);
    setInputValue('');
  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}
```

And finally, the `TodoItem` component:

```tsx
function TodoItem({item}) {
  const editItemText = ({target: {value}}) => {
    onEditTodo(item.id, value)
  }

  const toggleItemCompletion = () => {
    onToggleTodo(item.id)
  }

  const deleteItem = () => {
    onDeleteTodo(item.id)
  }

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.done}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  )
}
```

That's it! We've already got the basic version working. Now let's add the filters and
the stats.

## Adding filters

As we already know, we will need to capture the filter selected by the user:

```ts
export enum FilterType {
  All = "all",
  Done = "done",
  Pending = "pending"
}
const selectedFilter$ = new Subject<FilterType>()
export const onSelectFilter = (type: FilterType) => {
  selectedFilter$.next(type)
}
```

Next, let's create a hook and a stream for the current filter:

```ts
const [useCurrentFilter, currentFilter$] = bind(
  selectedFilter$.pipe(startWith(FilterType.All))
)
```

Also, let's make sure that our `useTodos` hook takes this into account:

```ts
const todosList$ = todosMap$.pipe(
  map(todosMap => [...todosMap.values()]),
  shareLatest(), // We are using shareLatest because the stats will also consume it
)

const [useTodos] = bind(
  combineLatest(todosList$, currentFilter$).pipe(
    map(([todos, currentFilter]) => {
      if (currentFilter === FilterType.All) {
        return todos
      }

      const isDone = currentFilter === FilterType.Done
      return todos.filter(todo => todo.done === isDone)
    })
  )
)
```

Time to implement the `TodoListFilters` component:

```tsx
function TodoListFilters() {
  const filter = useCurrentFilter()

  const updateFilter = ({target: {value}}) => {
    onSelectFilter(value)
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value={FilterType.All}>All</option>
        <option value={FilterType.Done}>Completed</option>
        <option value={FilterType.Pending}>Uncompleted</option>
      </select>
    </>
  );
}
```

## Adding stats

We will be showing the following stats:

- Total number of todo items
- Total number of completed items
- Total number of uncompleted items
- Percentage of items completed

Let's create a `useTodosStats` for it:

```ts
const [useTodosStats] = bind(
  todosList$.pipe(map(todosList => {
    const nTotal = todosList.length
    const nCompleted = todosList.filter((item) => item.done).length
    const nUncompleted = nTotal - nCompleted
    const percentCompleted = 
      nTotal === 0 ? 0 : Math.round((nCompleted / nTotal) * 100)

    return {
      nTotal,
      nCompleted,
      nUncompleted,
      percentCompleted,
    }
  }))
)
```

And now let's use this hook in the `TodoListStats` component:

```tsx
function TodoListStats() {
  const { nTotal, nCompleted, nUncompleted, percentCompleted } = useTodosStats()

  return (
    <ul>
      <li>Total items: {nTotal}</li>
      <li>Items completed: {nCompleted}</li>
      <li>Items not completed: {nUncompleted}</li>
      <li>Percent completed: {percentCompleted}</li>
    </ul>
  );
}
```

## Summary

The result of this tutorial can be seen in this CodeSandbox:

<iframe src="https://codesandbox.io/embed/react-rxjs-basic-todos-6xdwu?fontsize=14&hidenavigation=1&theme=dark&view=editor&module=%2Fsrc%2Fstate.ts"
     style={{ width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden' }}
     title="react-rxjs-github-issues-example"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
