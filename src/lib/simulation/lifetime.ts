import { memoize } from 'lodash';

import { Life } from '../life';
import { Step } from './step';

export class Lifetime {
  life: Life;
  /** unclear if memozie will be once per instance! */
  public step = memoize((i: number): Step | null => {
    if (i < 0) {
      return null;
    }
    const lastStep = this.step(i - 1);
    return Step.create((s) => {
      if (lastStep) {
        lastStep.setNext(s);
      }

      return s.setPrev(lastStep);
    });
  });

  // private computeNewCoefficients(i: number) {
  //   const lastStep = this.step(i - 1);
  //   if (lastStep) {
  //     this.life
  //       .getHolding('')
  //       .growthModel({ previous: lastStep.coefficients[''], step: i });
  //   }
  // }

  // on first step, set up initial holdings

  // growth model to make new coefficients
  // take values from last transactions and put here
}
