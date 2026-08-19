# Deploying this website — the complete walkthrough

From this folder to a live website on your own domain, hosted free on **Netlify**.

Total time: about **35 minutes**. Total cost: **only the domain name** (roughly ₹850–1,750
per year depending on where you buy it). The hosting itself is free and stays free.

- **Repository:** [github.com/shubh-45/shubham-sansthan-website](https://github.com/shubh-45/shubham-sansthan-website)
- **Local folder:** `/Users/shubhamvyas/Desktop/SSB`
- **Branch:** `main`

---

## Part 1 — Push the code to GitHub

> The repository is already cloned here and the site is already committed.
> This part is just the push.

Open Terminal:

```bash
cd /Users/shubhamvyas/Desktop/SSB
```

```bash
git log --oneline
```

You should see one commit. Now push it:

```bash
git push -u origin main
```

**If it asks for a username and password in the Terminal**, that will not work — GitHub
stopped accepting account passwords over Git. Two ways to fix it:

*Option A — GitHub CLI (easiest):*

```bash
brew install gh && gh auth login
```

Choose **GitHub.com** → **HTTPS** → **Yes** (authenticate Git with your GitHub credentials)
→ **Login with a web browser**. Then run the `git push` again.

*Option B — Personal Access Token:*
Go to [github.com/settings/tokens](https://github.com/settings/tokens) → **Generate new
token (classic)** → tick the **repo** scope → generate. When Git asks for a password, paste
the token instead. macOS Keychain will remember it.

Refresh the repository page on GitHub — all the files should be there.

---

## Part 2 — Deploy on Netlify

1. Sign in at [app.netlify.com](https://app.netlify.com).
2. **Add new site** → **Import an existing project** → **Deploy with GitHub**.
3. Authorise Netlify. When GitHub asks which repositories to grant access to, pick
   **Only select repositories** and choose `shubham-sansthan-website`.
4. Select the repository.
5. On the build settings screen:

   | Field | Value |
   |---|---|
   | Branch to deploy | `main` |
   | Base directory | *leave empty* |
   | Build command | **leave completely empty** |
   | Publish directory | `.` |

   These are already set by the `netlify.toml` file in the repository, so Netlify should
   fill them in for you. If it suggests a build command, delete it.

6. Click **Deploy**. It takes about twenty seconds.

> **This is the step people get wrong.** There is no build. The files in the repository
> *are* the website. An empty build command is the correct answer, not an oversight.

### Give the site a proper name

Netlify assigns a random name like `resplendent-marzipan-a1b2c3.netlify.app`.

**Site configuration** → **Site details** → **Change site name** → set it to
`subham-sansthan`.

Your site is now live at `https://subham-sansthan.netlify.app`. **Open it and click through
every page** before going any further.

---

## Part 3 — Choose and buy a domain

### The name

Recommended, in order:

| Domain | Why |
|---|---|
| **`subhamsansthan.org`** ✅ | Spells the registered name exactly. `.org` is the conventional non-profit domain and signals that to donors and government departments. **Take this one.** |
| `ssbarmer.org` | Short, matches the **S.S.B.** emblem *and* the old blog address `ssbarmer.blogspot.com`. Easy to say over a phone. Good second choice, or buy it cheaply as a redirect. |
| `subhamsansthan.in` | Clearly Indian, usually cheaper. Slightly less authoritative than `.org` for an NGO. |
| `subhamsansthan.org.in` | Cheapest of the lot, but a mouthful. |

The site's metadata is currently set to **`subhamsansthan.org`**. If you buy something else,
Part 4 tells you how to change it in one command.

> Note the spelling: the registered name is **Subham**, not Shubham. It matches your existing
> email address, `subhamsansthanbme@gmail.com`. Buy the domain that matches the registration.

### Where to buy it — cheapest first

| Registrar | Approx. `.org` / year | Notes |
|---|---|---|
| **[Porkbun](https://porkbun.com)** ✅ | ~₹850–1,000 | Usually the cheapest honest price. Free WHOIS privacy. No renewal price jump. |
| **[Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)** ✅ | ~₹850–1,000 | Sells at exact wholesale cost, never marks up renewals. Requires you to use Cloudflare's DNS — **which is fine, you can still host on Netlify** (see Part 5b). |
| **[Namecheap](https://www.namecheap.com)** | ~₹1,100–1,400 | Reliable, honest renewals, good support. |
| **Netlify Domains** | ~₹1,300–1,750 | The convenient option — one dashboard, DNS and HTTPS configured automatically, nothing to wire up. You pay roughly ₹400–700/year extra for that convenience. |
| **GoDaddy / BigRock / Hostinger** | ₹99–499 *first year*, then ₹1,500–2,000 | ⚠️ Avoid. The first year is cheap advertising; renewals are expensive and the upsells are relentless. |

**Honest summary:** the gap between cheapest and most convenient is about **₹500 a year**.

- Want the lowest long-term cost → **Porkbun** or **Cloudflare Registrar**.
- Want the fewest moving parts → **buy it inside Netlify** and skip Part 5b entirely.
- On a tight budget → a **`.in`** domain, often ₹500–900/year.

> ⚠️ **Prices move.** Check the actual renewal price — not just the first-year price —
> before you pay.

> ✅ **Turn on auto-renew, and set a calendar reminder a month before expiry.** Forgetting to
> renew is the single most common way a small organisation loses its website.

> ✅ **Take WHOIS privacy** if it is free (Porkbun, Cloudflare and Namecheap include it). It
> keeps a home address and phone number out of a public database.

---

## Part 4 — Update the domain inside the site

The site ships with `subhamsansthan.org` in its metadata. **If you bought exactly that, skip
this part.** Otherwise:

```bash
cd /Users/shubhamvyas/Desktop/SSB
```

```bash
grep -rl "subhamsansthan.org" . --include="*.html" --include="*.xml" --include="*.txt" | xargs sed -i '' 's|subhamsansthan\.org|YOUR-REAL-DOMAIN.org|g'
```

Replace `YOUR-REAL-DOMAIN.org` with what you actually bought. Check it worked, then push:

```bash
grep -rh "og:url" index.html
```

```bash
git add . && git commit -m "Point metadata at the live domain" && git push
```

Netlify redeploys automatically, about twenty seconds after the push.

---

## Part 5 — Connect the domain

In Netlify: **Domain management** → **Add a domain** → type your domain → **Verify** → **Add**.

What happens next depends on where you bought it.

### 5a. If you bought the domain from Netlify

Nothing to do. DNS and the HTTPS certificate are configured automatically. Skip to Part 6.

### 5b. If you bought it elsewhere (Porkbun, Cloudflare, Namecheap)

You have two ways to connect it. **Option 1 is simpler and is what I recommend.**

**Option 1 — Hand DNS to Netlify (easiest)**

1. Netlify shows you four nameservers, like `dns1.p01.nsone.net`.
2. Go to your registrar → find **Nameservers** → switch from "default" to "custom" → paste
   in all four Netlify nameservers.
3. Save. Propagation takes anything from ten minutes to a few hours.

**Option 2 — Keep DNS at your registrar**

Add two records at your registrar's DNS panel:

| Type | Name | Value |
|---|---|---|
| `A` (or `ALIAS`/`ANAME` if offered) | `@` | `75.2.60.5` |
| `CNAME` | `www` | `subham-sansthan.netlify.app` |

Use `ALIAS`/`ANAME` for the root domain if your registrar supports it — Cloudflare and
Porkbun both do, and it handles Netlify IP changes automatically. Netlify shows the exact
current values on the domain screen; **use what it shows you** rather than copying the IP
above blindly.

### HTTPS

Once DNS resolves, Netlify issues a free Let's Encrypt certificate automatically — usually
within a few minutes. **Domain management** → **HTTPS** → confirm the certificate is active,
and switch on **Force HTTPS**. You never need to buy a certificate.

Also set your preferred version — Netlify will ask whether `www.subhamsansthan.org` or the
bare `subhamsansthan.org` is primary, and will redirect the other to it. Either choice is
fine; just pick one.

---

## Part 6 — Get found on Google

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. **Add property** → **Domain** → enter your domain.
3. Verify with the TXT record it gives you, added in Netlify's **DNS** panel (or your
   registrar's, if you chose Option 2).
4. Once verified, go to **Sitemaps** and submit: `sitemap.xml`

Also create a **Google Business Profile** at [business.google.com](https://business.google.com)
for "Subham Sansthan, Panghat Road, Barmer". For a local organisation this brings more
visitors than search-engine work does.

Indexing takes a few days to a couple of weeks. Be patient.

---

## Part 7 — A free email address on your own domain (optional)

`subhamsansthanbme@gmail.com` works, but `contact@subhamsansthan.org` reads considerably more
credibly to a government department or a donor.

Netlify does **not** do email. Two free options:

- **[Cloudflare Email Routing](https://developers.cloudflare.com/email-routing/)** — free,
  unlimited forwarding. Requires your DNS to be on Cloudflare, so this pairs naturally with
  buying the domain at Cloudflare Registrar and using **Option 2** in Part 5b.
- **[ImprovMX](https://improvmx.com)** — free forwarding, works with any DNS provider. Add
  the two MX records it gives you.

Either way, mail sent to `contact@subhamsansthan.org` lands in the existing Gmail inbox.
(To *send* from the new address you would need a paid mailbox, but forwarding alone covers
most of the benefit.)

If you set this up, update the address on `contact.html` and in the footer of every page.

---

## Part 8 — Keeping it up to date

The routine, every time you change anything:

```bash
cd /Users/shubhamvyas/Desktop/SSB
```

```bash
git add .
```

```bash
git commit -m "Add photographs from the 2026 awareness camp"
```

```bash
git push
```

That is the whole workflow. The live site updates by itself, about twenty seconds later.

### To preview changes before pushing

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Press `Ctrl + C` in the Terminal to stop.

### Deploy previews

Netlify builds a preview for every pull request automatically, at its own temporary URL.
Useful when you want a second opinion before something goes live.

### If you break something

```bash
git log --oneline
```

Find the commit from before the breakage, then:

```bash
git revert COMMIT-ID && git push
```

Netlify also keeps every past deploy. **Deploys** → pick an older one → **Publish deploy**
rolls the live site back instantly, without touching Git.

---

## Adding a contact form later

The site has no backend, so it cannot process a form on its own. Netlify solves this for
free — this is one of the genuine advantages of choosing it:

**Netlify Forms** — add `netlify` and a `name` to a normal form tag and Netlify captures the
submissions for you, no server and no third party:

```html
<form name="enquiry" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="enquiry">
  <label>Your name <input type="text" name="name" required></label>
  <label>Your message <textarea name="message" required></textarea></label>
  <button type="submit">Send</button>
</form>
```

Submissions appear under **Forms** in the Netlify dashboard, and can be emailed to you.
The free tier covers 100 submissions a month.

For now the `mailto:`, `tel:` and WhatsApp links on the contact page do the same job with
less to go wrong.

---

## Appendix — other free hosts

If you ever want to move, the repository works unchanged on any of these:

| Host | Notes |
|---|---|
| **Cloudflare Pages** | Unlimited bandwidth and the largest Indian edge network (~10 cities). Marginally faster in Rajasthan. Set build command empty, output directory `/`. |
| **GitHub Pages** | Simplest of all. **Settings** → **Pages** → Source: `main`, folder `/ (root)`. The `.nojekyll` file in this repo makes it serve the files as-is. ~100 GB/month soft limit. |
| **Vercel** | Fine, but tuned for Next.js; overkill here. |

Moving hosts is about ten minutes' work — nothing in the code is Netlify-specific except
`netlify.toml`, which other hosts simply ignore.

---

## Quick reference

| Thing | Where |
|---|---|
| Source code | [github.com/shubh-45/shubham-sansthan-website](https://github.com/shubh-45/shubham-sansthan-website) |
| Hosting dashboard | [app.netlify.com](https://app.netlify.com) |
| Domain renewal | Your registrar — **auto-renew on** |
| Search performance | [search.google.com/search-console](https://search.google.com/search-console) |
| Local folder | `/Users/shubhamvyas/Desktop/SSB` |

**The only recurring cost or task is the domain renewal, once a year.** Everything else runs
itself.
