require('dotenv').config();
const { Telegraf } = require('telegraf');
const Groq = require('groq-sdk');

// Check environment variables
if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN is missing in .env file');
    process.exit(1);
}

if (!process.env.GROQ_API_KEY) {
    console.error('❌ GROQ_API_KEY is missing in .env file');
    process.exit(1);
}

// Initialize Telegram bot and Groq AI
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Store conversation history for each user
const conversations = new Map();

// Maximum messages to remember per user
const MAX_HISTORY = 10;

// Get or create conversation history for a user
function getConversation(userId) {
    if (!conversations.has(userId)) {
        conversations.set(userId, [
            {
                role: 'system',
                content: 'You are a helpful, friendly, and intelligent AI assistant. Be concise but informative. Use emojis occasionally to be friendly.'
            }
        ]);
    }
    return conversations.get(userId);
}

// Add message to conversation history
function addToConversation(userId, role, content) {
    const conversation = getConversation(userId);
    conversation.push({ role, content });

    // Keep only recent messages (plus system message)
    if (conversation.length > MAX_HISTORY + 1) {
        // Keep system message at index 0, remove oldest user/assistant messages
        conversation.splice(1, conversation.length - MAX_HISTORY - 1);
    }
}

// Clear conversation history for a user
function clearConversation(userId) {
    conversations.delete(userId);
}

// Start command
bot.start((ctx) => {
    const firstName = ctx.from.first_name || 'there';
    ctx.reply(
        `👋 Hello ${firstName}!\n\n` +
        `I'm an AI assistant powered by Groq. I can:\n\n` +
        `💬 Have conversations with you\n` +
        `❓ Answer questions\n` +
        `📝 Help with writing\n` +
        `💡 Explain complex topics\n` +
        `🌍 Translate languages\n` +
        `💻 Help with coding\n` +
        `🎨 Be creative\n\n` +
        `Just send me any message and I'll respond!\n\n` +
        `Commands:\n` +
        `/start - Show this message\n` +
        `/help - Get help\n` +
        `/clear - Clear conversation history\n` +
        `/about - About this bot`
    );
});

// Help command
bot.help((ctx) => {
    ctx.reply(
        `📖 *How to use:*\n\n` +
        `Just send me any message and I'll respond intelligently!\n\n` +
        `*Examples:*\n` +
        `• "What's the weather like in Paris?"\n` +
        `• "Explain quantum physics simply"\n` +
        `• "Write a poem about cats"\n` +
        `• "Help me debug this code: ..."\n` +
        `• "Translate 'Hello' to Spanish"\n\n` +
        `*Commands:*\n` +
        `/clear - Clear our conversation history\n` +
        `/about - Learn about this bot`,
        { parse_mode: 'Markdown' }
    );
});

// About command
bot.command('about', (ctx) => {
    ctx.reply(
        `🤖 *AI Chat Bot*\n\n` +
        `This bot uses:\n` +
        `• Groq AI (ultra-fast inference)\n` +
        `• Llama 3.1 70B model\n` +
        `• Conversation memory\n\n` +
        `I remember our conversation to give contextual responses!\n\n` +
        `Made with ❤️ using Claude Code`,
        { parse_mode: 'Markdown' }
    );
});

// Clear conversation command
bot.command('clear', (ctx) => {
    const userId = ctx.from.id;
    clearConversation(userId);
    ctx.reply('🧹 Conversation history cleared! Starting fresh.');
});

// Handle text messages
bot.on('text', async (ctx) => {
    const message = ctx.message.text;
    const userId = ctx.from.id;

    // Skip if it's a command
    if (message.startsWith('/')) {
        return;
    }

    try {
        // Show typing indicator
        await ctx.sendChatAction('typing');

        // Add user message to conversation history
        addToConversation(userId, 'user', message);

        // Get conversation history
        const conversation = getConversation(userId);

        // Call Groq AI
        const completion = await groq.chat.completions.create({
            messages: conversation,
            model: 'llama-3.3-70b-versatile', // Fast and smart model
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false
        });

        const aiResponse = completion.choices[0]?.message?.content;

        if (!aiResponse) {
            throw new Error('No response from AI');
        }

        // Add AI response to conversation history
        addToConversation(userId, 'assistant', aiResponse);

        // Send response to user
        await ctx.reply(aiResponse);

    } catch (error) {
        console.error('Error:', error.message);

        let errorMsg = '❌ Sorry, I encountered an error.\n\n';

        if (error.message.includes('API key')) {
            errorMsg += 'The API key is invalid or missing.';
        } else if (error.message.includes('rate limit')) {
            errorMsg += 'Too many requests. Please wait a moment.';
        } else if (error.message.includes('timeout')) {
            errorMsg += 'Request timed out. Please try again.';
        } else {
            errorMsg += 'Please try again in a moment.';
        }

        ctx.reply(errorMsg);
    }
});

// Handle other message types
bot.on('sticker', (ctx) => {
    ctx.reply('😊 Nice sticker! But I can only respond to text messages.');
});

bot.on('photo', (ctx) => {
    ctx.reply('📷 I see you sent a photo, but I can only process text for now!');
});

bot.on('voice', (ctx) => {
    ctx.reply('🎤 I received your voice message, but I can only respond to text!');
});

// Error handling
bot.catch((err, ctx) => {
    console.error('Bot error:', err);
    ctx.reply('❌ An unexpected error occurred. Please try again.');
});

// Launch bot with retry
async function startBot(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            await bot.launch();
            console.log('🤖 AI Chat Bot is running!');
            console.log('📊 Model: Llama 3.3 70B (Groq)');
            console.log('💾 Conversation memory: Enabled');
            console.log('✅ Ready to chat!');
            return;
        } catch (err) {
            console.error(`❌ Failed to start bot (attempt ${i + 1}/${retries}):`, err.message);
            if (i < retries - 1) {
                console.log('⏳ Retrying in 3 seconds...');
                await new Promise(resolve => setTimeout(resolve, 3000));
            } else {
                console.error('❌ All retry attempts failed. Please check your internet connection and bot token.');
                process.exit(1);
            }
        }
    }
}

startBot();

// Graceful shutdown
process.once('SIGINT', () => {
    console.log('\n👋 Shutting down bot...');
    bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
    console.log('\n👋 Shutting down bot...');
    bot.stop('SIGTERM');
});
