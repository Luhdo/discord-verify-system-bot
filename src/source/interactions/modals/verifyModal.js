const { utils } = require("../../../config.js");
const { ComponentType, ButtonStyle } = require("discord.js");

module.exports = {
  data: { name: "verifyModal" },
  /**
   *
   * @param {import("discord.js").ModalSubmitInteraction} interaction
   */
  run: async (interaction) => {
    const id = interaction.fields.getTextInputValue("Vid");
    const nick = interaction.fields.getTextInputValue("VNick");
    const name = interaction.fields.getTextInputValue("VName");
    const age = interaction.fields.getTextInputValue("VAge");
    const city = interaction.fields.getTextInputValue("VCity");

    if (!id || !nick || !name || !age || !city)
      return interaction.reply({
        ephemeral: true,
        content: "🔴 **اطلاعات ناکامل**,\nلطفا دوباره سعی کنید.",
      });

    if (isNaN(parseInt(age)))
      return interaction.reply({
        ephemeral: true,
        content: "🔴 **اطلاعات اشتباه**,\n 'سن' باید یک عدد باشد.",
      });

    const member = interaction.guild.members.cache.get(id);
    if (!member)
      return interaction.reply({
        ephemeral: true,
        content:
          "🔴 مشخصات کاربر در دیتابیس یافت نشد،\n باگ را به دولوپر گزارش دهید.",
      });

    await interaction.deferReply({ ephemeral: true });

    const nickname = nick;

    /** @type {import("discord.js").TextBasedChannel} */
    const logChannel = interaction.guild.channels.cache.get(
      utils.verify.channels.log
    );
    const message = await logChannel.send({
      content: `||<@${member.user.id}>||`,
      embeds: [
        {
          color: 0x56ac56,
          author: {
            name: "✅" + `کاربر ${member.user.tag} تایید شد.`,
            icon_url:
              member.avatarURL({ dynamic: true, size: 256 }) ||
              member.user.avatarURL({ dynamic: true, size: 256 }) ||
              interaction.guild.iconURL({
                dynamic: true,
                size: 256,
              }),
            url: "https://ludho.ir",
          },
          description: `کاربر <@${member.user.id}> تایید شد.`,
          fields: [
            { name: "توسط:", value: `<@${interaction.member.user.id}>` },
            {
              name: "به نام:",
              value: nickname,
              inline: false,
            },
            {
              name: "اطلاعات کاربر:",
              value: "_ _",
              inline: false,
            },
            { name: "نام:", value: name, inline: true },
            { name: "سن:", value: age, inline: true },
            { name: "شهر:", value: city, inline: true },
          ],
          footer: {
            iconURL: interaction.guild.iconURL(),
            text: interaction.guild.name,
          },
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              label: "اطلاعات کاربر",
              customId: "acInfo",
              style: ButtonStyle.Primary,
              emoji: "ℹ",
              url: null,
              disabled: false,
            },
            {
              type: ComponentType.Button,
              label: "عدم تایید",
              customId: "unVerify",
              style: ButtonStyle.Danger,
              emoji: "⛔",
              url: null,
              disabled: false,
            },
          ],
        },
      ],
      ephemeral: false,
    });

    await member.setNickname(nickname, `Verified by ${interaction.user.tag}`);
    await member.roles.add(
      utils.verify.roles.verified,
      `Verified by ${interaction.user.tag}`
    );
    await member.roles.remove(
      utils.verify.roles.unverified,
      `Verified by ${interaction.user.tag}`
    );

    await interaction.editReply({
      content: `||<@${member.user.id}||`,
      embeds: message.embeds,
      components: [],
    });
  },
};
