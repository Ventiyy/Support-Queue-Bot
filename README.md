

## Discord Support Queue Bot

A Discord bot that automatically numbers players in a support waiting room.

### Features

Automatic numbering [1], [2], [3] etc. when a user joins the support waiting room.

Automatic removal of the number when a user leaves the channel.

Automatic reordering of the queue when a user leaves.

Saves original nicknames and restores them when users leave the queue.

### Installation

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run build

# Start the bot
npm start
```

### Configuration

1. Create a .env file with the following:
```
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_BOT_TOKEN=your_bot_token
SUPPORT_CHANNEL_ID=Support Waiting Room ID
```

### Discord Bot Setup

1. Go to https://discord.com/developers/applications
2. Create a new application.
3. Go to the "Bot" section and enable:
   - `PRESENCE INTENT`
   - `SERVER MEMBERS INTENT`
   - `MESSAGE CONTENT INTENT`
4. Copy the Bot Token into your .env file.
5. Invite the bot using this link:
   ```
   https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=402653184&scope=bot
   ```
   (Replace YOUR_CLIENT_ID with your actual Client ID)

### Required Bot Permissions

- Manage Nicknames: To change user names.
- View Channels: To see the voice channels.
- Connect: To monitor voice channel activity.

### Important Notes

- The bot cannot change nicknames of users with a higher role than the bot itself.
- The bot cannot change its own nickname or the nickname of the server owner.
- Ensure the bot's role is positioned higher than the roles of the users it needs to rename.

