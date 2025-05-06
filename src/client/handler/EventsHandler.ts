import { info, error, success } from '@utils/console';
import { readdirSync } from 'fs';
import DiscordBot from '@client/DiscordBot';
import { ClientEvents } from 'discord.js';
import Event from '@structure/Event';

class EventsHandler {
  client: DiscordBot;

  constructor(client: DiscordBot) {
    this.client = client;
  }

  load = (): void => {
    let total = 0;

    for (const directory of readdirSync('./src/events/')) {
      for (const file of readdirSync(`./src/events/${directory}`).filter((f) => f.endsWith('.ts'))) {
        try {
          const module = require(`../../events/${directory}/${file}`).default;

          if (!module) {
            error(`Module not found for ${file}`);
            continue;
          }

          if (module.__type__ !== 5) {
            error('Invalid event type ' + module.__type__ + ' from event file ' + file);
            continue;
          }

          if (!module.event || !module.run) {
            error('Unable to load the event ' + file);
            continue;
          }

          const eventData = module as Event<keyof ClientEvents>;
          info(`Registering event: ${file} with event type: ${eventData.event}`);

          if (eventData.once) {
            this.client.once(eventData.event, async (...args) => {
              info(`Executing once event: ${file}`);
              try {
                await eventData.run(this.client, ...args);
              } catch (err) {
                error(`Erreur lors de l'exécution de l'événement ${file}: ${err}`);
              }
            });
          } else {
            this.client.on(eventData.event, async (...args) => {
              info(`Executing event: ${file}`);
              try {
                await eventData.run(this.client, ...args);
              } catch (err) {
                error(`Erreur lors de l'exécution de l'événement ${file}: ${err}`);
              }
            });
          }

          info(`Loaded new event: ` + file);
          total++;
        } catch (err) {
          error('Unable to load an event from the path: ' + 'src/events/' + directory + '/' + file);
          error(err as string);
        }
      }
    }

    success(`Successfully loaded ${total} events.`);
  };
}

export default EventsHandler;
