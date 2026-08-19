# Subham Sansthan, Barmer — website

A static website for **Subham Sansthan (शुभम् संस्थान), Barmer, Rajasthan** — a society
registered in 2000 under the Rajasthan Societies Registration Act, 1958
(Reg. No. 64/Bad/2001–02).

It replaces the old Blogger site at `ssbarmer.blogspot.com`. All the content there was
in Hindi, and most of it was locked inside images. It has been transcribed, translated
into English, and rewritten as a proper website.

---

## What this is, technically

Plain HTML, CSS and a little vanilla JavaScript. **No build step. No framework. No backend.
No database.** You can open `index.html` by double-clicking it and the whole site works.

That is deliberate. A site like this should still work in ten years, when nobody remembers
which version of which tool built it, and it should cost nothing to host, forever.

```
SSB/
├── index.html              Home
├── about.html              About the Sansthan, vision & mission, registrations
├── our-work.html           The nine programme areas + track record
├── barmer.html             Barmer: history, geography, culture, old way of life
├── changing-barmer.html    How Barmer is moving past its old customs
├── contact.html            Address, phone, email, ways to help
├── 404.html                Shown when a URL is mistyped
├── sitemap.xml             For Google — update the domain after you buy one
├── robots.txt              Ditto
├── netlify.toml            Deploy settings + security headers (version-controlled)
├── .nojekyll               Only needed if you ever switch to GitHub Pages
└── assets/
    ├── css/style.css       The whole design system, one file
    ├── js/main.js          Menu, theme toggle, scroll reveal. ~120 lines.
    └── img/                Logo, letterhead, photographs, favicon, share image
```

**Total page weight is well under 500 KB per page**, which matters — a good share of the
people this site is for are on a mobile connection in western Rajasthan.

---

## Features

- Fully responsive; designed mobile-first
- Automatic light/dark theme, with a manual toggle that is remembered
- Accessible: semantic HTML, skip link, visible focus rings, real alt text, keyboard-operable menu
- SEO-ready: per-page titles and descriptions, canonical URLs, Open Graph tags,
  `NGO` structured data (JSON-LD), sitemap and robots.txt
- Works with JavaScript switched off — JS only adds the menu, theme toggle and animations
- Zero third-party requests except Google Fonts (no trackers, no analytics, no cookie banner needed)

---

## How to edit the site

You only need a text editor.

**To change some words:** open the `.html` file, find the sentence, change it, save.

**To add a photograph:**
1. Put the image file in `assets/img/`. Resize it first — nothing wider than about 1600px.
2. In the HTML, copy an existing block that looks like this and change the file name and text:

```html
<figure class="figure">
  <div class="media">
    <img src="assets/img/your-photo.jpg" alt="Describe what is in the photo" loading="lazy">
  </div>
  <figcaption>A short caption.</figcaption>
</figure>
```

**To add a new programme card**, copy an existing `<article class="card">…</article>` block
on `our-work.html` and edit it.

**To change the colours**, edit the variables at the top of `assets/css/style.css`
(`--purple`, `--terracotta`, `--marigold`, `--bg`). Everything else follows from them.

> The site's metadata currently points at `subhamsansthan.org`. If you buy a different
> domain, DEPLOYMENT.md Part 4 has the one-line find-and-replace.

---

## Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for the full step-by-step: Git, GitHub, free hosting,
buying a domain, HTTPS, and getting listed on Google.

Short version: push to GitHub, connect the repo to **Netlify**, point your domain at it.
Free, permanently — the domain is the only thing that costs money.

---

## Content provenance

See **[CONTENT-NOTES.md](CONTENT-NOTES.md)** — it records exactly which sentences are
translated from the original Blogger site and which were written new for this website, so
the Sansthan can check and approve them.
