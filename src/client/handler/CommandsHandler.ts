import { REST, Routes, RESTOptions } from 'discord.js';
import { readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';
import DiscordBot from '@client/DiscordBot';
import ApplicationCommand from '@structure/ApplicationCommand';
import MessageCommand from '@structure/MessageCommand';
import { info, error, success } from '@utils/console';

class CommandsHandler {
    private client: DiscordBot;

    constructor(client: DiscordBot) {
        this.client = client;
    }

    private getAllCommandFiles(dir: string): string[] {
        const result: string[] = [];

        for (const item of readdirSync(dir)) {
            const fullPath = join(dir, item);
            const stats = statSync(fullPath);

            if (stats.isDirectory()) {
                result.push(...this.getAllCommandFiles(fullPath));
            } else if (stats.isFile() && fullPath.endsWith('.ts')) {
                result.push(fullPath);
            }
        }

        return result;
    }

    load = (): void => {
        const commandFiles = this.getAllCommandFiles('./src/commands');

        for (const fullPath of commandFiles) {
            const relativePath = fullPath.replace(/^.*\/src\/commands\//, ''); // pour affichage/logging

            try {
                const module: ApplicationCommand['data'] | MessageCommand['data'] = require(resolve(fullPath));

                if (!module) continue;

                if (module.__type__ === 2) {
                    if (!module.command || !module.run) {
                        error(`Unable to load the message command ${relativePath}`);
                        continue;
                    }

                    this.client.collection.message_commands.set(module.command.name, module);

                    if ('aliases' in module.command && Array.isArray(module.command.aliases)) {
                        module.command.aliases.forEach((alias: string) => {
                            this.client.collection.message_commands_aliases.set(alias, module.command.name);
                        });
                    }

                    info(`Loaded new message command: ${relativePath}`);
                } else if (module.__type__ === 1) {
                    if (!module.command || !module.run) {
                        error(`Unable to load the application command ${relativePath}`);
                        continue;
                    }

                    this.client.collection.application_commands.set(module.command.name, module);
                    this.client.rest_application_commands_array.push(module.command);

                    info(`Loaded new application command: ${relativePath}`);
                } else {
                    error(`Invalid command type ${module.__type__} from command file ${relativePath}`);
                }
            } catch (err) {
                error(`Unable to load a command from the path: ${fullPath}`);
                console.error(err);
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
