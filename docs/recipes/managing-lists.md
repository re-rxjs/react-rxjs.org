---
title: Managing lists
---

import CodeSandbox from "./CodeSandbox"

These recipes cover a good way of optimally rendering lists by using React-RxJS. Only the instances that have updated will rerender.

These recipes mainly show an example of how to use [partitionByKey](api/utils/partitionByKey.md) together with [combineKeys](api/utils/combineKeys.md)

## Simple

We'll start by getting a list of stocks with the latest price from each one of them, and rendering them as they update.

<CodeSandbox id="managing-lists-simple-cvwyu" />

## Medium

Now let's imagine we need to calculate an aggregate value from all instances. In this case, we want to calculate a market index based on the price and the volume for each stock.

To do that, we don't need to change much: We can calculate the contribution for the index from each stock in `partitionByKey`, and we can use `combineKeys` to sum all of them up.

<CodeSandbox id="managing-lists-vwz8l" />

## Advanced

Let's consider instead that we want the user to subscribe or unsubscribe from stocks, so that we can add a bit of interactivity.

`partitionByKey` keeps each instance alive until the inner observable completes. This example shows how to use it so we can remove stocks when the user presses on the button.

<CodeSandbox id="managing-lists-advanced-vf8y8" />
