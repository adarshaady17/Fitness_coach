# 💪 AI Fitness Coach

An AI-powered fitness assistant built using Next.js that generates personalized workout and diet plans using LLMs. Get custom exercise routines, meal plans, and expert tips tailored to your goals, preferences, and lifestyle.

![AI Fitness Coach](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

- **🧠 AI-Powered Plan Generation** - Personalized workout and diet plans using Google Gemini AI
- **🔊 Voice Features** - Listen to your plans with natural voice narration powered by ElevenLabs TTS
- **🖼️ Image Generation** - Visual guides for exercises and meals using Gemini image generation
- **📄 Export & Save** - Export plans as PDF and save them locally for offline access
- **☁️ Cloud Storage** - Optional Supabase integration for cross-device sync
- **📊 Plan Analytics** - View statistics about your workout and diet plans
- **📜 Plan History** - Access and manage all your saved plans
- **🌗 Dark/Light Mode** - Beautiful themes with smooth transitions
- **💬 Daily Motivation** - AI-generated motivational quotes to keep you inspired
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **✨ Smooth Animations** - Beautiful UI animations powered by Framer Motion

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Theme**: next-themes

### AI & APIs
- **Text Generation**: Google Gemini API (gemini-2.5-flash, gemini-pro)
- **Voice**: ElevenLabs TTS API
- **Images**: Gemini Image Generation API
- **PDF Export**: pdf-lib

### Development
- **Linting**: ESLint
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js 18+ and npm
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))
- ElevenLabs API key ([Get it here](https://elevenlabs.io/app/settings/api-keys)) - Optional but recommended for voice features

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/ai-fitness-coach.git
cd ai-fitness-coach
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Copy the template
cp env.example .env.local
```

4. **Add your API keys to `.env.local`:**
```env
GEMINI_API_KEY=your_gemini_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

   **Note:** `.env.local` is gitignored and will not be committed. See [GET_API_KEYS.md](./GET_API_KEYS.md) for detailed instructions.

5. **Run the development server:**
```bash
npm run dev
```

6. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Start creating your personalized fitness plan!

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles
│   ├── plans/
│   │   ├── create/              # Multi-step form wizard
│   │   └── view/                # Plan display page
│   └── api/                     # API routes
│       ├── generate-plan/       # AI plan generation
│       ├── tts/                 # Text-to-speech
│       └── image/               # Image generation
├── components/
│   ├── layout/                  # Navbar, Footer, ThemeToggle
│   ├── ui/                      # Reusable UI components
│   ├── forms/                   # Form wizard components
│   ├── plans/                   # Plan display components
│   ├── media/                   # TTS and Image modals
│   └── common/                  # Shared components
├── lib/
│   ├── ai/                      # Gemini AI client
│   ├── tts/                     # ElevenLabs client
│   ├── context/                 # React context providers
│   ├── types/                   # TypeScript types
│   └── validators/              # Zod schemas
└── public/                      # Static assets
```

## 🎮 Usage

### Creating a Plan

1. Click **"Start Your Plan"** on the homepage
2. Fill out the 4-step form:
   - **Step 1**: Your basic information (name, age, gender, height, weight)
   - **Step 2**: Fitness goals and level
   - **Step 3**: Dietary preferences
   - **Step 4**: Additional details (medical history, injuries, etc.)
3. Click **"Generate Plan"** and wait for AI to create your personalized plan
4. View your complete workout and diet plan

### Using Voice Features

1. On the plan view page, scroll to **"Listen to Your Plan"**
2. Select a section (Full Plan, Workout, Diet, or Tips)
3. Click **"Play"** to hear your plan read aloud

### Viewing Exercise/Meal Images

1. Expand a workout day or diet day
2. Click on any **exercise name** or **meal item name**
3. An AI-generated image will appear in a modal

### Exporting Plans

1. On the plan view page, click **"Export PDF"** in the action bar
2. A PDF file will be downloaded with your complete plan
3. The PDF includes workout routines, diet plans, and tips

### Saving & Viewing History

1. Click **"Save Plan"** to save your current plan
2. Plans are automatically saved to your browser's local storage
3. Visit **"History"** in the navbar to view all saved plans
4. Click **"View"** on any saved plan to load it
5. Click **"Delete"** to remove plans from history
6. Plans are synced to cloud (if Supabase is configured) for cross-device access

### Viewing Plan Statistics

1. On the plan view page, scroll to the **"Plan Statistics"** section
2. See overview of your plan:
   - Number of workout days and exercises
   - Diet days and total meals
   - Average calories per day
   - Total tips and motivation lines

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key for text and image generation |
| `ELEVENLABS_API_KEY` | ⚠️ Optional | ElevenLabs API key for voice features |
| `NEXT_PUBLIC_SUPABASE_URL` | ⚠️ Optional | Supabase URL (for cloud storage sync) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ⚠️ Optional | Supabase anonymous key |

**Note:** Supabase is optional. The app works perfectly with just localStorage. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for cloud storage setup.

See [env.example](./env.example) for the complete template.

## 🐛 Troubleshooting

### Plan Generation Fails
- **Check your Gemini API key** is correct in `.env.local`
- **Verify API quota** hasn't been exceeded
- **Check browser console** for detailed error messages

### Voice Features Not Working
- **Verify ElevenLabs API key** is set in `.env.local`
- **Check character limits** - ElevenLabs free tier has limits
- **Try shorter sections** (Workout Only or Diet Only)

### Images Not Generating
- **Ensure Gemini API key** has image generation access
- **Check API quota** for image generation
- **Verify model availability** in your region

### Build Errors
- **Clear `.next` folder**: `rm -rf .next`
- **Reinstall dependencies**: `rm -rf node_modules && npm install`
- **Check Node.js version**: Requires Node.js 18+

## 🚀 Deployment

### Deploy to Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications. It offers:
- ✅ Zero-configuration deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Free tier with generous limits
- ✅ Automatic deployments from GitHub

**Quick Start:**
1. Push your code to GitHub
2. Sign up at [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy!

**📖 Full Deployment Guide:** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed step-by-step instructions.

### Environment Variables for Production

When deploying, make sure to add these environment variables in your hosting platform:

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key |
| `ELEVENLABS_API_KEY` | ⚠️ Optional | ElevenLabs TTS API key |
| `NEXT_PUBLIC_SUPABASE_URL` | ⚠️ Optional | Supabase URL (if using cloud storage) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ⚠️ Optional | Supabase anonymous key |

**⚠️ Important:** Never commit `.env.local` to Git. Use your hosting platform's environment variable settings instead.

## 🎯 Development Roadmap

- [x] Step 1: Project Scaffolding
- [x] Step 2: Base Layout & UI Components
- [x] Step 3: Multi-Step Form Wizard
- [x] Step 4: AI Integration (Text Generation)
- [x] Step 5: Voice & Image Features
- [x] Step 6: PDF Export & Enhanced Save Features ✅
- [x] Step 7: Optional Cloud Storage (Supabase) ✅
- [x] Step 8: Plan Analytics & Statistics ✅

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) for AI text and image generation
- [ElevenLabs](https://elevenlabs.io/) for text-to-speech capabilities
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

- 📖 [API Keys Guide](./env.example) - Environment variables template
- 🔒 [Security Guide](./SECURITY.md) - Security best practices
- 🚀 [Vercel Deployment](./VERCEL_DEPLOYMENT.md) - Step-by-step deployment guide
- 🐛 [Report Issues](https://github.com/YOUR_USERNAME/ai-fitness-coach/issues) - Found a bug?

---

Made with 💪 by the AI Fitness Coach team
