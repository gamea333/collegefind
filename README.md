<<<<<<< HEAD
# CollegeFind

Indian college discovery platform built with Next.js 14, Prisma, PostgreSQL, NextAuth, Zustand, and React Query.

## Tech stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (Google OAuth, database sessions)
- **State:** Zustand (filters), TanStack React Query (server state)

## Getting started

### 1. Environment

Copy `.env.example` to `.env.local` and fill in values:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/collegefind
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<openssl rand -base64 32>
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Create [Google OAuth credentials](https://console.cloud.google.com/apis/credentials) with redirect URI:

`http://localhost:3000/api/auth/callback/google`

### 2. Install & database

```bash
npm install
npx prisma db push
npm run db:seed
```

### 3. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

| Path | Purpose |
|------|---------|
| `prisma/schema.prisma` | College, User, SavedCollege, NextAuth models |
| `prisma/seed.ts` | 28 Indian colleges (IITs, NITs, private, MBA) |
| `types/college.ts` | College domain types |
| `types/filters.ts` | Search/filter types and defaults |
| `lib/prisma.ts` | Prisma singleton |
| `lib/auth.ts` | NextAuth configuration |
| `lib/utils.ts` | Fee/package formatting helpers |
| `store/filter-store.ts` | Zustand filter state |
| `app/api/auth/[...nextauth]/` | Auth API route |

## Scripts

- `npm run dev` — development server
- `npm run db:seed` — seed colleges
- `npm run db:studio` — Prisma Studio
- `npm run build` — production build
=======
# collegefind
AI Software Engineer Internship Task Frontend
>>>>>>> d08d794536972fcf4cc813545ff24ca6d2730959
