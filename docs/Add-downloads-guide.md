# How to Add a New Download

Super easy! Just follow these 3 steps:

---

## Step 1: Add Your Files

1. Put your **PDF file** in the `files/` folder
2. Put your **cover image** in the `assets/images/books/` folder

Example:
```
files/my-new-book.pdf
assets/images/books/my-new-book-cover.png
```

---

## Step 2: Edit the Data File

Open: `assets/downloads-data.js`

Add your book at the bottom (copy-paste this):

```javascript
,
{
  id: 2,
  title: "Your Book Title Here",
  cover: "assets/images/books/my-new-book-cover.png",
  file: "files/my-new-book.pdf",
  description: "Short description here"
}
```

**Important:**
- Change `id: 2` to the next number (3, 4, 5...)
- Don't forget the **comma** at the start!

---

## Step 3: Push to Git

```bash
git add .
git commit -m "Add new download"
git push origin main
```

Done! Wait 30 seconds and your new book appears on the site! 🎉
