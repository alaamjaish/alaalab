# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Alaa, showcasing AI solutions and consulting services. The site is built with pure HTML and Tailwind CSS (CDN), requiring no build process. It's designed for Arabic-speaking audiences with RTL (right-to-left) support and bilingual typography.

## Project Structure

```
/ (root - only essential files for routing)
├── index.html                 Main landing page (Arabic, RTL)
├── downloads.html             Lead capture page with ConvertKit integration
├── english.html               English/LTR version
├── vercel.json                Vercel configuration
│
├── api/                       Vercel serverless functions
│   └── subscribe.js           ConvertKit email subscription handler
│
├── assets/                    Organized assets
│   ├── downloads-data.js      Download resources configuration (Form IDs)
│   └── images/
│       ├── books/             Download resource cover images
│       ├── personalphoto.jpg
│       └── projects/          Portfolio project screenshots
│
├── files/                     Downloadable files (legacy, not used in production)
│
├── docs/                      Documentation
│   ├── Add-downloads-guide.md Step-by-step guide for adding new downloads
│   ├── README.md
│   ├── README_DEPLOY.md
│   └── videoscript.md
│
└── archive/                   Legacy files
    └── site3.html
```

## Architecture

### Core Pages Structure

The site consists of four main HTML files:

1. **index.html** - Main landing page (Arabic, RTL, light theme)
   - Sticky header with navigation, logo (AL gradient badge + "علاء لاب")
   - Hero section with personal photo and introduction
   - Embedded YouTube video (ID: eQ78L1ENCrE)
   - Portfolio showcase with 3 real projects:
     - **Transcriber**: Next.js · OpenAI · Speech-to-Text · Supabase
     - **Scout**: Next.js · Apify · OpenAI · Web Scraping · Email Automation
     - **LevantTalk**: Next.js · Soniox · Eleven Labs · Supabase · OpenAI
   - Process explanation (3-step approach)
   - "Who I help" value proposition section
   - Multiple CTAs leading to consultation booking
   - Scroll-based reveal animations with IntersectionObserver

2. **downloads.html** - Lead capture page with email-gated downloads (Arabic, RTL, light theme)
   - Dynamic resource catalog loaded from `assets/downloads-data.js`
   - Each resource card displays cover, title, description
   - Modal popup for email capture (name + email required)
   - Integrates with ConvertKit via `/api/subscribe` endpoint
   - Each download linked to specific ConvertKit form (enables segmentation)
   - Email confirmation flow (no direct downloads - files sent via ConvertKit incentive emails)
   - "While you're here" CTA section with contact options
   - Same header as index.html for consistent navigation

3. **english.html** - English/LTR version of main page
   - Left-to-right layout (dir="ltr")
   - Text on left, photo on right (reversed from Arabic version)
   - All content translated to English
   - Same functionality and styling as index.html

4. **site3.html** - Legacy light theme alternative (not actively used)

### JavaScript Patterns

All pages use vanilla JavaScript embedded in `<script>` tags at the bottom of the HTML. No external JS files or frameworks.

#### Key Functions Across Pages:

- **Scroll-based animations**: IntersectionObserver API with `data-reveal` attributes (`up`, `down`, `left`, `right`, `fade`)
- **Staggered animations**: `data-stagger` containers with configurable delays
- **Header shadow on scroll**: `toggleHeaderShadow()` - adds shadow/backdrop blur when scrolling
- **Email copy utility**: `copyEmail()` - clipboard API with toast notification
- **Contact panel toggle**: Shows/hides WhatsApp, email, social media options
- **Form handling**: Client-side validation and success state management (downloads.html)
- **Reduced motion support**: Respects `prefers-reduced-motion: reduce` media query

#### Downloads Page Specific Functions:

- **`renderBooks()`**: Dynamically generates resource cards from `booksData` array
- **`openDownloadModal(formId, resourceTitle)`**: Opens email capture modal for specific resource
- **`closeDownloadModal()`**: Closes modal and resets form state
- **Form submission**: Sends `{email, first_name, form_id}` to `/api/subscribe` via fetch

### Serverless API (`api/subscribe.js`)

Vercel serverless function that securely handles ConvertKit subscriptions.

**Endpoint:** `POST /api/subscribe`

**Request Body:**
```json
{
  "email": "user@example.com",
  "first_name": "User Name",
  "form_id": "8737582"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Subscription successful"
}
```

**Response (Error):**
```json
{
  "error": "Error message"
}
```

**Environment Variables Required:**
- `CONVERTKIT_API_KEY` - Must be set in Vercel dashboard under Project Settings → Environment Variables

**Important:** The function accepts `form_id` dynamically from the client, allowing each download resource to use its own ConvertKit form without code changes. Never hardcode Form IDs in this function.

### Styling Architecture

- **Framework**: Tailwind CSS via CDN (no compilation needed)
- **Fonts**:
  - Cairo (Arabic text)
  - Inter (English text)
