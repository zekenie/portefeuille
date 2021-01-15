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
 */
