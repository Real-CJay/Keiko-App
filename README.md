# Daily Keiko

A karate and running tracker built as a plain, installable web app. No build step, no
framework, no bundler — just files you can drop on a host. Sign in on your phone and your PC
and your training follows you between them; with no account it still works completely, storing
everything on the one device.

---

## What is in here

```
index.html              the whole interface
styles.css              all the styling
app.js                  the app, the guide renderer, and the sync layer
guide.js                every exercise written out in full
config.js               ← the only file you need to edit
sw.js                   service worker (offline support)
manifest.webmanifest    makes it installable
icons/                  app icons
supabase/schema.sql     run this once in Supabase
vercel.json             caching headers
```

---

## Deploy it in five minutes (no account, local-only)

You can skip Supabase entirely at first. The app works fully without it — sign-in just stays
switched off and everything is stored in that browser.

1. Create a repo, push this folder, and import it on [vercel.com](https://vercel.com) — no build
   command, no framework preset, output directory is the root.
2. Or, faster: install the CLI and run `vercel` from this folder, then `vercel --prod`.

That's it. It's a static site.

---

## Turn on sign-in and sync

### 1. Create the Supabase project

Go to [supabase.com](https://supabase.com), create a free project, and wait for it to finish
provisioning.

### 2. Create the tables

In your project: **SQL Editor → New query**. Paste the whole of `supabase/schema.sql` and run
it. This creates two tables and switches on Row Level Security, which is what makes each row
readable only by the person who wrote it.

### 3. Turn off email confirmation (optional, but do it)

**Authentication → Sign In / Providers → Email** and turn off *Confirm email*. Without this,
signing up sends you a confirmation link before you can use the account — fine, but a nuisance
for a personal app.

### 4. Paste your keys into `config.js`

**Project Settings → API**:

```js
window.KEIKO_CONFIG = {
  SUPABASE_URL: "https://xxxxxxxxxxxx.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi...",
  ENABLE_GOOGLE: false
};
```

**The anon key is meant to be public.** It is safe in this file and safe in a public repo — it
is the key browsers are supposed to hold. What protects your data is Row Level Security from
step 2. The one you must never put here is the `service_role` key, which bypasses all of it.

### 5. Redeploy, then sign up inside the app

Settings → Account → enter an email and password → **Create account**. Do the same on your
other device with the same details and they will merge.

### Adding Google sign-in later (optional)

**Authentication → Providers → Google**, follow their setup, add
`https://your-app.vercel.app` to your Supabase **Site URL** and redirect allow-list, then set
`ENABLE_GOOGLE: true` in `config.js`.

---

## Installing it on a phone

- **Android (Brave, Chrome):** open the site, ⋮ menu → *Install app* or *Add to Home screen*
- **iPhone:** open in Safari, Share → *Add to Home Screen*
- **Desktop:** an install icon appears at the right of the address bar

This is why it has to be hosted: no browser will add a downloaded local file to a home screen.

Once installed it opens full screen, works with no internet, and anything you tick offline
syncs the next time you have a connection.

---

## How syncing works

Each day is one row, carrying a millisecond timestamp of when you last changed it. On sync the
app pulls every row, keeps whichever version of each day has the newer timestamp, and pushes
back anything local that is newer. Settings sync the same way as a single row.

This is last-write-wins per day. For one person on two devices it is exactly right. It is not
built for two people editing the same day at the same moment — and it doesn't need to be.

Syncing happens on open, a couple of seconds after any change, when the tab becomes visible
again, and when you come back online. There is a **Sync now** button if you want to force it.

The chip at the top of the screen shows the state: *Synced*, *Syncing…*, *Offline*, or *Sync
failed*.

---

## About notifications

The in-app reminders only fire while the app is actually open. That is a browser limitation on
both Android and iOS, not something a different app design would fix.

**Use the calendar export instead.** Settings → Calendar export gives you either a downloadable
`.ics` file or one-tap Google Calendar links. Your phone's calendar is a real app with real
notification permissions, so those alarms fire whether this app is open, closed, or uninstalled.

---

## Changing the training plan

Everything lives in two places:

- `app.js` — the `BLOCKS` object (exercises, cues, doses) and the `DAYS` object (which blocks
  each weekday runs, and for how many minutes)
- `guide.js` — the written instructions, keyed to match `BLOCKS` exactly

Add an exercise to `BLOCKS.core.items` and it appears on every day that runs the core block.
Add an entry at the same index in `guide.js` under `blocks.core` and the little **?** button
next to it starts working.

After changing any file, bump `CACHE_VERSION` at the top of `sw.js` so installed copies pick up
the new version instead of serving the cached one.

---

## Your data

Stored in `localStorage` on each device, and in your own Supabase project if you set one up.
Nothing goes anywhere else. There is no analytics, no tracking, and the only third-party
requests the page makes are Google Fonts and the Supabase client library on a CDN.

Settings → Backup exports everything as JSON, and imports it back. Worth doing occasionally
even with sync switched on.

---

## The training plan itself

Seven days: easy run Monday, class Tuesday, solo karate Wednesday, team intervals Thursday,
class Friday, long run Saturday, rest Sunday. Built around a physiotherapist's programme for a
lower back and hip, so the guide is deliberately conservative about kicking height, forced
stretching, and how fast running volume goes up.

If your physio tells you something different from what is written here, theirs wins.
