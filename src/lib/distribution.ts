import * as d3 from 'd3';
import { sample } from 'lodash';

abstract class Distribution {
  abstract generateNumber(): number;

  *[Symbol.iterator]() {
    while (true) {
      yield this.generateNumber();
    }
  }
}

export class NormalDistribution extends Distribution {
  constructor(private readonly mean: number, private readonly stddev: number) {
    super();
  }
  generateNumber() {
    return d3.randomNormal(this.mean, this.stddev)();
  }
}

export class ConstantDistribution extends Distribution {
  constructor(private readonly num: number) {
    super();
  }

  public generateNumber() {
    return this.num;
  }
}

export class CombinedDistribution extends Distribution {
  private distributions: {
    coefficient: number;
    distribution: Distribution;
  }[] = [];

  add(distribution: Distribution, coefficient = 1) {
    this.distributions.push({ coefficient, distribution });
    return this;
  }

  generateNumber() {
    const sampleBag: Distribution[] = [];

    // set up the sample bag with `n` copies of each distribution
    for (const { coefficient, distribution } of this.distributions) {
      for (let i = 0; i < coefficient; i++) {
        sampleBag.push(distribution);
      }
    }
    return sample(sampleBag).generateNumber();
  }
}
