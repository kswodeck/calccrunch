Business Days Calculator:
http://localhost:4321/calculators/business-days-calculator?type=between&start=2025-01-01&end=2025-12-31&country=US&disabled=6%2C7&custom=%5B%7B%22name%22%3A%22Juneteenth%22%2C%22date%22%3A%222025-06-19%22%2C%22enabled%22%3Atrue%7D%2C%7B%22name%22%3A%22Yom+Kippur%22%2C%22date%22%3A%222025-10-02%22%2C%22enabled%22%3Atrue%7D%5D

Rent vs Buy Calculator:
http://localhost:4321/calculators/rent-vs-buy-calculator?monthlyRent=2600&rentIncrease=3&rentersInsurance=20&securityDeposit=3000&homePrice=350000&downPayment=20&downPaymentUnit=%25&interestRate=6.25&loanTerm=30&closingCosts=3&closingCostsUnit=%25&homeAppreciation=3&propertyTax=2.2&propertyTaxUnit=%25&homeInsurance=1&homeInsuranceUnit=%25&hoaFees=0&maintenance=0.5&maintenanceUnit=%25&pmi=0.5&pmiUnit=%25&utilitiesDifference=50&investmentReturn=9&marginalTaxRate=24&timeHorizon=10&sellingCosts=6

Budget:
http://localhost:4321/calculators/budget-calculator?income=%5B%7B%22id%22%3A%22income-1%22%2C%22name%22%3A%22Salary%22%2C%22category%22%3A%22salary%22%2C%22amount%22%3A8500%7D%2C%7B%22id%22%3A%22income-2%22%2C%22name%22%3A%22Car+Rentals%22%2C%22category%22%3A%22business%22%2C%22amount%22%3A600%7D%2C%7B%22id%22%3A%22income-3%22%2C%22name%22%3A%22Credit+Card+Rewards%22%2C%22category%22%3A%22other-income%22%2C%22amount%22%3A50%7D%5D&needs=%5B%7B%22id%22%3A%22needs-1%22%2C%22name%22%3A%22Mortgage%22%2C%22category%22%3A%22housing%22%2C%22amount%22%3A5200%7D%2C%7B%22id%22%3A%22needs-2%22%2C%22name%22%3A%22Health%22%2C%22category%22%3A%22healthcare%22%2C%22amount%22%3A500%7D%2C%7B%22id%22%3A%22needs-3%22%2C%22name%22%3A%22Insurance%22%2C%22category%22%3A%22insurance%22%2C%22amount%22%3A200%7D%2C%7B%22id%22%3A%22needs-4%22%2C%22name%22%3A%22Utilities%22%2C%22category%22%3A%22utilities%22%2C%22amount%22%3A400%7D%2C%7B%22id%22%3A%22needs-5%22%2C%22name%22%3A%22Groceries%22%2C%22category%22%3A%22groceries%22%2C%22amount%22%3A600%7D%2C%7B%22id%22%3A%22needs-6%22%2C%22name%22%3A%22Gas%2FMaintenance%22%2C%22category%22%3A%22transportation%22%2C%22amount%22%3A300%7D%2C%7B%22id%22%3A%22needs-7%22%2C%22name%22%3A%22Childcare%22%2C%22category%22%3A%22childcare%22%2C%22amount%22%3A1000%7D%2C%7B%22id%22%3A%22needs-8%22%2C%22name%22%3A%22Debt%22%2C%22category%22%3A%22min-debt%22%2C%22amount%22%3A50%7D%2C%7B%22id%22%3A%22needs-9%22%2C%22name%22%3A%22Other+Essentials%22%2C%22category%22%3A%22other-needs%22%2C%22amount%22%3A150%7D%5D&wants=%5B%7B%22id%22%3A%22wants-1%22%2C%22name%22%3A%22Dining+Out%22%2C%22category%22%3A%22dining%22%2C%22amount%22%3A150%7D%2C%7B%22id%22%3A%22wants-2%22%2C%22name%22%3A%22Entertainment%22%2C%22category%22%3A%22entertainment%22%2C%22amount%22%3A150%7D%2C%7B%22id%22%3A%22wants-3%22%2C%22name%22%3A%22Subscriptions%22%2C%22category%22%3A%22subscriptions%22%2C%22amount%22%3A50%7D%2C%7B%22id%22%3A%22wants-4%22%2C%22name%22%3A%22Shopping%22%2C%22category%22%3A%22shopping%22%2C%22amount%22%3A150%7D%2C%7B%22id%22%3A%22wants-5%22%2C%22name%22%3A%22Gym%22%2C%22category%22%3A%22fitness%22%2C%22amount%22%3A20%7D%2C%7B%22id%22%3A%22wants-6%22%2C%22name%22%3A%22Other+Wants%22%2C%22category%22%3A%22other-wants%22%2C%22amount%22%3A80%7D%5D&savings=%5B%7B%22id%22%3A%22savings-6%22%2C%22name%22%3A%22Savings%22%2C%22category%22%3A%22savings%22%2C%22amount%22%3A150%7D%5D

