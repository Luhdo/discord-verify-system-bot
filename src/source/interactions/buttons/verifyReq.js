const { ComponentType, TextInputStyle } = require("discord.js");
const { utils } = require("../../../config.js");

module.exports = {
  data: { name: "verifyReq" },
  /**
   *
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  run: async (interaction) => {
    if (interaction.member.roles.cache.has(utils.verify.roles.verified))
      return interaction.reply({
        ephemeral: true,
        embeds: [
          {
            color: 0xf00,
            title: "شما نمیتوانید از این دستور استفاده کنید!",
            description: `شما قبلا وریفای شده اید.`,
            footer: {
              iconURL: interaction.guild.iconURL(),
              text: interaction.guild.name,
            },
          },
        ],
      });

    await interaction.showModal({
      customId: "verifyReqModal",
      title: "Verify Request Form",
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "RVNick",
              label: "Nickname:",
              minLength: 3,
              maxLength: 32,
              placeholder:
                "نام نمایشی خود را در سرور وارد کنید، بدون فونت و به انگلیسی وارد شود.",
              required: true,
              style: TextInputStyle.Short,
              value: null,
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "RVName",
              label: "Name:",
              minLength: 3,
              maxLength: 20,
              placeholder: "نام واقعی شما",
              required: true,
              style: TextInputStyle.Short,
              value: null,
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "RVAge",
              label: "Age:",
              minLength: 2,
              maxLength: 2,
              placeholder: "سن شما (حداقل سن ١٣ سال میباشد)",
              required: true,
              style: TextInputStyle.Short,
              value: null,
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "RVCity",
              label: "City:",
              minLength: 3,
              maxLength: 32,
              placeholder: "محل زندگی شما",
              required: true,
              style: TextInputStyle.Short,
              value: null,
            },
          ],
        },
      ],
    });
  },
};
