# 3D Artist Portfolio

A modern, animated 3D artist portfolio website built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components.

This project includes a multi-page experience for:
- Home hero section with background video
- About page with bio, education timeline, and skill bars
- Work gallery with modal previews
- Contact page with social links and form UI

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS + PostCSS
- shadcn/ui + Radix UI primitives
- Framer Motion animations
- React Router
- TanStack Query
- Vitest + Testing Library

## Prerequisites

- Node.js 18+ (recommended)
- npm (or Bun)

## Getting Started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:8080`.

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_STORAGE_BUCKET=portfolio-videos
VITE_SUPABASE_STORAGE_BASE_URL=https://your-project-ref.supabase.co/storage/v1/object/public/portfolio-videos
VITE_HERO_VIDEO_URL=https://your-project-ref.supabase.co/storage/v1/object/public/portfolio-videos/hero/hero-loop.mp4
VITE_PROJECT_VIDEO_1_URL=https://your-project-ref.supabase.co/storage/v1/object/public/portfolio-videos/work/neon-genesis.mp4
```

Use public Supabase Storage URLs for all hero/work videos and posters.

## Video Interactions Setup

This project now supports per-video:
- play counts
- like counts
- likes gated by visitor name + email (one like per email per project)

Apply the SQL migration in your Supabase SQL editor:

`supabase/migrations/20260224_video_interactions.sql`

The frontend calls these RPCs:
- `increment_video_play_count(p_project_id text)`
- `submit_video_like(p_project_id text, p_visitor_name text, p_visitor_email text)`

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run build:dev` - development-mode build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint
- `npm run test` - run tests once with Vitest
- `npm run test:watch` - run tests in watch mode

## Customize This Portfolio

Update these files with your own details:

- `src/components/Hero.tsx`
Set `VITE_HERO_VIDEO_URL` to your Supabase public video URL.

- `src/data/projects.ts`
Add your real projects (title, description, category, tools, plus `videoUrl` and `posterUrl`).

- `src/components/AboutMe.tsx`
Replace placeholder biography and education data.

- `src/components/ContactSection.tsx`
Replace phone number and social links.  
Note: the form currently uses `preventDefault()` and does not submit to a backend service.

- `src/components/Navbar.tsx`
Update the displayed artist name.

## Project Structure

```text
src/
  components/        Reusable UI and page sections
  components/ui/     shadcn/ui components
  data/              Portfolio data (projects, skills)
  lib/               Utility functions (Supabase URL helpers, cn)
  pages/             Route pages (Home, About, Work, Contact, 404)
  test/              Vitest setup and tests
```

## Testing

Run all tests:

```bash
npm run test
```

## Build and Deploy

Create production files:

```bash
npm run build
```

The output is generated in `dist/` and can be deployed to any static hosting platform (Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc.).

## Notes

- The repository includes both `package-lock.json` and `bun.lockb`, so you can use either npm or Bun.
- Many portfolio data points are placeholders and should be replaced before publishing.
