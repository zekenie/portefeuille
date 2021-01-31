import { Transaction } from './transaction';

/**
 * this is kind of like a linked list node
 * it represents a buy of some asset, and a sell
 * it has a pointer to where it came from (through transaction)
 * it also has a pointer to where it went
 *
 * values are never destroyed, they just enter a sold state.
 * if i buy a security, my bank value objects get into a "sold"
 * state. And i have a new value object created in the security
 * holding.
 */
export class Value {
  quantity: number;
  holdingLabel: string;
  fromTransaction: Transaction;
  toTransaction?: Transaction;
}
