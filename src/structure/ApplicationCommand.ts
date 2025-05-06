import { ApplicationCommandData, Interaction, Awaitable } from "discord.js";
import DiscordBot from "@client/DiscordBot";

interface CommandOptions {
    cooldown?: number;
    botOwner?: boolean;
    guildOwner?: boolean;
    botDevelopers?: boolean;
    default_member_permissions: bigint;
}

interface CommandStructure {
    command: ApplicationCommandData;
    options?: Partial<CommandOptions>;
    run: Awaitable<(client: DiscordBot, interaction: Interaction) => void>;
}

class ApplicationCommand {
    data: {
        __type__: number;
        command: ApplicationCommandData;
        options?: Partial<CommandOptions>;
        run: Awaitable<(client: DiscordBot, interaction: Interaction) => void>;
    };

    constructor(structure: CommandStructure) {
        this.data = {
            __type__: 1, // Utilisé pour le gestionnaire
            ...structure,
        };
    }

    toJSON = (): Record<string, unknown> => {
        return { ...this.data };
    }
}

export default ApplicationCommand;
