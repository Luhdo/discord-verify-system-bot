const { ComponentType, ButtonStyle } = require("discord.js");
const { utils } = require("../../../config.js");

module.exports = {
  data: { name: "verifyReqAcc" },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  run: async (interaction) => {
    /** @type {import("discord.js").User} */
    const user = interaction.message.mentions.users.first();
    const member = interaction.guild.members.cache.get(user.id);

    const data = utils.verify.db.get(`v${user.id}`);

    if (!data || !member)
      return (
        interaction.reply({
          ephemeral: true,
          content:
            "<:reject:1135271177087103036> مشخصات کاربر در دیتابیس یافت نشد،\n باگ را به دولوپر گزارش دهید.",
        }) +
        interaction.message.edit({
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
                  disabled: true,
                },
                {
                  type: ComponentType.Button,
                  label: "ویرایش و تایید",
                  emoji: "✏",
                  style: ButtonStyle.Primary,
                  customId: "verifyReqEdt",
                  disabled: true,
                },
                {
                  type: ComponentType.Button,
                  label: "عدم تایید",
                  emoji: "✖",
                  style: ButtonStyle.Danger,
                  customId: "verifyReqRej",
                  disabled: true,
                },
              ],
            },
          ],
        })
      );

    if (
      member.roles.highest.position >=
      interaction.member.roles?.highest?.position
    )
      return interaction.reply({
        ephemeral: true,
        content: "<:reject:1135271177087103036> شما دسترسی مربوطه را ندارید.",
      });

    await interaction.deferUpdate();

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
            { name: "به نام:", value: `${data.nickname}`, inline: false },
            {
              name: "اطلاعات کاربر:",
              value: "_ _",
              inline: false,
            },
            { name: "نام:", value: data.name, inline: true },
            { name: "سن:", value: data.age, inline: true },
            { name: "شهر:", value: data.city, inline: true },
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

    await member.setNickname(
      data.nickname,
      `Verified by ${interaction.user.tag}`
    );
    await member.roles.add(
      utils.verify.roles.verified,
      `Verified by ${interaction.user.tag}`
    );
    await member.roles.remove(
      utils.verify.roles.unverified,
      `Verified by ${interaction.user.tag}`
    );

    const reply = await interaction.editReply({
      content: `حذف در : <t:${(Date.now() + 6 * 1000)
        .toString()
        .slice(0, -3)}:R>\n||<@${user.id}||`,
      embeds: message.embeds,
      components: [],
    });

    utils.verify.db.delete(`v${user.id}`);

    setTimeout(() => {
      reply?.delete().catch((e) => e);
    }, 5 * 1000);
  },
};
