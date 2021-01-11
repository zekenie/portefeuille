import test from 'ava';

import { ConstantDistribution } from './distribution';
import { GrowthModelPlan } from './growth-model';

test('predictable constant distribution', (t) => {
  const plan = new GrowthModelPlan().distribution(new ConstantDistribution(5));

  const model = GrowthModelPlan.buildGrowthModelPlan(plan);

  t.is(model({ previous: 10, step: 4 }), 5);
});

test('supports multiple distributions at different times', (t) => {
  const plan = new GrowthModelPlan()
    .distribution(
      new ConstantDistribution(5),
      (timestamp) => timestamp.step < 5
    )
    .distribution(
      new ConstantDistribution(10),
      (timestamp) => timestamp.step >= 5
    );

  const model = GrowthModelPlan.buildGrowthModelPlan(plan);

  t.is(model({ previous: 10, step: 4 }), 5);
  t.is(model({ previous: 10, step: 9 }), 10);
});
