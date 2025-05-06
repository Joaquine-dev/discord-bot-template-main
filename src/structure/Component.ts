import DiscordBot from "@client/DiscordBot";
import { Interaction, Awaitable } from "discord.js";

type ComponentType = "modal" | "select" | "button";

interface ComponentStructure {
  customId: string | RegExp;
  type: ComponentType;
  options?: Partial<{
    public: boolean;
    pattern?: boolean;
  }>;
  run: (client: DiscordBot, interaction: Interaction) => Awaitable<void>;
}

interface ComponentWithType extends ComponentStructure {
  __type__: number;
}

class Component {
  private data: ComponentWithType;

  constructor(structure: ComponentStructure) {
    this.data = {
      __type__: 3,
      ...structure,
      customId:
        structure.customId instanceof RegExp
          ? structure.customId
          : structure.customId.toString(),
    };
  }

  toJSON(): ComponentWithType {
    return { ...this.data };
  }

  matchCustomId(id: string): boolean {
    if (this.data.customId instanceof RegExp) {
      return this.data.customId.test(id);
    }
    return this.data.customId === id;
  }

  get customId() {
    return this.data.customId;
  }

  get type() {
    return this.data.type;
  }

  get run() {
    return this.data.run;
  }
}

export default Component;
