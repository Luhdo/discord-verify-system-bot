const { ComponentType, ButtonStyle, TextInputStyle } = require("discord.js");
const { utils } = require("../../../config.js");

module.exports = {
  data: { name: "verifyReqEdt" },
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

    await interaction.showModal({
      customId: "verifyReqEditModal",
      title: "Verify Request Edit Form",
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "RVid",
              label: "آیدی عددی کاربر:",
              minLength: user.id.length,
              maxLength: user.id.length,
              placeholder: "این محل به صورت خودکار پر میشود",
              required: true,
              style: TextInputStyle.Short,
              value: user.id,
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "RVNick",
              label: "نیک نیم کاربر:",
              minLength: 3,
              maxLength: 32,
              placeholder: "(بدون فونت و انگلیسی) نیک نیم شخص در سرور",
              required: true,
              style: TextInputStyle.Short,
              value: data.nickname,
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "RVName",
              label: "نام واقعی کاربر:",
              minLength: 3,
              maxLength: 20,
              placeholder: "نام واقعی شخص، در دنیای واقعی",
              required: true,
              style: TextInputStyle.Short,
              value: data.name,
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "RVAge",
              label: "سن واقعی کاربر:",
              minLength: 2,
              maxLength: 2,
              placeholder: "حداقل سن 13 میباشد.",
              required: true,
              style: TextInputStyle.Short,
              value: data.age,
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "RVCity",
              label: "محل زندگی کاربر:",
              minLength: 3,
              maxLength: 32,
              placeholder: "استان یا شهر محل زندگی کاربر",
              required: true,
              style: TextInputStyle.Short,
              value: data.city,
            },
          ],
        },
      ],
    });
  },
};
