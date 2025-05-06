import { Interaction } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import ApplicationCommand from "@structure/ApplicationCommand";
import { User } from "@entity/User";
module.exports = new ApplicationCommand({
    command: {
        name: 'getclient',
        description: 'Message d\'annonce',
        options: [],
        
    },
    options: {
        botDevelopers: true
    },
    run: async (client: DiscordBot, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.member) return;
        const test = await client.database.getClient().getRepository(User).find();
        console.log(test);



        
    }
}).toJSON();