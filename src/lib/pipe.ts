import { GrowthModel, GrowthModelPlan, Timestamp } from './growth-model';

export type PipeConfiguration = (pipe: Pipe) => Pipe;
export type Faucet = (timestamp: Timestamp) => number;

type Tap = { to: string; take: (timestamp: Timestamp) => number };

export class Pipe {
  fromPath: string;
  toPath: string;
  taps: Tap[] = [];
  faucets: Faucet[] = [];
  baseVolume = 0;
  growthModel: GrowthModel;

  public static create(configure: PipeConfiguration): Pipe {
    const p = new Pipe();
    return configure(p);
  }

  wire(fromPath: string, toPath: string) {
    return this.change({
      fromPath,
      toPath,
    });
  }

  addFaucet(faucet: Faucet) {
    return this.change({
      faucets: [...this.faucets, faucet],
    });
  }

  public setBaseVolume(base: number) {
    return this.change({
      baseVolume: base,
    });
  }

  public grow(
    configureGrowth: (plan: GrowthModelPlan) => GrowthModelPlan
  ): Pipe {
    const plan = new GrowthModelPlan();
    const model = GrowthModelPlan.buildGrowthModelPlan(configureGrowth(plan));
    return this.change({
      growthModel: model,
    });
  }

  public tap(tap: Tap): Pipe {
    return this.change({
      taps: [...this.taps, tap],
    });
  }

  private change(mutations: Partial<Pipe>): Pipe {
    const newPipe = new Pipe();
    Object.assign(newPipe, this, mutations);
    return newPipe;
  }
}
