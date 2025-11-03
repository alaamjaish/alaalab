# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Alaa, showcasing AI solutions and consulting services. The site is built with pure HTML and Tailwind CSS (CDN), requiring no build process. It's designed for Arabic-speaking audiences with RTL (right-to-left) support and bilingual typography.

## Architecture

### Core Pages Structure

The site consists of three main HTML files, each serving a specific purpose:

1. **index.html** - Main landing page with dark theme
   - Sticky header with navigation and logo
   - Hero section with personal photo and introduction
   - Embedded YouTube video (ID: eQ78L1ENCrE)
   - Portfolio showcase featuring "Transcriber" project with screenshots
   - Process explanation and value proposition sections
   - Multiple CTAs leading to consultation booking and downloads
   - Scroll-based reveal animations with IntersectionObserver

2. **downloads.html** - Lead capture page
   - Simple form collecting name and email
   - Success state that reveals after form submission
   - "While you're here" CTA section driving to consultation
   - Contact methods (WhatsApp, Email, Instagram, YouTube)
   - Returns users to index.html after engagement

3. **site3.html** - Light theme alternative
   - Functionally similar to index.html but with light color scheme
   - Optional page that can be linked from main site if needed

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

### Styling Architecture

- **Framework**: Tailwind CSS via CDN (no compilation needed)
- **Fonts**:
  - Cairo (Arabic text)
  - Inter/Geist Sans (English text)
- **Color System**:
  - Base colors: slate-based neutrals
  - Primary: blue tones (#0EA5E9, #0284C7)
  - Accent: teal tones (#14B8A6, #0D9488)
- **Custom Tailwind config**: Inline configuration in each HTML file's `<script>` tag
- **RTL Support**: All pages use `dir="rtl"` and `lang="ar"` attributes

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
1. Always preserve RTL and Arabic language attributes
2. Maintain consistent color variables defined in Tailwind config
3. Keep animation data attributes (`data-reveal`, `data-stagger`, `data-delay`) intact
4. Ensure mobile responsiveness (all pages use mobile-first approach)
5. Test accessibility features (focus states, ARIA labels)

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
- Contact panels
- downloads.html form actions

Search for contact strings globally before updating.

### Image Assets

Current images in root directory:
- personalphoto.jpg (profile photo)
- transcriber1st.png (project screenshot 1)
- transcriber2ndphoto.png (project screenshot 2)

All images referenced with relative paths - no subdirectories.

## Deployment

### Static Hosting (Recommended)

This site is deployment-ready for any static host:
- **Vercel**: Drag/drop folder or git deploy
- **Netlify**: Drag/drop or continuous deployment
- **Traditional hosting**: Upload all files to public_html/www root

No build commands required - pure static files.

### Pre-Deployment Checklist

1. Verify all image paths resolve correctly
2. Test form submission (may need to connect to email service)
3. Validate YouTube embed loads
4. Check all navigation links work
5. Test on mobile devices (responsive design)
6. Verify RTL layout renders correctly

### Post-Deployment Tasks

The form in downloads.html currently only shows success message client-side. To actually capture leads:
- Option 1: Connect to form service (Formspree, FormSubmit, Basin)
- Option 2: Integrate with email marketing (ConvertKit, Mailchimp)
- Option 3: Use serverless function (Vercel/Netlify Functions)

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