IDEA: PTO Amount estimator / calculator

Amazon Affiliate Links:


<!-- Ad Unit (multiplex) -->
<AdUnit slot="1019949885" format="autorelaxed" />

<!-- Ad Unit (display) -->
<AdUnit slot="4441095467" format="auto" />


# Baby Name Generator - AI Setup Guide

## Overview

This baby name generator uses **Google Gemini AI** (free tier) via **Netlify Functions** (free tier) to generate names dynamically. This is a "set it and forget it" solution - once configured, it runs forever with no maintenance.

## Free Tier Limits

| Service | Free Limit | More Than Enough For |
|---------|------------|---------------------|
| Google Gemini | 15 requests/min, 1M tokens/month | ~10,000 name generations/month |
| Netlify Functions | 125,000 invocations/month | ~125,000 name generations/month |

---

## Setup Instructions (One-Time, ~10 minutes)

### Step 1: Get a Free Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the API key (starts with `AIza...`)

### Step 2: Add the API Key to Netlify

1. Go to your [Netlify Dashboard](https://app.netlify.com)
2. Select your CalcCrunch site
3. Go to **Site settings** → **Environment variables**
4. Click **"Add a variable"**
5. Enter:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** (paste your API key from Step 1)
6. Click **Save**

### Step 3: Add the Serverless Function to Your Project

Create this folder structure in your project:

```
your-project/
├── netlify/
│   └── functions/
│       └── generate-names.js    ← Add this file
├── src/
│   └── pages/
│       └── generators/
│           └── baby-name-generator.md
└── public/
    └── scripts/
        └── calculators/
            └── baby-name-generator.js
```

Copy these files to their locations:
- `generate-names.js` → `netlify/functions/generate-names.js`
- `baby-name-generator.md` → `src/pages/generators/baby-name-generator.md`
- `baby-name-generator.js` → `public/scripts/calculators/baby-name-generator.js`

### Step 4: Deploy

Commit and push your changes. Netlify will automatically:
1. Detect the `netlify/functions` folder
2. Deploy the serverless function
3. Make it available at `/.netlify/functions/generate-names`

---

## How It Works

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Browser   │────▶│ Netlify Function │────▶│ Gemini API  │
│ (your site) │◀────│  (your server)   │◀────│  (Google)   │
└─────────────┘     └──────────────────┘     └─────────────┘
                           │
                    API key stored
                    securely here
```

1. User clicks "Generate Names"
2. JavaScript calls your Netlify Function
3. Function (with your API key) calls Gemini
4. Gemini returns AI-generated names
5. Results display on your site

**The API key never touches the browser** - it's secure on Netlify's servers.

---

## Fallback Behavior

If the API call fails (network issues, rate limits, etc.), the generator automatically falls back to a built-in database of 30 popular names. Users will see a "Fallback Mode" badge instead of "AI Generated".

---

## Testing Locally

To test locally with Netlify Dev:

```bash
# Install Netlify CLI (one time)
npm install -g netlify-cli

# Create a .env file with your API key
echo "GEMINI_API_KEY=your_key_here" > .env

# Run local dev server
netlify dev
```

---

## Troubleshooting

### "API configuration error"
- Check that `GEMINI_API_KEY` is set in Netlify environment variables
- Redeploy after adding the variable

### "AI service error" 
- Check your Gemini API key is valid at [Google AI Studio](https://aistudio.google.com)
- Check you haven't exceeded the free tier limits

### Function not found (404)
- Ensure the file is at exactly `netlify/functions/generate-names.js`
- Check Netlify deploy logs for function detection

### Names not generating
- Open browser DevTools → Network tab
- Look for the `generate-names` request
- Check the response for error details

---

## Cost Summary

| Component | Cost |
|-----------|------|
| Google Gemini API | **$0** (free tier) |
| Netlify Functions | **$0** (free tier) |
| Netlify Hosting | **$0** (free tier) |
| **Total** | **$0/month forever** |

---

## File Checklist

- [ ] `netlify/functions/generate-names.js` - Serverless function
- [ ] `src/pages/generators/baby-name-generator.md` - Page template
- [ ] `public/scripts/calculators/baby-name-generator.js` - Frontend logic
- [ ] Netlify environment variable `GEMINI_API_KEY` configured

Once all boxes are checked, you're done! The generator will work indefinitely with current name trends from AI.