import { Value } from './value';

/**
 * ways to think about this:
 * - drips in the pipe
 */

export class Transaction {
  step: number;
  debit: Value;
  credit: Value;

  /** take the debit, take it's quantity, muplipy by this to get
   *  the quantity of the credit value.
   */
  coefficient: number;

  // something about how this has to settle...
  // can't create or destroy value here.
  // at a given step this all has to add up
}
