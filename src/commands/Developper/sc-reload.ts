import {ApplicationCommandType, AttachmentBuilder, Interaction } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";
import config from "@config/config";

module.exports =  new ApplicationCommand({
    command: {
        name: 'reload',
        description: 'Reload every command.',
        options: [],
    },
    options: {
        botDevelopers: true
    },
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;

        await interaction.deferReply();

        try {
            client.commands_handler.reload();
            await client.commands_handler.registerApplicationCommands(config.development);
            await interaction.editReply({
                content: 'Successfully reloaded application commands and message commands.',
            });
        } catch (err: any) {
            console.error(err);
            await interaction.editReply({
                content: `Something went wrong: ${err.message || err}`,
                files: [
                    new AttachmentBuilder(Buffer.from(`${err}`, 'utf-8'), { name: 'output.ts' })
                ]
            });
        }
    }
}).toJSON();
