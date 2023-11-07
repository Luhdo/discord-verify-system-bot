const {
  SlashCommandBuilder,
  PermissionsBitField,
  ComponentType,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("sends data in the current channel")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  /**
   *
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  run: async (interaction) => {
    const message = await interaction.channel.send({
      content: undefined,
      embeds: [
        {
          description:
            "** > Verify Request **\n\nبرای وریفای شدن در سرور ، لازم است ابتدا فرم اطلاعاتی را تکمیل کنید. نگران نباشید اطلاعات شما به صورت یک راز باقی می ماند. این کار فقط برای جلوگیری از ورود افراد مزاحم و یا افرادی با هویت های نامعلوم که قصد بهم ریختن جو را دارند می باشد. ما در اینجا سعی می کنیم محیطی ارام را برای شما به ارمغان بیاوریم. می توانید اطلاعات خود را از طریق این قسمت وارد کرده و روی وویس های انتظار ، منتظر ولکامر های سرور برای وریفای شدن باشید. با ارزوی شادکامی :sparkles:",
          color: 11479826,
          footer: {
            text: "Verify Request",
            icon_url: interaction.client.user.avatarURL({ size: 512 }),
          },
          image: {
            url: "https://cdn.discordapp.com/attachments/1146846505261596823/1152194862939111484/apply-now-gradient-label-background_23-2149486200.png",
          },
          thumbnail: {
            url: interaction.guild.iconURL({ size: 512 }),
          },
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              customId: "verifyReq",
              style: ButtonStyle.Success,
              emoji: "✔️",
              label: "درخواسـت وریـفـای",
            },
          ],
        },
      ],
    });
    await message.edit({ content: "||@everyone||" });

    await interaction.reply({
      ephemeral: true,
      content: `- verify embed has been sent.`,
    });
  },
};
