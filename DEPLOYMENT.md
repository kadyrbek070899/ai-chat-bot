# Deploying AI Chat Bot to Render

This guide will help you deploy your Telegram AI bot to Render (free tier available).

## Prerequisites

- A GitHub account
- A Render account (sign up at https://render.com - it's free!)
- Your Telegram Bot Token (from BotFather)
- Your Groq API Key (from https://console.groq.com)

## Step-by-Step Deployment Guide

### Step 1: Push Your Code to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Chat Bot"
   ```

2. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name it "ai-chat-bot" or whatever you prefer
   - Make it public or private (both work)
   - Don't initialize with README (we already have one)

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Sign up/Login to Render**
   - Go to https://render.com
   - Sign up with GitHub (recommended) or email

2. **Create a New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub account if not already connected
   - Select your `ai-chat-bot` repository

3. **Configure Your Service**
   - **Name**: `ai-chat-bot` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Select "Free" plan

4. **Add Environment Variables**

   Click "Advanced" and add these environment variables:

   - **TELEGRAM_BOT_TOKEN**
     - Value: Your bot token from BotFather (e.g., `1234567890:ABCdefGHI...`)

   - **GROQ_API_KEY**
     - Value: Your Groq API key (e.g., `gsk_abc123...`)

5. **Deploy**
   - Click "Create Web Service"
   - Render will start building and deploying your bot
   - This will take 1-2 minutes

### Step 3: Verify Deployment

1. **Check Logs**
   - Once deployed, click on "Logs" tab
   - You should see:
     ```
     🤖 AI Chat Bot is running!
     📊 Model: Llama 3.3 70B (Groq)
     💾 Conversation memory: Enabled
     ✅ Ready to chat!
     ```

2. **Test Your Bot**
   - Open Telegram
   - Find your bot (search for the username you gave it)
   - Send `/start` command
   - Try sending a message like "Hello!"
   - The bot should respond

## Important Notes

### Free Tier Limitations

Render's free tier:
- ✅ Unlimited deployments
- ✅ Automatic SSL
- ✅ Automatic deploys from GitHub
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ Takes ~30 seconds to wake up on first message

**Solution for spin-down**: Consider upgrading to paid tier ($7/month) for 24/7 uptime, or use a service like UptimeRobot to ping your service every 10 minutes.

### Environment Variables Security

- Never commit `.env` file to GitHub
- Always add environment variables through Render's dashboard
- Keep your API keys secret

### Automatic Deployments

- Every time you push to GitHub, Render will automatically redeploy
- You can disable auto-deploy in Render settings if needed

## Updating Your Bot

To update your bot after making changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

Render will automatically detect the push and redeploy!

## Troubleshooting

### Bot doesn't respond
- Check Render logs for errors
- Verify environment variables are set correctly
- Make sure the service shows as "Live" (green)

### Service keeps crashing
- Check logs for error messages
- Verify TELEGRAM_BOT_TOKEN is valid
- Verify GROQ_API_KEY is valid
- Make sure you're not hitting Groq rate limits

### Bot is slow to respond
- This is normal on free tier after inactivity (cold start)
- First message after 15 min takes ~30 seconds
- Subsequent messages are instant
- Upgrade to paid tier for always-on service

### "Build failed" error
- Check that package.json has `"start": "node bot.js"` in scripts
- Make sure all dependencies are in package.json
- Check build logs for specific error

## Alternative: Keep Bot Running 24/7 (Free)

If you want to avoid cold starts on the free tier, you can use UptimeRobot:

1. Get your Render service URL (e.g., `https://ai-chat-bot-xxxx.onrender.com`)
2. Sign up at https://uptimerobot.com (free)
3. Create a new monitor:
   - Monitor Type: HTTP(s)
   - URL: Your Render service URL
   - Monitoring Interval: 5 minutes
4. This will ping your service every 5 minutes, keeping it awake

**Note**: Render may still enforce some limits on free tier abuse prevention.

## Monitoring Your Bot

**View Logs**:
- Go to your service on Render
- Click "Logs" tab
- View real-time logs

**Check Status**:
- Dashboard shows if service is "Live" or "Down"
- Can view deployment history
- See resource usage

## Need Help?

- Check Render documentation: https://render.com/docs
- Check Telegraf docs: https://telegraf.js.org
- Check Groq docs: https://console.groq.com/docs

---

Your bot is now deployed and running 24/7 in the cloud! 🚀
