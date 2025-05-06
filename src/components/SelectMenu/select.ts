import { GuildMember, Interaction, AnySelectMenuInteraction } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import Component from "@structure/Component";

export default new Component({
    customId: 'select',
    type: 'select',
    /**
     * @param {DiscordBot} client 
     * @param {AnySelectMenuInteraction} interaction 
     */
    run: async (client: DiscordBot, interaction: Interaction) => {
      
    }
}).toJSON();
