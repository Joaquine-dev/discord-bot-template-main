import DiscordBot from "@client/DiscordBot";
import { MessageReaction, User, Awaitable } from "discord.js";

interface ReactionStructure {
    emoji: string;
    run: (client: DiscordBot, reaction: MessageReaction, user: User) => Awaitable<void>;
}

class Reaction {
    private data: ReactionStructure;

    constructor(structure: ReactionStructure) {
        this.data = { ...structure };
    }

    get emoji() {
        return this.data.emoji;
    }

    get run() {
        return this.data.run;
    }
}

export default Reaction;
