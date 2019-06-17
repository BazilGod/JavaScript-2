export class TransportUsingModel {
  constructor(tr: string, us: number) {
    this.transport = tr;
    this.usages = us;
  }
  transport: string = "";
  usages: number = 0;
}
