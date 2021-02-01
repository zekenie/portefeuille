import { Transaction } from './transaction';
import { Value } from './value';

export type StepConfiguration = (holding: Step) => Step;

export class Step {
  next?: Step;
  prev?: Step;
  transactions: Transaction[];
  values: { [holdingPath: string]: Value[] };
  coefficients: { [holdingPath: string]: number };

  setNext(step: Step) {
    this.next = step;
    return this;
  }

  setPrev(step: Step) {
    this.prev = step;
    return this;
  }

  public static create(conf: StepConfiguration) {
    const step = new Step();
    return conf(step);
  }
}
