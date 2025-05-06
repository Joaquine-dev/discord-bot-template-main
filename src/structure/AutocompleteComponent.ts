import DiscordBot from "@client/DiscordBot";
import { AutocompleteInteraction, Awaitable } from "discord.js";

interface AutocompleteComponentStructure {
    commandName: string;
    run: (client: DiscordBot, interaction: AutocompleteInteraction) => Awaitable<void>;
}

class AutocompleteComponent {
    __type__: number; // Ajout de __type__ pour correspondre à ComponentsHandler
    commandName: string;
    run: (client: DiscordBot, interaction: AutocompleteInteraction) => Awaitable<void>;

    constructor(structure: AutocompleteComponentStructure) {
        this.__type__ = 4; // Utilisé pour le gestionnaire
        this.commandName = structure.commandName;
        this.run = structure.run;
    }

    toJSON = () => {
        return { __type__: this.__type__, commandName: this.commandName };
    }
}

export default AutocompleteComponent;