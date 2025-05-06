import {
  Client,
  Collection,
  Partials,
  ClientOptions,
  ActivityType,
  PresenceData,
} from "discord.js";
import CommandsHandler from "@client/handler/CommandsHandler";
import { warn, error, success } from "@utils/console";
import config from "@config/config";
import CommandsListener from "@client/handler/CommandsListener";
import ComponentsHandler from "@client/handler/ComponentsHandler";
import ComponentsListener from "@client/handler/ComponentsListener";
import EventsHandler from "@client/handler/EventsHandler";
import ReactionsListener from "@client/handler/ReactionsListener";
import ReactionsHandler from "@client/handler/ReactionsHandler";
import Database from "@client/handler/Database";

class DiscordBot extends Client {
  collection: {
    application_commands: Collection<string, any>;
    message_commands: Collection<string, any>;
    message_commands_aliases: Collection<string, any>;
    components: {
      buttons: Collection<string, any>;
      selects: Collection<string, any>;
      modals: Collection<string, any>;
      autocomplete: Collection<string, any>;
    };
    reactions: Collection<string, any>;
  };
  rest_application_commands_array: any[];
  login_attempts: number;
  login_timestamp: number;
  statusMessages: { name: string; type: ActivityType }[];

  commands_handler: CommandsHandler;
  components_handler: ComponentsHandler;
  events_handler: EventsHandler;
  reactions_handler: ReactionsHandler;
  database: Database;

  constructor() {
    const clientOptions: ClientOptions = {
      intents: 3276799,
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
      ],
      presence: {
        activities: [
          {
            name: "keep this empty",
            type: ActivityType.Custom,
            state: "Version TS",
          },
        ],
      },
    };

    super(clientOptions);

    this.collection = {
      application_commands: new Collection(),
      message_commands: new Collection(),
      message_commands_aliases: new Collection(),
      components: {
        buttons: new Collection(),
        selects: new Collection(),
        modals: new Collection(),
        autocomplete: new Collection(),
      },
      reactions: new Collection(),
    };
    this.rest_application_commands_array = [];
    this.login_attempts = 0;
    this.login_timestamp = 0;
    this.statusMessages = [
      { name: "Status 1", type: ActivityType.Custom },
      { name: "Status 2", type: ActivityType.Custom },
      { name: "Status 3", type: ActivityType.Custom },
    ];

    this.commands_handler = new CommandsHandler(this);
    this.components_handler = new ComponentsHandler(this);
    this.events_handler = new EventsHandler(this);
    this.reactions_handler = new ReactionsHandler(this);

    this.database = new Database();

    new CommandsListener(this);
    new ComponentsListener(this);
    new ReactionsListener(this);
  }

  connect = async (): Promise<void> => {
    warn(
      `Attempting to connect to the Discord bot... (${this.login_attempts + 1})`
    );

    try {
      this.commands_handler.load();
      this.components_handler.load();
      this.events_handler.load();
      this.reactions_handler.load();

      await this.login(process.env.CLIENT_TOKEN);
      this.login_timestamp = Date.now();

      await this.database.connect();

      this.user?.setPresence({
        activities: [
          {
            name: "Discord Bot",
            type: ActivityType.Playing,
          },
        ],
      });

      warn(
        "Attempting to register application commands... (this might take a while!)"
      );

      await this.application?.commands.set([]);
      warn("Toutes les commandes existantes ont été supprimées globalement.");

      await this.commands_handler.registerApplicationCommands(
        config.development
      );
      success(
        "Successfully registered application commands. For specific guild? " +
          (config.development.enabled ? "Yes" : "No")
      );
    } catch (err) {
      error("Failed to connect to the Discord bot, retrying...");
      if (err instanceof Error) {
        error(err.message);
      } else {
        error("An unknown error occurred");
      }
      this.login_attempts++;
      setTimeout(this.connect, 5000);
    }
  };
}

export default DiscordBot;
