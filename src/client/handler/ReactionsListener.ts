import { Events, MessageReaction, User, PartialMessageReaction, PartialUser } from 'discord.js'; // Ajoute les types nécessaires
import DiscordBot from '@client/DiscordBot';
import { error } from '@utils/console';


class ReactionsListener {
    /**
     *
     * @param client - Instance de DiscordBot
     */
    constructor(client: DiscordBot) {
        client.on(Events.MessageReactionAdd, async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
            if (user.bot) return;
            try {
                const emoji = reaction.emoji.name;
                if (!emoji) return;
                const reactionComponent = client.collection.reactions.get(emoji);
                if (!reactionComponent) return;
                try {
                    await reactionComponent.run(client, reaction, user);
                } catch (err) {
                    error(err instanceof Error ? err.message : String(err));
                }

            } catch (err) {
                error(err instanceof Error ? err.message : String(err));
            }
  

        });
    }
}

export default ReactionsListener;
