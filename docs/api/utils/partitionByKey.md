---
title: partitionByKey()
sidebar_label: partitionByKey()
---

Groups the elements from the source stream by using a key selector, and maps
each of these groups by using a map function.

```ts
export function partitionByKey<T, K, R>(
  stream: Observable<T>,
  keySelector: (value: T) => K,
  streamSelector: (grouped: Observable<T>, key: K) => Observable<R>,
): [(key: K) => GroupedObservable<K, R>, Observable<KeyChanges<K>>]

interface KeyChanges<K> {
  type: "add" | "remove"
  keys: Iterable<K>
}
```

#### Arguments

- `stream`: Input stream
- `keySelector`: Function that specifies the key for each element in `stream`
- `streamSelector`: Function to apply to each resulting group

#### Returns

`[1, 2]`:

1. A function that accepts a key and returns a stream for the group of that key.

2. A stream of KeyChanges, an object the describes what keys have been added or deleted.

### Examples

```ts
const source = interval(1000);
const [getGroupByKey, keyChanges$] = partitionByKey(
  source,
  x => x % 2 == 0 ? "even" : "odd",
  (groupedObservable$, key) => groupedObservable$.pipe(map(x => `${x} is ${key}`))
);

const [useEven, even$] = bind(getGroupByKey("even"));
const [useOdd, odd$] = bind(getGroupByKey("odd"));
const [useKeys] = bind(
  keys$.pipe(
    toKeySet(),
    map(keySet => Array.from(keySet))
  )
);

function MyComponent() {
  const odd = useOdd();
  const even = useEven();
  const keys = useKeys();

  return (
    <>
      <div>Your keys are: {keys.join(", ")}</div>
      <div>{odd}</div>
      <div>{even}</div>
    </>
  );
}
```

A more typical list example. The list component can bind the list of keys
while the item component binds the stream for each item, eliminating
unnecessary renders:

```tsx
interface Pet {
  id: number;
  pet: string,
  pos?: number;
}

const petNames = ["Fluffy", "Bella", "Nala", "Nocturne", "Teddy"]
               .map((pet, id): Pet => ({pet, id}));

const [petUpdate$, updatePet] = createSignal<Pet>();

// Let's line up our pets
const petRace$ = merge(of(...petNames), petUpdate$);

const [petByID, petIdChange$] = partitionByKey(
  petRace$,
  x => x.id,
)

const [usePetByID] = bind((id: number) => petByID(id));
const [usePetIDs] = bind(petIdChange$.pipe(
  toKeySet(),
  map(keySet => Array.from(keySet))
));

const PetItem = ({petID}: {petID: number}) => {
  const pet = usePetByID(petID);

  return (
    <li>
      <div style={{width:'100%', textAlign:'right'}}>
        {pet.pet}
      </div>
      <br />
      <div style={{textAlign:'left'}}>
        {'*'.repeat(pet.pos || 1)}
      </div>
    </li>
  );
}

const PetList = () => {
  const petIDs = usePetIDs();

  return (<ul>{petIDs.map(x => (<PetItem key={x} petID={x} />))}</ul>);
}
```


## See also

- [`combineKeys()`](combineKeys)
- [`toKeySet()`](toKeySet)
