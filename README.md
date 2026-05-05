# TrendingVerse CMS

## 1) System architecture overview
Next.js App Router app with public newsroom frontend + admin SaaS dashboard. Supabase provides Postgres, Auth, Storage, and RLS. AI services are exposed through secure server routes using Gemini first and OpenAI fallback.

## 2) Folder structure
- `app/(public)` website routes
- `app/admin` authenticated CMS dashboard
- `app/api` backend APIs (AI, articles, upload, analytics, affiliate)
- `lib` Supabase + AI clients + utils
- `sql/schema.sql` production schema + indexes + RLS policies

## 3) Complete source code
All files are in this repository.

## 4) Supabase SQL schema + RLS policies
Execute `sql/schema.sql` in Supabase SQL editor.

## 5) Environment variables
Copy `.env.example` to `.env.local` and fill values.

## 6) AI integration setup
- Primary: `GEMINI_API_KEY`
- Fallback: `OPENAI_API_KEY`
- APIs: `/api/ai/generate`, `/api/ai/seo`

## 7) Monetization setup
- Insert ad slots (`header`, `in-article`, `sidebar`) in `ad_slots`
- Manage affiliate keywords in `affiliate_links`
- Sponsored posts via `articles.is_sponsored`
- Revenue metrics via `article_views` and `ctr_simulated`

## 8) Deployment guide
1. Create Supabase project and run SQL.
2. Create `media` storage bucket (public).
3. Deploy repo to Vercel.
4. Set env vars in Vercel.
5. Configure domain `trendingverse.online`.

## 9) Post-deployment checklist
- Verify admin login.
- Create categories/tags.
- Publish first article.
- Verify ad slots render and tracking works.
- Test AI endpoints and SEO scoring.
