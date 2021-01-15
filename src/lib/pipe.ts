import { Timestamp } from './growth-model';

export type PipeConfiguration = (pipe: Pipe) => Pipe;
export type Faucet = (timestamp: Timestamp) => number;

type Tap = { to: string; take: (timestamp: Timestamp) => number };

export class Pipe {
  fromPath: string;
  toPath: string;
  taps: Tap[] = [];
  faucets: Faucet[];

  public static create(configure: PipeConfiguration): Pipe {
    const p = new Pipe();
    return configure(p);
  }

  to(path: string) {
    return this.change({
      toPath: path,
    });
  }

  from(path: string) {
    return this.change({
      fromPath: path,
    });
  }

  addFaucet(faucet: Faucet) {
    return this.change({
      faucets: [...this.faucets, faucet],
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
