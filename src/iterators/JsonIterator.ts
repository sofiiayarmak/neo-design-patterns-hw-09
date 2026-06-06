import * as fs from "fs";
import { UserData } from "../data/UserData";

export class JsonIterator {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const content = fs.readFileSync(filePath, "utf-8");
    this.users = JSON.parse(content) as UserData[];
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
