# AI Chat Bot for Telegram

A smart AI assistant bot for Telegram powered by Groq AI (FREE and ultra-fast!).

## Features

- 🤖 Intelligent AI responses using Llama 3.1 70B
- 💬 Natural conversations
- 🧠 Remembers conversation context
- ⚡ Super fast responses (Groq is incredibly fast!)
- 🆓 100% FREE to use (Groq has a generous free tier)

## Setup Instructions

### Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Choose a name (e.g., "My AI Assistant")
4. Choose a username (must end with 'bot', e.g., "myai_assistant_bot")
5. **Copy the bot token** BotFather gives you

### Step 2: Get FREE Groq API Key

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up for a FREE account (you can use Google/GitHub)
3. Click on "API Keys" in the left sidebar
4. Click "Create API Key"
5. Give it a name (e.g., "Telegram Bot")
6. **Copy the API key** (starts with `gsk_...`)

### Step 3: Configure the Bot

1. Open the `.env` file in this folder
2. Replace the placeholders:
   ```
   TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHI...
   GROQ_API_KEY=gsk_abc123...
   ```

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Run the Bot

```bash
node bot.js
```

You should see:
```
🤖 AI Chat Bot is running!
📊 Model: Llama 3.1 70B (Groq)
💾 Conversation memory: Enabled
✅ Ready to chat!
```

## How to Use

1. Find your bot on Telegram
2. Send `/start` to begin
3. Send any message and the AI will respond!

### Examples:

- "What's the capital of France?"
- "Write a short poem about coffee"
- "Explain blockchain in simple terms"
- "Help me write an email"
- "Translate 'Good morning' to Spanish"

### Commands:

- `/start` - Start the bot and see welcome message
- `/help` - Get help
- `/clear` - Clear conversation history (start fresh)
- `/about` - About the bot

## Why Groq?

- ⚡ **Ultra Fast**: Responses in seconds
- 🆓 **FREE**: Generous free tier
- 🧠 **Smart**: Uses Meta's Llama 3.1 70B model
- 💪 **Powerful**: Can handle complex questions

## Features

✅ Remembers conversation context (last 10 messages)
✅ Smart and helpful responses
✅ Works with any topic
✅ Fast and reliable
✅ Easy to use

## Troubleshooting

**Bot doesn't respond:**
- Check that `bot.js` is running
- Verify your TELEGRAM_BOT_TOKEN in `.env` is correct
- Make sure your GROQ_API_KEY is valid

**"API key invalid" error:**
- Go to https://console.groq.com and create a new API key
- Make sure you copied the full key (starts with `gsk_`)

**Rate limit errors:**
- Groq free tier has limits, but they're generous
- Wait a few seconds between messages if you hit the limit

## Technologies Used

- **Node.js** - Runtime
- **Telegraf** - Telegram Bot Framework
- **Groq SDK** - AI inference
- **Llama 3.1 70B** - AI model

---

🤖 Created with ❤️ using Claude Code
