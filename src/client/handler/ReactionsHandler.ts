// src/client/handler/ReactionHandler.ts
import { readdirSync } from 'fs';
import Reaction from '@structure/Reaction';
import { info, error, success } from '@utils/console';
import DiscordBot from '@client/DiscordBot';

class ReactionsHandler {
    client: DiscordBot;

    constructor(client: DiscordBot) {
        this.client = client;
    }

    load = () => {
        for (const file of readdirSync('./src/components/reactions/').filter((f) => f.endsWith('.ts'))) {
            try {
                const module = require(`@components/reactions/${file}`).default;
            

                if (!module) continue;

                const reaction = module as Reaction;

                if (!reaction.emoji || !reaction.run) {
                    error('Unable to load the reaction: ' + file);
                    continue;
                }

                this.client.collection.reactions.set(reaction.emoji, reaction);
                info(`Loaded reaction for emoji: ${reaction.emoji}`);
            } catch (err) {
                error('Unable to load reaction from path: ' + `src/components/reactions/${file}`);
            
            }
        }

        success(`Successfully loaded ${this.client.collection.reactions.size} reactions.`);
    }

    reload = () => {
        this.client.collection.reactions.clear();
        this.load();
    }
}

export default ReactionsHandler;
