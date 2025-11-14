# EmailJS Setup Instructions for CalcCrunch.com Contact Form

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up Free" 
3. Create your account (free tier allows 200 emails/month)

## Step 2: Add Email Service
1. After logging in, go to "Email Services" in the sidebar
2. Click "Add New Service"
3. Choose your email provider:
   - **Gmail** (recommended for ease)
   - **Outlook**
   - **Custom SMTP** (if you have your own mail server)
4. Follow the connection instructions for your chosen service
5. Name your service (e.g., "CalcCrunch Contact")
6. Click "Create Service"
7. **Copy your Service ID** (looks like: `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates" in the sidebar
2. Click "Create New Template"
3. Configure the template:

### Template Settings:
- **Template Name:** Contact Form Submission
- **To Email:** `info@calccrunch.com` (or use `{{to_email}}` to make it dynamic)
- **From Name:** `{{from_name}}`
- **From Email:** `{{from_email}}`
- **Reply To:** `{{reply_to}}`
- **Subject:** `[CalcCrunch Contact] {{subject}}`

### Email Content (HTML):
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: #2C5F8D;
            color: white;
            padding: 20px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 0 0 5px 5px;
        }
        .field {
            margin-bottom: 15px;
        }
        .label {
            font-weight: bold;
            color: #2C5F8D;
        }
        .value {
            margin-top: 5px;
            padding: 10px;
            background: white;
            border-radius: 3px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>CalcCrunch.com Contact Form</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">{{from_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">{{from_email}}</div>
            </div>
            
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">{{phone}}</div>
            </div>
            
            <div class="field">
                <div class="label">Subject:</div>
                <div class="value">{{subject}}</div>
            </div>
            
            <div class="field">
                <div class="label">Message:</div>
                <div class="value">{{message}}</div>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from the CalcCrunch.com contact form</p>
        </div>
    </div>
</body>
</html>
```

4. Click "Save"
5. **Copy your Template ID** (looks like: `template_xyz789`)

## Step 4: Get Your Public Key
1. Go to "Account" in the sidebar
2. Under the "API Keys" tab
3. **Copy your Public Key** (looks like: `AbCdEfGhIjKlMnOpQrSt`)

## Step 5: Update Your JavaScript File
Open `contact-form.js` and replace the placeholder values at the top:

```javascript
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_abc123';  // Your actual service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Your actual template ID
const EMAILJS_PUBLIC_KEY = 'AbCdEfGhIjKlMnOpQrSt'; // Your actual public key
```

## Step 6: Test Your Form
1. Fill out and submit the contact form on your website
2. Check the email address you configured
3. Check EmailJS dashboard for email history and any errors

## Optional: Auto-Reply Template
You can create a second template for auto-replies to users:

1. Create another template named "Auto Reply"
2. Set **To Email:** `{{from_email}}`
3. Set **From Name:** `CalcCrunch Team`
4. Set **Subject:** `Thank you for contacting CalcCrunch`
5. Add a friendly auto-reply message
6. In your JavaScript, add another `emailjs.send()` call with this template ID

## Troubleshooting

### Common Issues:
1. **"EmailJS is not loaded"** - Make sure the EmailJS script tag is included in your HTML
2. **"Unauthorized"** - Check that your public key is correct
3. **"Service not found"** - Verify your service ID
4. **"Template not found"** - Verify your template ID
5. **Emails not arriving** - Check spam folder, verify email service connection

### EmailJS Dashboard Features:
- **Email History:** View all sent emails
- **Statistics:** Track email sends and failures
- **Test Templates:** Send test emails directly from dashboard

## Security Notes:
- The public key is safe to expose in frontend code
- Never expose your private API key
- Consider implementing rate limiting if you expect high traffic
- The honeypot field helps prevent spam submissions

## Integration with Astro:
Since you're using Astro, you have two options:

1. **Client-side only** (current implementation):
   - Put the contact form in a `.astro` file
   - Include the JavaScript as a client-side script

2. **Server-side with Astro SSR** (more secure):
   - Use Astro's API routes to handle form submission
   - Keep EmailJS credentials server-side
   - This requires enabling SSR in your Astro config

The current implementation is client-side for simplicity and works well for most use cases.