import * as fs from "fs";
import { UserData } from "../data/UserData";

export class CsvIterator {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.trim().split("\n");
    // перший рядок — заголовок
    this.users = lines.slice(1).map((line) => {
      const [id, name, email, phone] = line.split(",");
      return { id: Number(id), name, email, phone };
    });
  }

  [Symbol.iterator](): Iterator<UserData> {
    let index = 0;
    const users = this.users;
    return {
      next(): IteratorResult<UserData> {
        if (index < users.length) {
          return { value: users[index++], done: false };
        }
        return { value: undefined as any, done: true };
      },
    };
  }
}
