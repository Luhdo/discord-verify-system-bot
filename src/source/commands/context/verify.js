const {
  ContextMenuCommandBuilder,
  PermissionFlagsBits,
  ApplicationCommandType,
  ComponentType,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("verify")
    .setType(ApplicationCommandType.User)
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  /**
   *
   *
   * @param {import("discord.js").ContextMenuCommandInteraction} interaction
   * @return {Promise<void>}
   */
  run: async (interaction) => {
    /** @type {import("discord.js").GuildMember} */
    const member = interaction.targetMember;

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
              customId: "VAge",
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
              customId: "VCity",
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
