import { GrowthModel, GrowthModelPlan } from './growth-model';

export type HoldingConfiguration = (holding: Holding) => Holding;

/**
 * `Holding`s represents assets and liabilities. They can
 * grow on their own (in positive and negative ways).
 * They can also be contributed to or taken from through `Pipe`
 * instances. Another way to say this is that Holdings are
 * nodes and `Pipe`s are edges
 */
export class Holding {
  startStep = 0;
  max = Infinity;
  min = -Infinity;
  baseValue = 0;
  growthModel?: GrowthModel;

  private constructor() {}

  /**
   * Create and configure a Holding.
   *
   * Here's an example of $5000 in a 3% CD account
   * ```typescript
   * Holding.create((holding) =>
   *  holding
   *   .setBounds(0)
   *   .setBaseValue(5 000)
   *   .grow(
   *    (plan) => plan.distribution(new ConstantDistribution(0.03))
   *   )
   * )
   * ```
   */
  public static create(configure: HoldingConfiguration): Holding {
    const holding = new Holding();
    return configure(holding);
  }

  public setBounds(min: number, max = Infinity): Holding {
    return this.change({
      min,
      max,
    });
  }

  public setBaseValue(base: number) {
    return this.change({
      baseValue: base,
    });
  }

  public grow(
    configureGrowth: (plan: GrowthModelPlan) => GrowthModelPlan
  ): Holding {
    const plan = new GrowthModelPlan();
    const model = GrowthModelPlan.buildGrowthModelPlan(configureGrowth(plan));
    return this.change({
      growthModel: model,
    });
  }

  private change(mutations: Partial<Holding>): Holding {
    const newHolding = new Holding();
    Object.assign(newHolding, this, mutations);
    return newHolding;
  }
}
