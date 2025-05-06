import { ClientEvents, Awaitable } from "discord.js";
import DiscordBot from "@client/DiscordBot";

type EventStructure<K extends keyof ClientEvents> = {
    event: K;
    once?: boolean;
    run: (client: DiscordBot, ...args: ClientEvents[K]) => Awaitable<void>;
};

class Event<K extends keyof ClientEvents> {
    public __type__: number;
    public event: K;
    public once?: boolean;
    public run: (client: DiscordBot, ...args: ClientEvents[K]) => Awaitable<void>;

    constructor(structure: EventStructure<K>) {
        this.__type__ = 5;
        this.event = structure.event;
        this.once = structure.once;
        this.run = structure.run;
    }

    toJSON = (): Record<string, unknown> => {
        return {
            __type__: this.__type__,
            event: this.event,
            once: this.once,
            run: this.run
        };
    }
}

export default Event;
