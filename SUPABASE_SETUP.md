# ☁️ Optional Supabase Cloud Storage Setup

This project supports **optional** cloud storage using Supabase. If you don't set up Supabase, the app will automatically use localStorage (browser storage) instead.

## Why Use Supabase?

- **Cross-device sync** - Access your plans from any device
- **Backup** - Plans are stored in the cloud, not just your browser
- **No data loss** - Plans persist even if you clear browser data

## Setup Instructions (Optional)

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be ready

### Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Create Database Table

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE fitness_plans (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_fitness_plans_user_id ON fitness_plans(user_id);
CREATE INDEX idx_fitness_plans_created_at ON fitness_plans(created_at DESC);
```

### Step 4: Install Supabase Package

```bash
npm install @supabase/supabase-js
```

### Step 5: Add to .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 6: Restart Dev Server

```bash
npm run dev
```

## How It Works

- **With Supabase**: Plans are saved to both localStorage AND Supabase
- **Without Supabase**: Plans are saved only to localStorage (works perfectly fine!)

The app automatically detects if Supabase is configured and uses it if available. If not, it gracefully falls back to localStorage.

## Troubleshooting

- **"Supabase not available"** message: This is normal if you haven't set up Supabase. The app will use localStorage.
- **Plans not syncing**: Check your Supabase credentials in `.env.local`
- **Database errors**: Make sure you've created the `fitness_plans` table

## Current Status

✅ **Cloud storage is optional** - App works perfectly without it  
✅ **Automatic fallback** - Uses localStorage if Supabase isn't configured  
✅ **No breaking changes** - Existing localStorage functionality remains intact