- **Color System** (consistent across all pages):
  - Base colors: slate-based neutrals (#F8FAFC to #0F172A)
  - Primary: blue tones (#0EA5E9, #0284C7, #0369A1)
  - Accent: teal tones (#14B8A6, #0D9488, #0F766E)
- **Custom Tailwind config**: Inline configuration in each HTML file's `<script>` tag
- **RTL Support**: Arabic pages use `dir="rtl"` and `lang="ar"`, English uses `dir="ltr"` and `lang="en"`
- **Theme**: Light theme with white backgrounds, slate text, subtle shadows

### Contact Information

All hardcoded contact links use:
- WhatsApp: https://wa.me/905340718990
- Email: contact@alaalab.com
- Instagram: @alaamjaish
- YouTube: @alaamjaish
- YouTube Video ID: eQ78L1ENCrE

## Development Guidelines

### Editing Pages

When modifying HTML files:
1. **Never touch index.html when user says not to** - respect explicit instructions about file modification
2. Always preserve RTL/LTR and language attributes (`dir` and `lang`)
3. Maintain consistent color variables defined in Tailwind config across all pages
4. Keep animation data attributes (`data-reveal`, `data-stagger`, `data-delay`) intact
5. Ensure mobile responsiveness (all pages use mobile-first approach)
6. Test accessibility features (focus states, ARIA labels)
7. When creating new pages, match the styling and navigation of existing pages

### Portfolio Section Updates

The portfolio section in index.html showcases 3 real projects. When updating:
- Each project has a numbered badge (1, 2, 3)
- Project name and tech stack are in English (class: `font-english`)
- Description text is in Arabic
- Each project has 2 screenshot images in a 2-column grid
- Images are in root directory with naming pattern: `projectname1.png`, `projectname2.png`
- Current images:
  - transcriber1st.png, transcriber2ndphoto.png
  - scoutphoto1.png, scoutphoto2.png
  - levanttalk1.png, levanttalk2.png

Tech stacks should be specific and real (e.g., "Next.js · Apify · OpenAI"), not vague (e.g., "AI Agents · Web Search").

### Adding New Sections

To add animated sections to any page:
- Wrap content in element with `data-reveal="[direction]"` attribute
- Add optional `data-delay="[ms]"` for staggered entrance
- Use existing utility classes for consistency
- IntersectionObserver handles animation triggering automatically

### Modifying Contact Information

Contact details appear in multiple locations:
- Navigation CTAs
- Footer sections
- Contact panels (expandable sections)
- downloads.html form actions

Search for contact strings globally before updating.

### Image Assets

All images are organized in the `assets/` folder:
- **assets/images/personalphoto.jpg** - Profile photo
- **assets/images/projects/** - Portfolio project screenshots:
  - transcriber1st.png, transcriber2ndphoto.png
  - scoutphoto1.png, scoutphoto2.png
  - levanttalk1.png, levanttalk2.png
- **assets/images/books/** - Download resource cover images (3:4 aspect ratio recommended)

Images are referenced with paths like `assets/images/personalphoto.jpg` or `assets/images/projects/projectname.png`.

### Downloads Data Configuration

**File:** `assets/downloads-data.js`

This JavaScript file contains an array of downloadable resource objects. Each object structure:

```javascript
{
  id: 1,                                    // Unique numeric ID
  title: "عنوان المورد",                    // Resource title (Arabic)
  cover: "assets/images/books/cover.png",  // Path to cover image
  convertkitFormId: "8737582",             // ConvertKit Form ID (string)
  description: "وصف قصير للمورد"            // Brief description
}
```

**Critical:** Each resource MUST have its own unique ConvertKit form with an incentive configured. Do not reuse Form IDs across resources - this breaks segmentation tracking.

## Deployment

### Git and Vercel Workflow

This site uses continuous deployment via Vercel:
1. Push changes to git repository (GitHub)
2. Vercel automatically detects the push
3. Vercel rebuilds and deploys the site (30-60 seconds)
4. No build commands needed - pure static files

**Git Commands:**
```bash
git add .
git commit -m "Your commit message

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin main
```

### Static Hosting (Alternatives)

This site is deployment-ready for any static host:
- **Vercel**: Git-based continuous deployment (recommended, currently in use)
- **Netlify**: Drag/drop folder or git deploy
- **Traditional hosting**: Upload all files to public_html/www root

No build commands required - pure static files.

### Pre-Deployment Checklist

1. Verify all image paths resolve correctly
2. Test form submission (downloads.html)
3. Validate YouTube embed loads
4. Check all navigation links work
5. Test on mobile devices (responsive design)
6. Verify RTL/LTR layouts render correctly

### ConvertKit Integration & Lead Magnet System

**Critical Architecture:** The downloads system uses a serverless function pattern to keep API keys secure while enabling per-resource segmentation.

**Data Flow:**
1. User clicks download → `downloads.html` opens modal
2. User submits email → JavaScript sends `{email, first_name, form_id}` to `/api/subscribe`
3. Serverless function validates and forwards to ConvertKit API: `POST /v3/forms/{form_id}/subscribe`
4. ConvertKit sends incentive email with download link
5. ConvertKit tracks subscription per form (enables audience segmentation)

**Key Files:**
- `api/subscribe.js` - Vercel serverless function that proxies to ConvertKit API
- `assets/downloads-data.js` - Resource catalog with ConvertKit Form IDs
- `downloads.html` - Frontend that dynamically renders cards and handles form submission

**Environment Variables (Vercel Dashboard):**
- `CONVERTKIT_API_KEY` - Your ConvertKit API key (REQUIRED)

**Important:** Form IDs are NOT stored in environment variables. They live in `assets/downloads-data.js` as part of each resource object. This allows adding new downloads without touching Vercel configuration.

### Adding New Download Resources

See `docs/Add-downloads-guide.md` for step-by-step instructions. Summary:
1. Create ConvertKit form with incentive (PDF upload)
2. Copy Form ID from URL
3. Add cover image to `assets/images/books/`
4. Add resource object to `assets/downloads-data.js` with the Form ID
5. Push to git - Vercel auto-deploys

No Vercel configuration changes needed when adding new resources.

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled for animations and interactions
- IntersectionObserver API support (2016+)
- CSS Grid and Flexbox support
- Clipboard API for email copy feature

## Accessibility Features

- Semantic HTML structure
- Focus states on interactive elements (`.focus-ring` class)
- Respects reduced motion preferences
- ARIA labels on navigation and icons
- High contrast text/background ratios
- Keyboard navigation support
