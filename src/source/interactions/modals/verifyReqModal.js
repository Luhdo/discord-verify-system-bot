const { ComponentType, ButtonStyle } = require("discord.js");
const { utils } = require("../../../config.js");

module.exports = {
  data: { name: "verifyReqModal" },
  /**
   *
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   */
  run: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const nick = interaction.fields.getTextInputValue("RVNick");
    const name = interaction.fields.getTextInputValue("RVName");
    const age = interaction.fields.getTextInputValue("RVAge");
    const city = interaction.fields.getTextInputValue("RVCity");

    if (!nick || !name || !age || !city)
      return interaction.editReply({
        content:
          "<:reject:1135271177087103036> **اطلاعات ناقص**,\n لطفا دوباره سعی کنید.",
      });

    if (isNaN(parseInt(age)))
      return interaction.editReply({
        content:
          "<:reject:1135271177087103036> **اطلاعات اشتباه**,\n 'سن' باید یک عدد باشد.",
      });

    /** @type {import("discord.js").BaseGuildTextChannel} */
    const channel = interaction.guild.channels.cache.get(
      utils.verify.channels.waitList
    );
    channel.sendTyping();

    const nickname = nick;
    const message = await channel.send({
      content: `||<@&1149065420301680650> <@${interaction.user.id}>||`,
      embeds: [
        {
          color: 0xfaac0c,
          author: {
            name: `کاربر ${interaction.user.tag} درخواست وریفای ثبت کرده است.`,
            iconURL: interaction.guild.iconURL({ dynamic: true, size: 256 }),
          },
          description: `قدمت حساب: <t:${interaction.user.createdTimestamp
            .toString()
            .slice(
              0,
              -3
            )}:R>\n عضو شده در: <t:${interaction.member.joinedTimestamp
            .toString()
            .slice(0, -3)}:R>`,
          thumbnail: {
            url:
              interaction.member.avatarURL({ dynamic: true, size: 512 }) ||
              interaction.user.avatarURL({ dynamic: true, size: 512 }),
          },
          fields: [
            {
              name: "نیک نیم:",
              value: nickname,
              inline: false,
            },
            { name: "نام:", value: name, inline: true },
            { name: "سن:", value: age, inline: true },
            { name: "شهر:", value: city, inline: true },
          ],
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              label: "تایید",
              emoji: "✔",
              style: ButtonStyle.Success,
              customId: "verifyReqAcc",
              disabled: false,
            },
            {
              type: ComponentType.Button,
              label: "ویرایش و تایید",
              emoji: "✏",
              style: ButtonStyle.Primary,
              customId: "verifyReqEdt",
              disabled: false,
            },
            {
              type: ComponentType.Button,
              label: "عدم تایید",
              emoji: "✖",
              style: ButtonStyle.Danger,
              customId: "verifyReqRej",
              disabled: false,
            },
          ],
        },
      ],
    });

    utils.verify.db.set(interaction.user.id, {
      message: message.id,
      nickname,
      name,
      age,
      city,
    });

    await interaction.editReply({
      embeds: [
        {
          title: "درخواست وریفای شما ارسال شد.",
          thumbnail: { url: interaction.guild.iconURL() },
          description:
            "لطفا در چنل منتظر بمانید.\n توجه کنید در صورت خارج شدن از چنل، درخواست وریفای شما کنسل میشود.",
        },
      ],
    });
  },
};
