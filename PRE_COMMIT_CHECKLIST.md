# ✅ Pre-Commit Checklist for GitHub

## 🔒 Security Verification

### Step 1: Verify No API Keys in Code
```bash
# Run this command - should only show process.env references (safe)
grep -r "GEMINI_API_KEY\|ELEVENLABS_API_KEY" --include="*.ts" --include="*.tsx" --include="*.js" | grep -v "process.env"
```
**Expected:** No results (empty) ✅

### Step 2: Verify .env Files Are Ignored
```bash
# Check if any .env files are tracked
git ls-files | grep -E "\.env$|\.env\.local$"
```
**Expected:** No results (empty) ✅

### Step 3: Verify .gitignore is Working
```bash
# Check ignored files
git status --ignored | grep -E "\.env|node_modules|\.next"
```
**Expected:** Should show .env files and build folders as ignored ✅

## 📦 Files Ready to Commit

✅ **Safe to commit:**
- All source code files
- `package.json` and `package-lock.json`
- `env.example` (template only)
- Configuration files (tsconfig.json, tailwind.config.ts, etc.)
- Documentation files (README.md, SECURITY.md, etc.)
- `.gitignore` and `.gitattributes`

❌ **Never commit:**
- `.env.local` (your real API keys)
- `.env` (if exists)
- `node_modules/`
- `.next/` (build folder)
- Any log files

## 🚀 Initial Git Setup (If Not Already Done)

```bash
# Initialize git (if not already done)
git init

# Add all files (respects .gitignore)
git add .

# Check what will be committed
git status

# Commit
git commit -m "Initial commit: AI Fitness Coach app"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## ⚠️ Important Reminders

1. **NEVER** commit `.env.local` - it contains your real API keys
2. **ALWAYS** use `env.example` as a template
3. **VERIFY** before every push that no sensitive data is included
4. If you accidentally commit a key, **immediately rotate/revoke it** on the provider's website

