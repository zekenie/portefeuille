## 1/31/21

figuring out the runtime a little bit today

- multiverse is an iterator lifetimes
- lifetime is an iterator of steps

```
Multiverse
  lifetime: step -> step -> step -> step, ...
  lifetime: step -> step -> step -> step, ...
  lifetime: step -> step -> step -> step, ...
  lifetime: step -> step -> step -> step, ...
  lifetime: step -> step -> step -> step, ...
  lifetime: step -> step -> step -> step, ...
  lifetime: step -> step -> step -> step, ...
```

multiverse can index by step no if it wants (what was going on for everyone at step 5). This is particularly true for classifications

A step obj represents a current state of holdings. It also has a set of transactions

```
type Step = {
  next?: Step;
  transactionsForNextStep?: Transaction[];
  // these are immutible. If you hold a value for 2 steps, it is the same obj
  values: {
    [holdingPath: string]: Value[]
  }
  coefficients: {
    [holdingPath: string]: number
  }
}
```

`Transaction` objects represent an exchange. Something is lost in one holding, gained in another.
