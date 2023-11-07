# Discord Verify System Bot

[![GitHub license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

## Description

The Discord Verify System Bot is a robust and user-friendly verification bot designed to enhance your Discord server's security and welcoming experience. It plays a vital role in streamlining the onboarding process for new members and maintaining a safe and engaging community. This bot is developed in JavaScript, using the powerful Discord.js library, making it both versatile and easy to use.

### Key Features

- **Seamless Onboarding**: When new users join your Discord server, the bot welcomes them with open arms, providing a simple yet effective verification system.

- **Customizable Roles and Channels**: The bot allows administrators to customize the verification process according to their server's needs. Set up specific roles, such as "verified" and "unverified," to manage access, and configure channels for logging, waitlisting, and greetings.

- **Flexible Verification Process**: New members are prompted to verify themselves with the click of a button. This process ensures that only genuine users gain access to your server, while making it a breeze for them to get started.

- **Administrative Control**: Administrators can efficiently manage the verification process. They have the authority to approve or reject new members based on the provided information.

- **Open Source**: This project is open-source, and contributions from the community are welcome. You can help improve and expand its functionality.

## Installation Instructions

To set up and use the Discord Verify System Bot, follow these installation instructions:

1. Create a `.env` file and provide your Discord Bot Token from the Discord Developer Portal. An [example.env](example.env) file is available to help you set up your configuration.

   **Note:** Make sure you have enabled the "SERVER MEMBERS INTENT" in the "Privileged Gateway Intents" section on the "Bot" page in the Discord Developer Portal.

2. Edit the `config.js` file. This file contains configuration settings for the bot. You should edit the following sections:

   ```js
   {
      roles: {
        verified: "",
        unverified: "",
      },
      channels: {
        log: "",
        waitList: "",
        greet: "",
      },
   }
   ```

   - Under the `roles` section, set:
     - "verified" to the ID of the verified role that members will receive after successful verification.
     - "unverified" to the ID of the role for members who were rejected during the verification process.

   - Under the `channels` section, set:
     - "log" to the ID of the channel where the bot will send user logs.
     - "waitList" to the ID of the channel where the bot will send users who are waiting to get verified.
     - "greet" to the ID of the channel where the bot sends greeting messages to new members.

3. Once the bot is online, use the `/send` command to send the verification embed to the desired text channel in your server. This will initiate the verification process for new members.

## Usage

After successfully setting up the bot and configuring it, here's how you can use it in your Discord server:

1. When new users join your server, the bot will welcome them and provide a verification button.

2. New users can click the verification button to provide their information.

3. Administrators can then decide whether to approve or reject new members based on the provided information.

4. Approved members will receive the "verified" role, and rejected members will receive the "unverified" role.

## License

This project is licensed under the [Apache License 2.0](LICENSE).

## Contributing

Feel free to contribute to this project by creating issues or pull requests. Your contributions are highly appreciated.

## Support

If you need assistance or have any questions regarding the bot, you can contact the project maintainer [Ludho](https://github.com/Luhdo).

## Acknowledgements

This project was made possible thanks to the following open-source libraries and tools:

- [Discord.js](https://discord.js.org/): A powerful Node.js module that allows you to interact with the Discord API.

Thank you to the open-source community for their contributions.

Happy verifying!
