# 🔒 Security Checklist for GitHub

## ✅ Pre-Commit Security Checks

Before pushing to GitHub, ensure:

### 1. **No Hardcoded API Keys**
- ✅ All API keys use `process.env.*` (verified)
- ✅ No keys in source code files
- ✅ No keys in comments

### 2. **Environment Files**
- ✅ `.env.local` is in `.gitignore` (NEVER commit this!)
- ✅ `.env` is in `.gitignore`
- ✅ Only `env.example` is committed (with placeholder values)

### 3. **Sensitive Data**
- ✅ No real API keys in any files
- ✅ No passwords or secrets
- ✅ No personal information

### 4. **Files to Ignore**
- ✅ `node_modules/` - dependencies
- ✅ `.next/` - build files
- ✅ `*.log` - log files
- ✅ `.DS_Store` - OS files
- ✅ `.vercel/` - deployment config

## 📋 Files Safe to Commit

✅ Safe to commit:
- `env.example` (template with placeholders)
- `package.json` (no secrets)
- Source code files
- Configuration files (without real keys)
- Documentation files

❌ NEVER commit:
- `.env.local`
- `.env`
- Any file with real API keys
- `node_modules/`
- Build artifacts

## 🚀 Quick Check Before Push

Run these commands to verify:

```bash
# Check for any .env files (should return nothing)
git ls-files | grep -E "\.env$|\.env\.local$"

# Check for hardcoded API keys (should only show process.env references)
grep -r "GEMINI_API_KEY\|ELEVENLABS_API_KEY" --include="*.ts" --include="*.tsx" --include="*.js" | grep -v "process.env"

# Verify .gitignore is working
git status --ignored
```

## 📝 Setup Instructions for New Users

1. Clone the repository
2. Copy `env.example` to `.env.local`
3. Add your real API keys to `.env.local` (this file is gitignored)
4. Never commit `.env.local`!

