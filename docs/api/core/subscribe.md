---
title: <Subscribe />
---

A React Component that creates a subscription to the provided observable once
the component mounts, and unsubscribes when the component unmounts.

Properties:

- `source$`: Source observable that the Component will subscribe to.
- `children`: (Optional) children to display after it has subscribed.
- `fallback`: (Optional) children to display while it hasn't subscribed.
