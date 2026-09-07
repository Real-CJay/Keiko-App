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
firestore.rules         paste this into the Firebase console
vercel.json             caching headers
```

---

## Deploy it in five minutes (no account, local-only)

You can skip the database entirely at first. The app works fully without it —
sign-in just stays switched off and everything is stored in that browser.

1. Create a repo, push this folder, and import it on [vercel.com](https://vercel.com) — no build
   command, no framework preset, output directory is the root.
2. Or, faster: install the CLI and run `vercel` from this folder, then `vercel --prod`.

That's it. It's a static site.

---

## Turn on sign-in and sync (Firebase)

Free, no card, and no project limit to run into. The whole app uses a few kilobytes and maybe a
hundred database reads a day — the free Spark plan allows 50,000.

### 1. Create the project

[console.firebase.google.com](https://console.firebase.google.com) → **Add project**. Give it a
name. You can turn Google Analytics off; it isn't needed.

### 2. Turn on email sign-in

**Build → Authentication → Get started → Email/Password → Enable → Save.**

Unlike some services this needs no email confirmation step, so accounts work the moment you
create them.

### 3. Create the database

**Build → Firestore Database → Create database.** Pick a location near you
(`asia-south1` is the closest to Sri Lanka). Start in **production mode** — the rules in the
next step replace whatever it starts with.

### 4. Publish the security rules

**Firestore Database → Rules.** Delete what is there, paste the whole of `firestore.rules`
from this folder, and press **Publish**.

Do not skip this. Without it, either nothing works or everything is public.

### 5. Register a web app and copy the config

**Project settings (the gear icon) → General → Your apps → the `</>` web icon.** Give it a
nickname, skip Firebase Hosting, and it shows you a `firebaseConfig` object. Copy those values
into `config.js`.

**The apiKey is not a secret.** Google documents this explicitly — it only identifies your
project. The rules from step 4 are what protect your data. It is fine in a public repo.

### 6. Authorise your domain

**Authentication → Settings → Authorized domains → Add domain**, and add your Vercel domain
(`your-app.vercel.app`). Sign-in is blocked from domains not on this list.

### 7. Redeploy, then sign up inside the app

Settings → Account → email and password → **Create account**. Do the same on your other device
with the same details and the two will merge.

### Adding Google sign-in later (optional)

**Authentication → Sign-in method → Google → Enable**, then set `ENABLE_GOOGLE: true` in
`config.js`.

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

Each day is one Firestore document at `users/{uid}/days/{date}`, carrying a millisecond
timestamp of when you last changed it. On sync the app fetches the days that changed since it
last looked, keeps whichever version of each day has the newer timestamp, and pushes back
anything local that is ahead. Settings live in a single document at `users/{uid}/meta/settings`
and work the same way.

Automatic syncs are incremental, so a normal day costs a handful of reads. The **Sync now**
button does a full re-read of everything, which is the one to press if two devices ever look
out of step.

This is last-write-wins per day. For one person on two devices it is exactly right. It is not
built for two people editing the same day at the same moment — and it doesn't need to be.

Syncing happens on open, a couple of seconds after any change, when the tab becomes visible
again, and when you come back online.

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

The Firebase library version is pinned in three `<script>` tags at the bottom of `index.html`.
If one ever 404s, bump all three to the current release.

---

## Your data

Stored in `localStorage` on each device, and in your own Firebase project if you set one up.
Nothing goes anywhere else. There is no analytics, no tracking, and the only third-party
requests the page makes are Google Fonts and the Firebase library from Google's CDN.

Settings → Backup exports everything as JSON, and imports it back. Worth doing occasionally
even with sync switched on.

---

## The training plan itself

Seven days: easy run Monday, class Tuesday, solo karate Wednesday, team intervals Thursday,
class Friday, long run Saturday, rest Sunday. Built around a physiotherapist's programme for a
lower back and hip, so the guide is deliberately conservative about kicking height, forced
stretching, and how fast running volume goes up.

If your physio tells you something different from what is written here, theirs wins.
