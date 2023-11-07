const config = require("../../../config.js");

module.exports = {
  data: { name: "unVerify" },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  run: async (interaction) => {
    let member = interaction.guild.members.cache.get(
      interaction.message.embeds[0].description
        .split("<")[1]
        .split(">")[0]
        .split("@")[1]
    );
    let nickName = interaction.message.embeds[0].fields[1].value;

    if (!member)
      return interaction.reply({
        ephemeral: true,
        embeds: [
          {
            color: 0x5600aa,
            author: {
              name: interaction.guild.name,
              icon_url: interaction.guild.iconURL({
                dynamic: true,
                size: 512,
              }),
              url: "https://ludho.ir",
            },
            description: `کاربر مورد نظر پیدا نشد!\n ممکن است شخص از سرور خارج شده باشد.`,
          },
        ],
        components: [],
      });

    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        content: "⛔ شما دسترسی مربوطه را ندارید.",
        embeds: [],
        components: [],
        ephemeral: true,
      });

    for (let role of member.roles.cache.map((r) => r.id)) {
      try {
        await member.roles.remove(role);
      } catch (error) {}
    }

    await member.roles.add(
      config.utils.verify.roles.unverified,
      `unverified by ${interaction.user.tag}`
    );

    await member.setNickname(
      `⛔ ${nickName}`,
      `unverified by ${interaction.user.tag}`
    );

    await interaction.update({
      ephemeral: false,
      embeds: [
        {
          color: 0xf00000,
          author: {
            name: interaction.guild.name,
            icon_url: interaction.guild.iconURL({
              dynamic: true,
              size: 512,
            }),
            url: "https://ludho.ir",
          },
          description: `کاربر ${member.user.tag} از حالت تایید شده خارج شد.`,
          fields: [
            { name: "توسط:", value: `<@${interaction.member.user.id}>` },
          ],
        },
      ],
      components: [],
    });

    await interaction.guild.channels.cache
      .get(config.utils.verify.channels.log)
      .send({
        content: `||<@${member.user.id}>||`,
        embeds: [
          {
            color: 0xff0000,
            author: {
              name:
                "❌" + `کاربر ${member.user.tag} از حالت تایید شده خارج شد.`,
              icon_url: interaction.guild.iconURL({
                dynamic: true,
                size: 512,
              }),
              url: "https://ludho.ir",
            },
            description: `کاربر ${member.user.tag} از حالت تایید شده خارج شد.`,
            fields: [
              { name: "توسط:", value: `<@${interaction.member.user.id}>` },
            ],
          },
        ],
        components: [],
        ephemeral: false,
      });
  },
};
