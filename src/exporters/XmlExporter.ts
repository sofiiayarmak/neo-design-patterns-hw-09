import * as fs from "fs";
import { DataExporter } from "./DataExporter";

export class XmlExporter extends DataExporter {
  protected render(): void {
    const items = this.data
      .map(
        (u) =>
          `  <user>\n    <id>${u.id}</id>\n    <name>${u.name}</name>\n    <email>${u.email}</email>\n    <phone>${u.phone}</phone>\n  </user>`,
      )
      .join("\n");
    this.result = `<?xml version="1.0" encoding="UTF-8"?>\n<users>\n${items}\n</users>`;
  }

  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  protected save(): void {
    fs.writeFileSync("users.xml", this.result, "utf-8");
    console.log("Saved: users.xml");
  }
}
