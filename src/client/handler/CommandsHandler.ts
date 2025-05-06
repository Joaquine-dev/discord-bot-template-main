import { REST, Routes, RESTOptions } from 'discord.js';
import { readdirSync } from 'fs';
import DiscordBot from '@client/DiscordBot';
import ApplicationCommand from '@structure/ApplicationCommand';
import MessageCommand from '@structure/MessageCommand';
import { info, error, success } from '@utils/console';

class CommandsHandler {
    private client: DiscordBot;

    constructor(client: DiscordBot) {
        this.client = client;
    }

    load = (): void => {
      
        for (const directory of readdirSync('./src/commands/')) {
            for (const file of readdirSync(`./src/commands/${directory}`).filter((f) => f.endsWith('.ts'))) {
                try {
                    const module: ApplicationCommand['data'] | MessageCommand['data'] = require(`../../commands/${directory}/${file}`);
               
                    if (!module) continue;

                    if (module.__type__ === 2) {
                        if (!module.command || !module.run) {
                            error(`Unable to load the message command ${file}`);
                            continue;
                        }

                        this.client.collection.message_commands.set(module.command.name, module);

                        if ('aliases' in module.command && Array.isArray(module.command.aliases)) {
                            module.command.aliases.forEach((alias: string) => {
                                this.client.collection.message_commands_aliases.set(alias, module.command.name);
                            });
                        }

                        info(`Loaded new message command: ${file}`);
                    } else if (module.__type__ === 1) {
                        if (!module.command || !module.run) {
                            error(`Unable to load the application command ${file}`);
                            continue;
                        }

                        this.client.collection.application_commands.set(module.command.name, module);
                        this.client.rest_application_commands_array.push(module.command);

                        info(`Loaded new application command: ${file}`);
                    } else {
                        error(`Invalid command type ${module.__type__} from command file ${file}`);
                    }
                } catch {
                    error(`Unable to load a command from the path: src/commands/${directory}/${file}`);
                }
            }
        }

        success(`Successfully loaded ${this.client.collection.application_commands.size} application commands and ${this.client.collection.message_commands.size} message commands.`);
    }

    reload = (): void => {
        this.client.collection.message_commands.clear();
        this.client.collection.message_commands_aliases.clear();
        this.client.collection.application_commands.clear();
        this.client.rest_application_commands_array = [];

        this.load();
    }
    
    registerApplicationCommands = async (
        development: { enabled: boolean; guildId: string },
        restOptions: Partial<RESTOptions> | null = null
    ): Promise<void> => {
        if (!this.client.token) {
            throw new Error('Bot token is not set');
        }

        const rest = new REST(restOptions || { version: '10' }).setToken(this.client.token);

        if (!this.client.user) {
            throw new Error('Client user is not initialized');
        }

        if (development.enabled) {
            await rest.put(
                Routes.applicationGuildCommands(this.client.user.id, development.guildId),
                { body: this.client.rest_application_commands_array }
            );
        } else {
            await rest.put(
                Routes.applicationCommands(this.client.user.id),
                { body: this.client.rest_application_commands_array }
            );
        }
    }
}

export default CommandsHandler;