import { MessageReaction, TextChannel, User } from "discord.js";
import DiscordBot from "@client/DiscordBot";
import Reaction from "@structure/Reaction";

export default new Reaction({
    emoji: '👍',
    run: async (client: DiscordBot, reaction : MessageReaction, user: User) => {

     
        
    
    }
})