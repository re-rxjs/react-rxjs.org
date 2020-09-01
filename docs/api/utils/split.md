---
id: split
title: split()
sidebar_label: split()
---

A RxJS operator that groups the items emitted by the source based on the
keySelector function, emitting one Observable for each group.

### Arguments

- `keySelector`: A function that receives an item and returns the key of that
  item's group.
- `streamSelector`: (optional) The function to apply to each group observable
  (default = identity).

`split` will subscribe to each group observable and share the result to every
inner subscriber of that group. This inner observable can be mapped to another
observable through the `streamSelector` argument.