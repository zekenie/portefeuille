import test from 'ava';

import { Holding } from './holding';

test('bounds can be set', (t) => {
  const holding = Holding.create((holding) => holding.setBounds(0, 15));

  t.is(holding.min, 0);
  t.is(holding.max, 15);
});

test('base value can be set', (t) => {
  const holding = Holding.create((holding) => holding.setBaseValue(100));

  t.is(holding.baseValue, 100);
});

test('holdings are immutable', (t) => {
  Holding.create((holding) => {
    const h1 = holding.setBaseValue(100);

    const h2 = holding.setBounds(14, 15);
    t.not(h1, h2);
    return holding;
  });
});
