# EmailJS Setup Guide

Your contact form is now ready to use EmailJS! Follow these steps to complete the setup:

## 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Set up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New message from {{from_name}} ({{from_email}})

**Content:**
```
You have a new message from your website:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your personal website contact form.
```

4. Save the template and note down your **Template ID**

## 4. Get Public Key
1. Go to "Account" in your dashboard
2. Find your **Public Key** (also called User ID)

## 5. Update Your Code
Replace the placeholder values in `src/components/Contact.js`:

```javascript
const serviceId = 'YOUR_SERVICE_ID';        // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID';      // Replace with your Template ID  
const publicKey = 'YOUR_PUBLIC_KEY';        // Replace with your Public Key
```

## 6. Test Your Form
1. Start your development server: `npm start`
2. Fill out the contact form
3. Submit and check if you receive the email

## Troubleshooting
- Make sure all three IDs are correct
- Check that your email service is properly connected
- Verify the template variables match exactly: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- Check the browser console for any error messages

## Free Tier Limits
- 200 emails per month
- Perfect for personal websites!

Once set up, your contact form will send emails directly to colerm17@gmail.com whenever someone submits the form.
