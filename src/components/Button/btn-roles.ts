import { Interaction, GuildMember } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import Component from "@structure/Component";

export default new Component({
    customId: /^btn-roles_(\d+)$/,
    type: 'button',
    options: {
        pattern: true
    },
    /**
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isButton()) return;
        
        const roleId = interaction.customId.match(/^btn-roles_(\d+)$/)?.[1];
        if (!roleId) return;

        const member = interaction.member as GuildMember;
        if (!member) return;

        try {
            const role = await interaction.guild?.roles.fetch(roleId);
            if (!role) {
                await interaction.reply({ content: "Ce rôle n'existe plus.", ephemeral: true });
                return;
            }

            if (member.roles.cache.has(roleId)) {
                await member.roles.remove(roleId);
                await interaction.reply({ content: `Le rôle ${role.name} vous a été retiré.`, ephemeral: true });
            } else {
                await member.roles.add(roleId);
                await interaction.reply({ content: `Le rôle ${role.name} vous a été ajouté.`, ephemeral: true });
            }
        } catch (error) {
            console.error('Erreur lors de la gestion du rôle:', error);
            await interaction.reply({ content: "Une erreur s'est produite lors de la gestion du rôle.", ephemeral: true });
        }
    }
}).toJSON();