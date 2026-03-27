# Periskope - WhatsApp Group Management Interface

A pixel-perfect, production-grade WhatsApp group management dashboard built with **Next.js 16**, **Supabase**, and **Tailwind CSS v4**. Manage groups, view labels, projects, and member details — all from one unified interface.

Next.js
React
Supabase
Tailwind CSS
TypeScript

## Live Demo

[View on Vercel](https://periskope-assignment.vercel.app/)

---

## Features

- **Groups Table** — Paginated list of WhatsApp groups with sortable columns, project badges, and label chips
- **Detail Sidebar** — Click any group row to reveal a slide-in sidebar with overview, labels, project info, and actions
- **Color-coded Chips** — Projects (Demo, Clients) and labels (High Volume, Priority, Pilot, Warm) with distinct, database-driven colors
- **Custom Scrollbar** — Thin, minimal scrollbar styled consistently across browsers
- **Server-side Data Fetching** — All database queries happen in server components; client components handle interactivity only
- **Pagination** — 30 items per page with page navigation

---

## Tech Stack


| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack) |
| UI         | React 19, Tailwind CSS v4          |
| Backend    | Supabase (PostgreSQL + PostgREST)  |
|            |                                    |
| Icons      | react-icons                        |
| Language   | TypeScript (strict mode)           |
| Deployment | Vercel                             |


---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with sidebar
│   ├── page.tsx            # Server component — fetches data, renders page
│   └── globals.css         # Global styles + custom scrollbar
├── components/
│   ├── sidebar.tsx         # Left navigation sidebar
│   ├── sidebar-nav.tsx     # Nav items with icons and badges
│   ├── header.tsx          # Top header bar (docs, phone, notifications)
│   ├── groups-toolbar.tsx  # Search bar + filter + action buttons
│   ├── groups-content.tsx  # Client wrapper — manages selected group state
│   ├── groups-table.tsx    # Data table with checkboxes, badges, labels
│   ├── group-detail-sidebar.tsx  # Right detail panel (overview, tabs, actions)
│   └── pagination.tsx      # Page navigation
├── lib/
│   ├── queries.ts          # Supabase query — getChats() with relations
│   ├── types.ts            # TypeScript types (Chat, Project, Label)
│   └── supabase/
│       ├── client.ts       # Browser Supabase client
│       └── server.ts       # Server Supabase client (cookie-based)
└── proxy.ts                # Middleware for session refresh
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- A **Supabase** project ([create one here](https://supabase.com/dashboard))

### 1. Clone the repository

```bash
git clone https://github.com/0205Ankit/periskope-assignment.git
cd periskope-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase dashboard under **Settings > API**.

### 4. Set up the database

Run the following SQL in your Supabase SQL Editor to create the required tables:

```sql
-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#6B7280',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Labels
CREATE TABLE IF NOT EXISTS labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#6B7280',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Chats
CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar_url TEXT,
  phone_number TEXT NOT NULL,
  project_id UUID REFERENCES projects(id),
  members_count INT NOT NULL DEFAULT 0,
  last_message TEXT,
  last_active TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Chat-Labels junction table
CREATE TABLE IF NOT EXISTS chat_labels (
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  label_id UUID REFERENCES labels(id) ON DELETE CASCADE,
  PRIMARY KEY (chat_id, label_id)
);
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables


| Variable                        | Description                     | Required |
| ------------------------------- | ------------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL       | Yes      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous API key | Yes      |


---

## Assumptions & Notes

- **No authentication** — The app is open access; Supabase RLS (Row Level Security) is not enforced. In production, you'd enable RLS policies and add user authentication.
- **Read-only UI** — Actions like "Export Chat", "Exit Group", and "+ Add Label" are present in the UI but are non-functional placeholders.
- **Sidebar tabs** — Overview, Members, and Logs tabs are selectable with active state styling, but all display the same Overview content.
- **Data seeding** — The database schema is provided above. You'll need to seed your own data or use the SQL seed scripts.
- **Server components** — All data fetching (Supabase queries) happens in server components. Client components (`"use client"`) are used only for interactive elements (row selection, checkboxes, sidebar toggle).
- **Browser support** — Custom scrollbar styling works on all modern browsers (Chrome, Edge, Safari, Firefox).

---

## Scripts


| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start dev server (Turbopack) |
| `npm run build` | Production build             |
| `npm run start` | Start production server      |
| `npm run lint`  | Run ESLint                   |


