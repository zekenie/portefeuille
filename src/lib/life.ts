import { Holding, HoldingConfiguration } from './holding';

export class Life {
  private holdings: { [path: string]: Holding };

  public addHolding(path: string, conf: HoldingConfiguration): Life {
    const holding = Holding.create(conf);
    this.holdings[path] = holding;
    return this;
  }
}

/**
 * ideas:
 * - tick function with api to like.... determine outcomes, set context
 * - runtime classes
 * - transaction class...
 *    - debit
 *    - credit
 * - value class
 *    - type
 *    - real cost
 *    - initial real cost
 *    - might be able to look like florecent zibra fish... trace value around???
 * - holding configurable about when to reject transaction from pipe
 * - pipe compiles to function
 */
