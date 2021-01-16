import test from 'ava';

import { Pipe } from './pipe';

test('wire', (t) => {
  const pipe = Pipe.create((pipe) => pipe.wire('/foo/bar', '/foo/baz'));

  t.is(pipe.fromPath, '/foo/bar');
  t.is(pipe.toPath, '/foo/baz');
});

test('faucets', (t) => {
  const pipe = Pipe.create((pipe) =>
    pipe
      .addFaucet((t) => (t.step > 5 ? 0 : 1))
      .addFaucet((t) => (t.step > 50 ? 2 : 1))
  );

  t.is(pipe.faucets.length, 2);
});

test('taps', (t) => {
  const pipe = Pipe.create((pipe) =>
    pipe
      .tap({
        to: '/foo/bar',
        take() {
          return 599;
        },
      })
      .tap({
        to: '/foo/bar',
        take() {
          return 599;
        },
      })
  );

  t.is(pipe.taps.length, 2);
});
