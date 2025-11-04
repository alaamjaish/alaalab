# How to Add a New Download

## 🎯 How the System Works (Simple Version!)

Think of it like this:

**Your Website = A Catalog of Books**
- Shows pretty cards with book covers
- When someone clicks "Download", a popup asks for their email

**ConvertKit = The Post Office**
- Stores the actual PDF files
- Sends emails with download links
- Tracks who downloaded what (so you know who likes prompts vs tools!)

**The Connection:**
- Each book on your website is connected to a ConvertKit form
- When someone enters their email, it tells ConvertKit: "Send them Book #1!"
- ConvertKit sends them the email automatically

---

## 📝 To Add a New Download (3 Steps!)

### Step 1: Go to ConvertKit and Create a Form

1. Log into ConvertKit (kit.com)
2. Click **"Grow"** → **"Landing Pages & Forms"**
3. Click **"Create New"** → Choose **"Form"**
4. Give it a name like: "Prompts Guide Download"
5. Click **"Settings"** at the top
6. Click **"Incentive"** tab
7. Toggle ON **"Send incentive email"**
8. Click **"Download"** and upload your PDF file
9. Click **"Publish"**

**Important:** Copy the Form ID number from the URL!
- Look at your browser's address bar
- It will say: `app.convertkit.com/forms/123456/edit`
- The number `123456` is your Form ID - **COPY THIS!**

---

### Step 2: Add Your Cover Image

1. Put your **cover image** in: `assets/images/books/`
2. Name it something simple like: `prompts-guide-cover.png`

Example:
```
assets/images/books/prompts-guide-cover.png
```

---

### Step 3: Edit the Data File

Open: `assets/downloads-data.js`

Add your book at the bottom (copy-paste this):

```javascript
,
{
  id: 2,
  title: "دليل البرومبتات الشامل",
  cover: "assets/images/books/prompts-guide-cover.png",
  convertkitFormId: "123456",
  description: "دليل شامل لأفضل البرومبتات للذكاء الاصطناعي"
}
```

**Important:**
- Change `id: 2` to the next number (3, 4, 5...)
- Replace `123456` with YOUR actual Form ID from Step 1
- Don't forget the **comma** at the start!

---

### Step 4: Push to Git (Deploy!)

```bash
git add .
git commit -m "Add prompts guide download"
git push origin main
```

Done! Wait 30 seconds and your new book appears on the site! 🎉

---

## 🎁 What Happens When Someone Downloads?

1. They click "Download" on your website
2. Popup asks for name + email
3. They enter their info and click "Submit"
4. Your website tells ConvertKit: "Add this person to Form #123456"
5. ConvertKit sends them an email with the PDF attached
6. ConvertKit tracks this person downloaded "Prompts Guide"
7. Later you can see in ConvertKit: "John downloaded Prompts, Sara downloaded Tools"

**This is why each book needs its own ConvertKit form!**

---

## ⚠️ Important Notes

- **One form per download** - Don't reuse Form IDs!
- **Files stay in ConvertKit** - Don't put PDFs in your website's `files/` folder anymore
- **Segmentation works automatically** - ConvertKit knows who downloaded what
- **Email verification is automatic** - People must confirm their email to get the file

---

## 🆘 Troubleshooting

**Problem: People aren't getting the email**
- Check your ConvertKit form has "Send incentive email" turned ON
- Make sure you uploaded the PDF in the Incentive settings
- Ask them to check their Spam/Promotions folder

**Problem: Form ID not working**
- Make sure you copied the number from the URL correctly
- Check there are no extra spaces in the Form ID
- Make sure the form is Published in ConvertKit

**Problem: Cover image not showing**
- Check the file path matches exactly: `assets/images/books/filename.png`
- Make sure the image file was pushed to git
- Try refreshing the page with Ctrl+F5 (hard refresh)
