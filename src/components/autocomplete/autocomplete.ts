import AutocompleteComponent from "@structure/AutocompleteComponent";
import { AutocompleteInteraction, GuildMember } from "discord.js";
import DiscordBot from "@client/DiscordBot";

const autocompleteComponent = new AutocompleteComponent({
    commandName: 'removerole',
    run: async (client: DiscordBot, interaction: AutocompleteInteraction) => {
        const curMember = interaction.member as GuildMember;

        if (!curMember) return;
        const allRoles = curMember.roles.cache.map(role => role.name);
        const input = interaction.options.getFocused();
        const filteredRoles = allRoles.filter(role => role.toLowerCase().startsWith(input.toLowerCase()));
        await interaction.respond(filteredRoles.map(role => ({ name: role, value: role })));

    
    }
});

export default autocompleteComponent;