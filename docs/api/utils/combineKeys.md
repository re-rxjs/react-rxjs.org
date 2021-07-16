---
title: combineKeys()
sidebar_label: combineKeys()
---

Creates a stream that constructs a Map with the latest value of the inner stream
of each key.

```ts
export const combineKeys = <K, T>(
  keys$: Observable<Array<K> | Set<K>>,
  getInner$: (key: K) => Observable<T>,
): Observable<Map<K, T>>
```

#### Arguments

- `keys$`: Stream of the list of keys to subscribe to.
- `getInner$`: Function that returns the stream for each key.

#### Returns

A stream with a map containing the latest value from the stream of each key.

### Examples

You're typically going to call this after `partitionByKey()`:

```ts
const [getByKey, keys$] = partitionByKey(source$, x => x.key);
const combined$ = combineKeys(keys$, getByKey);
```

Here it is in action, picking up from the [`partitionByKey()`](partitionByKey)
example. You have a stream representing the list of pets, you have a function
that returns the stream associated with each pet, and now combineKeys() gives
you a stream that emits a map of this whole data structure whenever any of it
changes. If you're careful about where you bind these you can save a lot of
component updates:

```ts
interface Pet {
  id: number;
  pet: string,
  pos: number;
}

const petNames = ["Fluffy", "Bella", "Nala", "Nocturne", "Teddy"];

let [petRace$, petRaceDispatch] = createSignal<Pet>();

petRace$ = petRace$.pipe(startWith(
  ...petNames.map((pet, id): Pet => ({pet, id, pos: 1})),
));

const [petByID, pets$] = partitionByKey(petRace$, x => x.id)
const keyMap$ = combineKeys(pets$, petByID);

const leadingPet$ = keyMap$.pipe(map(x => // map to pet with highest pos
  Array.from(x.entries())
    .sort(([k1,v1], [k2,v2]) => v2.pos - v1.pos)[0][1]
));

const advancingPet$: Observable<Pet> = interval(1000).pipe(
  withLatestFrom(keyMap$),
  map(([_, x]) => x),
  takeWhile(x => {
    for (let [k,v] of x) {
      if (v.pos == 20) return false  // win condition
    }
    return true;
  }),
  map((x: Map<number, Pet>) =>
    x.get(Math.floor(Math.random() * x.size)) as Pet),
  map(pet => ({...pet, pos: pet.pos + 1})),  // increment position
  tap(petRaceDispatch),
);

const [usePetIDs] = bind(pets$);
const [usePetByID] = bind((petId:number) => petByID(petId));
const [useLeader] = bind(leadingPet$, null);
const [useAdvancingPet] = bind(advancingPet$, null);
```

## See also

- [`partitionByKey()`](partitionByKey)
