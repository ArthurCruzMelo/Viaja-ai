# Viaja AI

Discover cities through the eyes of locals. Find authentic travel experiences beyond the usual tourist attractions.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API routes (Node.js)
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI API
- **Deployment**: Vercel-ready

## Features

- **Search by city** — Type a destination and get experiences submitted by locals
- **Experience cards** — Title, description, category, neighborhood, best time, price level, local tip
- **Submit experiences** — Locals can add new tips via a form
- **AI enhancement** — OpenAI improves descriptions, generates tags, and ranks authenticity
- **Smart filters** — Filter by Food, Bars, Nature, Culture, Hidden gems

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. (Optional) Run `supabase/seed.sql` for sample data
4. Copy your project URL and anon key from **Settings → API**

### 3. Environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
OPENAI_API_KEY=sk-your_openai_key
```

Copy from `.env.local.example` if needed.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
├── app/
│   ├── api/experiences/
│   │   ├── search/route.ts   # GET ?city=&category=
│   │   └── submit/route.ts   # POST new experience
│   ├── search/page.tsx       # Search results + filters
│   ├── submit/page.tsx       # Submit form
│   ├── layout.tsx
│   └── page.tsx              # Home
├── components/
│   ├── CategoryFilter.tsx
│   ├── ExperienceCard.tsx
│   └── SearchForm.tsx
├── lib/
│   ├── ai.ts                 # OpenAI integration
│   ├── supabase.ts           # DB client + helpers
│   └── types.ts
├── supabase/
│   ├── schema.sql
│   └── seed.sql
```

## API

### `GET /api/experiences/search?city=Belo Horizonte&category=all`

Returns experiences for the given city, sorted by authenticity. `category` can be `all`, `Food`, `Bars`, etc.

### `POST /api/experiences/submit`

Submit a new experience. Body:

```json
{
  "city": "Belo Horizonte",
  "title": "Hidden rooftop bar",
  "description": "...",
  "category": "Bars",
  "neighborhood": "Santa Tereza",
  "local_tip": "Arrive before 7pm",
  "price_level": "$$",
  "best_time": "Sunset",
  "submitted_by": "optional"
}
```

AI will enhance the description, add tags, and set authenticity score (if `OPENAI_API_KEY` is set).

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add the same env vars
4. Deploy
