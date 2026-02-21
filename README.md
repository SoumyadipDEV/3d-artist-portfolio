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
VITE_GOOGLE_DRIVE_BASE_URL=https://drive.google.com/file/d/
```

`VITE_GOOGLE_DRIVE_BASE_URL` is optional because the same default is already used in `src/lib/googleDrive.ts`.

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
Replace `HERO_VIDEO_FILE_ID` with your Google Drive file ID.

- `src/data/projects.ts`
Add your real projects (title, description, category, tools, and `driveFileId`).

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
  lib/               Utility functions (Google Drive URL helpers, cn)
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
