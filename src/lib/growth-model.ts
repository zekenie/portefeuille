import { Distribution } from './distribution';

export type Timestamp = { previous: number; step: number };

export type GrowthModel = (timestamp: Timestamp) => number;
type TimeConstraint = (timestamp: Timestamp) => boolean;

const always: TimeConstraint = () => true;

export class GrowthModelPlan {
  models: {
    distribution: Distribution;
    when: TimeConstraint;
  }[] = [];

  public distribution(
    distribution: Distribution,
    when: TimeConstraint = always
  ): GrowthModelPlan {
    this.models.push({ distribution, when });
    return this;
  }

  static buildGrowthModelPlan(plan: GrowthModelPlan): GrowthModel {
    return (timestamp: Timestamp): number => {
      const firstMatchingModel = plan.models.find((model) =>
        model.when(timestamp)
      );
      return firstMatchingModel.distribution.generateNumber();
    };
  }
}
