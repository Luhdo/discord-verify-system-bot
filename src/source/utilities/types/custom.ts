import {
  ButtonInteraction,
  Client,
  Collection,
  CommandInteraction,
  ContextMenuCommandBuilder,
  ContextMenuCommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
} from "discord.js";

export type slashCommandFile = {
  data: SlashCommandBuilder;
  run: (interaction: CommandInteraction) => Promise<void>;
};
export type contextCommandFile = {
  data: ContextMenuCommandBuilder;
  run: (interaction: ContextMenuCommandInteraction) => Promise<void>;
};

type buttonFile = {
  data: { name: string };
  run: (interaction: ButtonInteraction) => Promise<void>;
};
type modalFile = {
  data: { name: string };
  run: (interaction: ModalSubmitInteraction) => Promise<void>;
};

export interface CustomClient extends Client {
  slash: Collection<string, slashCommandFile>;
  context: Collection<string, contextCommandFile>;
  menus: Collection<string, any>;
  buttons: Collection<string, buttonFile>;
  modals: Collection<string, modalFile>;
}
