import {
  PermissionsBitField,
  ChannelType,
  Message,
  Interaction,
  Events,
} from "discord.js";
import DiscordBot from "@client/DiscordBot";
import config from "@config/config";
import {
  handleMessageCommandOptions,
  handleApplicationCommandOptions,
} from "@client/handler/CommandOptions";
import { error } from "@utils/console";


class CommandsListener {
  constructor(client: DiscordBot) {
    client.on(Events.MessageCreate, async (message: Message) => {
      if (message.author.bot || message.channel.type === ChannelType.DM) return;
      if (!message.guild) return;
      if (!config.commands.message_commands) return;

      let prefix = config.commands.prefix;

     
      if (!message.content.startsWith(prefix)) return;

      const args = message.content.slice(prefix.length).trim().split(/\s+/g);
      const commandInput = args.shift()?.toLowerCase();

      if (!commandInput || !commandInput.length) return;

      const command =
        client.collection.message_commands.get(commandInput) ||
        client.collection.message_commands.get(
          client.collection.message_commands_aliases.get(commandInput) || ""
        );

      if (!command) return;

      try {
        if (command.options) {
          const commandContinue = await handleMessageCommandOptions(
            message,
            command.options,
            command.command
          );

          if (!commandContinue) return;
        }

        if (
          command.command?.permissions &&
          message.member &&
          !message.member.permissions.has(
            PermissionsBitField.resolve(command.command.permissions)
          )
        ) {
          await message.reply({
            content: config.messages.MISSING_PERMISSIONS,
          });

          return;
        }

        command.run(client, message, args);
      } catch (err) {
        error(err instanceof Error ? err.message : String(err));
      }
    });

    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (!interaction.isCommand()) return;

      if (
        !config.commands.application_commands.chat_input &&
        interaction.isChatInputCommand()
      )
        return;
      if (
        !config.commands.application_commands.user_context &&
        interaction.isUserContextMenuCommand()
      )
        return;
      if (
        !config.commands.application_commands.message_context &&
        interaction.isMessageContextMenuCommand()
      )
        return;

      const command = client.collection.application_commands.get(
        interaction.commandName
      );

      if (!command) return;

      try {
        if (command.options) {
          const commandContinue = await handleApplicationCommandOptions(
            interaction,
            command.options,
            command.command
          );

          if (!commandContinue) return;
        }

        command.run(client, interaction);
      } catch (err) {
        error(err instanceof Error ? err.message : String(err));
      }
    });
  }
}

export default CommandsListener;
