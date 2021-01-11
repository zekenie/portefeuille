import test from 'ava';
import * as stats from 'simple-statistics';
import wu from 'wu';

import * as distribution from './distribution';

test('normal distribution simulation averages the mean with correct stddev', (t) => {
  const d = new distribution.NormalDistribution(5, 1);
  const numbers = wu.take(250, d).toArray();
  const mean = stats.mean(numbers);
  const stddev = stats.standardDeviation(numbers);
  t.truthy(mean > 4.5);
  t.truthy(mean < 5.5);

  t.truthy(stddev > 0.85);
  t.truthy(stddev < 1.15);
});

test('constant distributions always return the same number', (t) => {
  const d = new distribution.ConstantDistribution(5);
  t.true(wu.take(10, d).every((n) => n === 5));
});

test('combined distributions combine others and present them with correct coefficients', (t) => {
  const d = new distribution.CombinedDistribution()
    .add(new distribution.NormalDistribution(10, 1), 1)
    .add(new distribution.NormalDistribution(0, 1), 3);
  const numbers = wu.take(350, d).toArray();
  const mean = stats.mean(numbers);
  t.truthy(mean > 2);
  t.truthy(mean < 3.1);
});
