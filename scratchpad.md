## 1/31/21

figuring out the runtime a little bit today

- sim is an iterator of step arrays

```
Simulation
  step -> step -> step -> step, ...
  step -> step -> step -> step, ...
  step -> step -> step -> step, ...
  step -> step -> step -> step, ...
  step -> step -> step -> step, ...
  step -> step -> step -> step, ...
  step -> step -> step -> step, ...
```

sim can index by step no if it wants

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
