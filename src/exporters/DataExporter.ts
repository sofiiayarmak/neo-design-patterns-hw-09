import { UserData } from "../data/UserData";

export abstract class DataExporter {
  protected data: UserData[] = [];
  protected result: string = "";

  protected async load(): Promise<void> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const raw = await response.json();
    this.data = raw;
  }

  protected transform(): void {
    this.data = this.data
      .map(({ id, name, email, phone }) => ({ id, name, email, phone }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  protected beforeRender(): void {}

  protected abstract render(): void;

  protected afterRender(): void {}

  protected abstract save(): void;

  public async export(): Promise<void> {
    await this.load();
    this.transform();
    this.beforeRender();
    this.render();
    this.afterRender();
    this.save();
  }
}
