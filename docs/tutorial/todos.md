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

The first thing that we should do is to capture the events triggered by the
user. Let's create some Signals for this:

```tsx
const [newTodo$, onNewTodo] = createSignal<string>();
const [editTodo$, onEditTodo] = createSignal<{ id: number; text: string }>();
const [toggleTodo$, onToggleTodo] = createSignal<number>();
const [deleteTodo$, onDeleteTodo] = createSignal<number>();
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
the [`partitionByKey`](../api/utils/partitionByKey) operator: 

```ts
type Todo = { id: number; text: string; done: boolean };
const [todosMap, keys$] = partitionByKey(
  todoActions$,
  event => event.payload.id,
  (event$, id) =>
    event$.pipe(
      takeWhile((event) => event.type !== "delete"),
      scan(
        (state, action) => {
          switch (action.type) {
            case "add":
            case "edit":
              return { ...state, text: action.payload.text };
            case "toggle":
              return { ...state, done: !state.done };
            default:
              return state;
          }
        },
        { id, text: "", done: false } as Todo
      )
    )
)
```

Now we have a function, `todosMap`, that returns an Observable of events
associated with a given todo. `partitionByKey` transforms the source observable in a way
similar to the `groupBy` operator that's exposed from RxJS. However, there are
some important differences:

- `partitionByKey` gives you a function that returns an Observable, rather
  than an Observable that emits Observables. It also provides an Observable
  that emits the list of keys, whenever that list changes (`keys$` in the code
  above).
- `partitionByKey` has an optional third parameter which allows you to create
  a complex inner stream that will become the "grouped" stream that is
  returned.
- This returned stream is enhanced with a
  [`shareLatest`](../api/utils/shareLatest) and `partitionByKey` internally
  subscribes to it as soon as it is created to ensure that the consumer always
  has the latest value.

## Collecting the GroupedObservables

We now have a way of getting streams for each todo, and we have a stream
(`keys$`) that represents the list of todos by their ids and emits whenever
one is added or deleted. We should also like a stream that emits whenever
the state of any todo changes, and gives us access to all of them.
[`combineKeys()`](../api/utils/combineKeys) suits this purpose. Let's try it:

```ts
const todosMap$: Observable<Map<number, Todo>> = combineKeys(keys$, todosMap);
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

That's it! We have a basic version working.

## Cutting React out of the state management game

What we've done so far is pretty neat, but there are a lot of unnecessary
renders going on in our application. Editing any of the todos, for example,
causes the whole list to re-render. To those with experience in React
development, this hardly seems noteworthy—our state is our list of todos, it
lives in our TodoList component, so of course it re-renders when that state
changes. With React-RxJS, we can do better. Before we proceed with the
remaining features, let's relieve React of its state management
responsibilities altogether.

Take a look at the stream we've bound to the TodoList component:

```tsx
const [useTodos] = bind(todosMap$.pipe(map(todosMap => [...todosMap.values()])));
```

This is just an `Observable<Todo[]>`, and it will emit every time any todo
gets updated—triggering a TodoList render. In fact TodoList only needs to know
which todos to display; rendering them according to their properties can be
left up to the child component, TodoItem. Therefore let's bind a list of
_which_ todos exist. Luckily we already have a stream for that, returned above
by `partitionByKey`. So:

```tsx
const [useTodoIds] = bind(keys$);
```

Simple! Now we edit our TodoList component to pass just the todo id:

```diff
 function TodoList() {
-  const todoList = useTodos();
+  const todoIds = useTodos();

   return (
     <>
       <TodoListStats />
       <TodoListFilters />
       <TodoItemCreator />
 
-      {todoList.map((todoItem) => (
-        <TodoItem key={todoItem.id} item={todoItem} />
-      ))}
+      {todoIds.map((id) => (
+      <TodoItem key={id} id={id} />
+      ))}
     </>
   );
 }
```

and teach TodoItem to get its state from the stream corresponding to that id,
rather than from its parent component:

```tsx
const TodoItem: React.FC<{ id: number }> = ({ id }) => {
  const item = useTodo(id);

  return( ... )
}
```

## Adding filters

As we already know, we will need to capture the filter selected by the user:

```ts
export enum FilterType {
  All = "all",
  Done = "done",
  Pending = "pending"
}
const [selectedFilter$, onSelectFilter] = createSignal<FilterType>()
```

Next, let's create a hook and a stream for the current filter:

```ts
const [useCurrentFilter, currentFilter$] = bind(
  selectedFilter$.pipe(startWith(FilterType.All))
)
```

Also, let's tell our TodoItems not to render if they've been filtered out:

```diff
 const TodoItem: React.FC<{ id: number }> = ({ id }) => {
   const item = useTodo(id);
+  const currentFilter = useCurrentFilter();
  
   return ( ... );
 }
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
