import * as fs from "fs";
import { UserData } from "../data/UserData";

export class XmlIterator {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const content = fs.readFileSync(filePath, "utf-8");
    const userBlocks = content.match(/<user>[\s\S]*?<\/user>/g) || [];
    this.users = userBlocks.map((block) => {
      const get = (tag: string) => {
        const match = block.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`));
        return match ? match[1] : "";
      };
      return {
        id: Number(get("id")),
        name: get("name"),
        email: get("email"),
        phone: get("phone"),
      };
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
