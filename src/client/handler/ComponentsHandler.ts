import { info, error, success } from '@utils/console';
import { readdirSync } from 'fs';
import DiscordBot from '@client/DiscordBot';
import Component from '@structure/Component';
import AutocompleteComponent from '@structure/AutocompleteComponent';

class ComponentsHandler {
    client: DiscordBot;

    constructor(client: DiscordBot) {
        this.client = client;
    }

    load = () => {
        for (const directory of readdirSync('./src/components/')) {
            for (const file of readdirSync(`./src/components/${directory}`).filter((f) => f.endsWith('.ts'))) {
                try {
                    const module = require(`@components/${directory}/${file}`).default;
                    if (directory === 'reactions') continue;
                    if (!module) continue;
                
                    if (module.__type__ === 3) {
                      
                        const component = module as Component; // Assertion de type
                        if (!component.customId || !component.type || !component.run) {
                            error('Unable to load the button/select/modal component ' + file);
                            continue;
                        }

                        
                        switch (component.type) {
                            case 'modal':
                                if (Array.isArray(component.customId)) {
                                    component.customId.forEach(id => {
                                        this.client.collection.components.modals.set(id, component);
                                    });
                                } else {
                                    this.client.collection.components.modals.set(component.customId as string, component);
                                }
                                break;
                            case 'select':
                                if (Array.isArray(component.customId)) {
                                    component.customId.forEach(id => {
                                        this.client.collection.components.selects.set(id, component);
                                    });
                                } else {
                                    this.client.collection.components.selects.set(component.customId as string, component);
                                }
                                break;
                            case 'button':
                                if (Array.isArray(component.customId)) {
                                    component.customId.forEach(id => {
                                        this.client.collection.components.buttons.set(id, component);
                                    });
                                } else {
                                    this.client.collection.components.buttons.set(component.customId as string, component);
                                }
                                break;
                            default:
                                error('Invalid component type (not: button, select, or modal): ' + file);
                                continue;
                        }

                        info(`Loaded new component (type: ${component.type}) : ` + file);
                    } else if ((module as AutocompleteComponent).__type__ === 4) {
                        const autocompleteComponent = module as AutocompleteComponent; // Assertion de type
                        if (!autocompleteComponent.commandName || !autocompleteComponent.run) {
                            error('Unable to load the autocomplete component ' + file);
                            continue;
                        }

                        this.client.collection.components.autocomplete.set(autocompleteComponent.commandName, autocompleteComponent);
                        info(`Loaded new component (type: autocomplete) : ` + file);
                    } else {
                        error('Invalid component type ' + module.__type__ + ' from component file ' + file);
                    }
                } catch (err) {
                    error('Unable to load a component from the path: ' + `src/component/${directory}/${file}`);
                }
            }
        }

        const componentsCollection = this.client.collection.components;

        success(`Successfully loaded ${componentsCollection.autocomplete.size + componentsCollection.buttons.size + componentsCollection.selects.size + componentsCollection.modals.size} components.`);
    }

    reload = () => {
        this.client.collection.components.autocomplete.clear();
        this.client.collection.components.buttons.clear();
        this.client.collection.components.modals.clear();
        this.client.collection.components.selects.clear();

        this.load();
    }
}

export default ComponentsHandler;