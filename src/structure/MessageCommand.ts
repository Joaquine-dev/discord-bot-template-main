import DiscordBot from "@client/DiscordBot";
import { Message, PermissionResolvable } from "discord.js";

interface MessageCommandStructure {
    command: {
        name: string;
        description?: string;
        aliases?: string[];
        permissions?: PermissionResolvable[];
    };
    options?: Partial<{
        cooldown: number;
        botOwner: boolean;
        guildOwner: boolean;
        botDevelopers: boolean;
        nsfw: boolean;
    }>;
    run: (client: DiscordBot, message: Message, args: string[]) => Promise<void> | void;
}

class MessageCommand {
    private data: MessageCommandStructure & { __type__: number };

    constructor(structure: MessageCommandStructure) {
        this.data = {
            __type__: 2, // Ceci est utilisé pour le gestionnaire
            ...structure
        };
    }

    toJSON = (): MessageCommandStructure & { __type__: number } => {
        return { ...this.data };
    }
}

export default MessageCommand;
