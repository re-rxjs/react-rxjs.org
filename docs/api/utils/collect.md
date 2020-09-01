---
id: collect
title: collect()
sidebar_label: collect()
---

A pipeable operator that collects all the GroupedObservables emitted by
the source and emits a Map with the active inner observables.

### Arguments

- `filter?`: A function that receives the inner Observable and returns an
  Observable of boolean values, which indicates whether the inner observable
  should be collected.