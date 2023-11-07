const { ComponentType, ButtonStyle } = require("discord.js");
const { utils } = require("../../../config");

module.exports = {
  data: { name: "verifyReqRej" },
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

    await member.setNickname(
      `⛔${data.nickname}`,
      `Verify rejected by ${interaction.user.tag}`
    );

    const reply = await interaction.editReply({
      content: `حذف در : <t:${(Date.now() + 6 * 1000 * 1000)
        .toString()
        .slice(0, -3)}:R>\n||<@${user.id}||`,
      embeds: [
        {
          color: 0xfa5656,
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

    utils.verify.db.delete(`v${user.id}`);

    setTimeout(() => {
      reply?.delete().catch((e) => e);
    }, 5 * 1000);
  },
};
