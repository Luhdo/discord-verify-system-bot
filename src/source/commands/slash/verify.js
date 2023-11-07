const {
  SlashCommandBuilder,
  ComponentType,
  TextInputStyle,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("verify a member in the server")
    .addUserOption((opt) =>
      opt.setName("member").setDescription("member to verify").setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild),
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  run: async (interaction) => {
    const member = interaction.options.getMember("member");

    await interaction.showModal({
      customId: "verifyModal",
      title: `Verifying ${member.user.tag}`,
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "Vid",
              label: "آیدی عددی",
              placeholder: "این بخش به صورت خودکار پر میشود",
              style: TextInputStyle.Short,
              value: member.id,
              required: true,
              minLength: member.id.length - 1,
              maxLength: member.id.length + 1,
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: "VNick",
              label: "نیک نیم:",
              minLength: 3,
              maxLength: 32,
              placeholder:
                "نام نمایشی یوزر را در سرور وارد کنید، بدون فونت و به انگلیسی وارد شود.",
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
              customId: "VName",
              label: "Name:",
              minLength: 3,
              maxLength: 20,
              placeholder: "نام واقعی یوزر",
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
              customId: "VAge",
              label: "Age:",
              minLength: 2,
              maxLength: 2,
              placeholder: "سن یوزر (حداقل سن ١٣ سال میباشد)",
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
              customId: "VCity",
              label: "City:",
              minLength: 3,
              maxLength: 32,
              placeholder: "محل زندگی یوزر",
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
