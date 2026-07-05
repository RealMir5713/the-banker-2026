# The Banker 2026 Competition Registration

Premium Vietnamese registration website for **THE BANKER 2026** with separate competition and pre-competition webinar landing pages.

## Landing Pages

- `/` - student registration for The Banker 2026 competition
- `/webinar` - student registration for the Open Banking webinar on 14/07/2026

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Shadcn-style UI primitives
- React Hook Form + Zod
- Supabase

## Local Setup

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_DASHBOARD_TOKEN=change-this-admin-token
```

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor.

The `registrations` table stores:

- `id`
- `full_name`
- `phone`
- `email`
- `gender`
- `birth_date`
- `facebook_url`
- `hometown`
- `current_city`
- `university`
- `year`
- `major`
- `class_info`
- `student_id`
- `gpa`
- `gpa_scale`
- `english_certificates`
- `professional_certificates`
- `other_certificates`
- `awards`
- `team_name`
- `proof_links`
- `referral_source`
- `expectations`
- `created_at`

The `webinar_registrations` table stores webinar sign-ups separately:

- `id`
- `full_name`
- `phone`
- `email`
- `facebook_url`
- `university`
- `year`
- `student_id`
- `class_info`
- `speaker_question`
- `organizer_message`
- `proof_post_files`
- `proof_fanpage_files`
- `created_at`

The private `webinar-proofs` Storage bucket keeps all uploaded proof images.
Each proof field accepts up to five images with a maximum size of 5 MB per
file. Server-side uploads require `SUPABASE_SERVICE_ROLE_KEY`.

Public users can insert registrations. Public reads are disabled; `/admin` reads through the server using `SUPABASE_SERVICE_ROLE_KEY` and requires `ADMIN_DASHBOARD_TOKEN`.

See [docs/SUPABASE-WEBINAR.md](docs/SUPABASE-WEBINAR.md) for the complete
setup and organizer workflow.

## Admin

Open `/admin`, enter `ADMIN_DASHBOARD_TOKEN`, then view registrations, search, export CSV, and review statistics.

## Deploy To Vercel

1. Push this folder to a Git repository.
2. Import the project in Vercel.
3. Set the environment variables listed above in Vercel Project Settings.
4. Run the Supabase SQL from `supabase/schema.sql`.
5. Deploy.

Production build:

```bash
npm run build
```
