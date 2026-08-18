# Rotary Club of Kampala City — Sign-in & Make-Up Card System

A standalone web app (no Claude account needed by anyone using it).

## What you need (all free)
- A GitHub account
- A Supabase account (sign in with GitHub)
- A Vercel account (sign in with GitHub)

## Setup — do this once

### 1. Create the database (Supabase)
1. Go to supabase.com → New project. Pick any name/password/region.
2. Wait ~2 minutes for it to finish setting up.
3. In the left sidebar, click **SQL Editor** → **New query**.
4. Open `supabase-schema.sql` from this folder, copy all of it, paste into the SQL editor, click **Run**.
5. In the left sidebar, click **Project Settings → API**. You'll see:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (a long string)
   Keep this tab open — you'll need both in step 3.

### 2. Put the code on GitHub
1. Go to github.com → click **+** → **New repository**. Name it `rotary-club-kampala-city`. Keep it Public or Private, either is fine. Click **Create repository**.
2. On the new repo's page, click **uploading an existing file**.
3. Drag in every file from this folder (keep the `src` folder structure intact).
4. Click **Commit changes**.

### 3. Deploy it (Vercel)
1. Go to vercel.com → **Add New → Project**.
2. Choose **Import** next to your `rotary-club-kampala-city` GitHub repo.
3. Before clicking Deploy, open **Environment Variables** and add:
   - `VITE_SUPABASE_URL` → paste your Project URL from step 1
   - `VITE_SUPABASE_ANON_KEY` → paste your anon public key from step 1
4. Click **Deploy**. Wait ~1 minute.
5. You'll get a real URL like `rotary-club-kampala-city.vercel.app` — that's your permanent link. No Claude account needed by anyone who opens it.

### 4. Finish setup in the app itself
1. Open your new Vercel URL.
2. Go to **Admin** → PIN is **1905** by default → change it right away in Settings.
3. Add your buddy groups.
4. In Settings, paste your own Vercel URL into "Sign-in link" and save — the QR code will point to your live app.

## Making changes later
Come back to Claude, ask for the change, get the updated `App.jsx`, then in GitHub: open the file, click the pencil (edit) icon, paste the new content, commit. Vercel automatically redeploys within a minute — no need to touch Vercel or Supabase again for code changes.
