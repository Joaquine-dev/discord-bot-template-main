import {
  ButtonInteraction,
  AnySelectMenuInteraction,
  ModalSubmitInteraction,
  AutocompleteInteraction,
  Interaction,
  Events,
} from "discord.js"; // Ajoute les types nécessaires
import DiscordBot from "@client/DiscordBot";
import config from "@config/config";
import { error } from "@utils/console";

class ComponentsListener {
  /**
   *
   * @param client - Instance de DiscordBot
   */
  constructor(client: DiscordBot) {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
      const checkUserPermissions = async (component: any): Promise<boolean> => {
        if (
          "message" in interaction &&
          component.options?.public === false &&
          interaction.user.id !== interaction.user?.id
        ) {
          await interaction.reply({
            content: config.messages.COMPONENT_NOT_PUBLIC,
            ephemeral: true,
          });

          return false;
        }

        return true;
      };

      try {
        if (interaction.isButton()) {
          // Recherche d'abord un composant avec l'ID exact
          let component = client.collection.components.buttons.get(
            interaction.customId
          );

          // Si aucun composant n'est trouvé avec l'ID exact, cherche parmi les regex
          if (!component) {
            component = Array.from(
              client.collection.components.buttons.values()
            ).find(
              (comp) =>
                comp.customId instanceof RegExp &&
                comp.customId.test(interaction.customId)
            );
          }

          if (!component) return;

          if (!(await checkUserPermissions(component))) return;

          try {
            component.run(client, interaction as ButtonInteraction);
          } catch (err) {
            error(err instanceof Error ? err.message : String(err));
          }

          return;
        }

        if (interaction.isAnySelectMenu()) {
          const component = client.collection.components.selects.get(
            interaction.customId
          );

          if (!component) return;

          if (!(await checkUserPermissions(component))) return;

          try {
            component.run(client, interaction as AnySelectMenuInteraction);
          } catch (err) {
            error(err instanceof Error ? err.message : String(err));
          }

          return;
        }

        if (interaction.isModalSubmit()) {
          const component = client.collection.components.modals.get(
            interaction.customId
          );

          if (!component) return;

          try {
            component.run(client, interaction as ModalSubmitInteraction); // Cast interaction pour ModalSubmitInteraction
          } catch (err) {
            error(err instanceof Error ? err.message : String(err));
          }

          return;
        }

        if (interaction.isAutocomplete()) {
          const component = client.collection.components.autocomplete.get(
            interaction.commandName
          );

          if (!component) return;

          try {
            component.run(client, interaction as AutocompleteInteraction); // Cast interaction pour AutocompleteInteraction
          } catch (err) {
            error(err instanceof Error ? err.message : String(err));
          }

          return;
        }
      } catch (err) {
        error(err instanceof Error ? err.message : String(err));
      }
    });
  }
}

export default ComponentsListener;
