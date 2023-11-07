const { config } = require("dotenv");
config();
const { GatewayIntentBits, Collection } = require("discord.js");

/** @type {Collection<string, import("./source/utilities/types").userData>} */
const db = new Collection();

module.exports = {
  bot: {
    token: process.env["DISCORD_BOT_TOKEN"],
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers], //* https://ziad87.net/intents/
    version: "1.0.0",
  },
  utils: {
    verify: {
      db,
      roles: {
        verified: "1124741260436066316",
        unverified: "1124741262776488028",
      },
      channels: {
        log: "1125429998778597466",
        waitList: "1127997279811412090",
        greet: "1124741431437828146",
      },
    },
  },
};
