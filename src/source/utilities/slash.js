const { REST, Routes } = require("discord.js");
const ora = require("ora");

const { bot } = require("../../config");

module.exports = {
  /**
   *
   * @param {string} clientId
   * @param {any[]} commands
   */
  register: async (clientId, commands, guildId) => {
    const Loader = ora("Registering slash commands");

    const rest = new REST({ version: "10" }).setToken(bot.token);

    try {
      if (guildId) {
        await rest
          .put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
          })
          .then(() => Loader.succeed(`Loaded Guild Slash Commands`));
      } else {
        await rest
          .put(Routes.applicationCommands(clientId), { body: commands })
          .then(() => Loader.succeed(`Loaded Slash Commands`));
      }
    } catch (error) {
      Loader.fail("Could not register slash commands");
      console.error(error);
    }
  },
};
