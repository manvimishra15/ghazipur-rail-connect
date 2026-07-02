
# Railway Training Institute, Ghazipur — Frontend

A clean, modern, government-professional React frontend (mobile-first, fully responsive) structured for seamless Node/Express/MongoDB integration later.

## Design system
- **Palette:** Navy `#0B3D91` (primary), white, light grey surfaces, subtle gold accent for highlights
- **Typography:** Poppins (headings) + Roboto (body) via Google Fonts
- **Tokens:** All colors as HSL in `index.css` + Tailwind theme; reusable Button/Card variants
- **Feel:** Card-based, generous spacing, restrained motion, sticky navbar, government seal-style logo mark

## Folder structure
```
src/
  pages/        Home, About, Courses, Announcements, Contact, Login,
                Dashboard (Admin / Teacher / Student views)
  components/   Navbar, Footer, AnnouncementCard, CourseCard,
                Sidebar, ProtectedRoute, Hero, SectionHeading
  layouts/      MainLayout, DashboardLayout
  services/     api.js (axios instance + endpoint modules)
  data/         mock JSON (announcements, courses, users)
  hooks/        useAuth (mock, swappable)
```

## Public pages
- **Home** — Split hero (headline + CTAs + railway image), quick-action tiles (Courses / Notices / Login), latest 3 announcements, featured courses, stats strip, CTA footer band
- **About** — Institute overview, mission, facilities grid, image + text sections, leadership snippet
- **Courses** — Responsive card grid with name, duration, short description, level badge; search + category filter
- **Announcements** — Card list with date, title, excerpt; "Latest" highlight ribbon; pagination-ready
- **Contact** — Address / phone / email cards, embedded Google Map iframe, contact form (UI + toast on submit)

## Auth + Dashboard (UI only, backend-ready)
- **Login** — Minimal form, role selector (Admin/Teacher/Student) for demo, stores mock token + role in `localStorage`
- **ProtectedRoute** — Redirects to `/login` if no token (ready for real JWT later)
- **DashboardLayout** — Collapsible sidebar (shadcn) + top bar with user menu
- **Admin:** Manage Users, Announcements, Courses (list views + create/edit modals, mock data)
- **Teacher:** Upload Assignment UI, Student list, My Courses
- **Student:** My Assignments, Announcements feed, Course materials

## Backend integration readiness
- `src/services/api.js` — Axios instance using `import.meta.env.VITE_API_BASE_URL`, request/response interceptors, auth header injection
- Endpoint modules: `authApi`, `coursesApi`, `announcementsApi`, `usersApi` with async functions returning typed shapes
- Components consume via hooks with loading + error states; today they call mock functions, swap to real endpoints later with zero component changes
- `.env.example` documenting `VITE_API_BASE_URL`

## Responsiveness & polish
- Mobile-first Tailwind grids, hamburger menu, stacked cards on small screens
- Sticky navbar with active-route highlight, accessible focus states
- Skeleton loaders on data sections, toast notifications, empty states

## Out of scope (this round)
- Real authentication / database (kept mock; can be wired to Lovable Cloud or your Express API after)
- File uploads to real storage
- Email sending from contact form

<lov-actions>
<lov-suggestion message="Test the site end-to-end on mobile and desktop — navigation, all public pages, login flow, and each role dashboard.">Verify it works end-to-end</lov-suggestion>
<lov-suggestion message="Wire real authentication using Lovable Cloud so login, roles (admin/teacher/student), and protected dashboards actually work.">Add real auth with Lovable Cloud</lov-suggestion>
<lov-suggestion message="Add a Hindi/English language toggle across the site using i18next, with all UI strings externalized.">Add Hindi/English toggle</lov-suggestion>
<lov-suggestion message="Build an admin CRUD for Announcements and Courses backed by Lovable Cloud (Supabase) so admins can publish content live.">Make announcements/courses editable</lov-suggestion>
<lov-suggestion message="Add a downloadable PDF prospectus and notice download links on the Courses and Announcements pages.">Add downloadable prospectus/notices</lov-suggestion>
</lov-actions><lov-plan>

# Railway Training Institute, Ghazipur — Frontend

A clean, modern, government-professional React frontend (mobile-first, fully responsive) structured for seamless Node/Express/MongoDB integration later.

## Design system
- **Palette:** Navy `#0B3D91` (primary), white, light grey surfaces, subtle gold accent for highlights
- **Typography:** Poppins (headings) + Roboto (body) via Google Fonts
- **Tokens:** All colors as HSL in `index.css` + Tailwind theme; reusable Button/Card variants
- **Feel:** Card-based, generous spacing, restrained motion, sticky navbar, government seal-style logo mark

## Folder structure
```
src/
  pages/        Home, About, Courses, Announcements, Contact, Login,
                Dashboard (Admin / Teacher / Student views)
  components/   Navbar, Footer, AnnouncementCard, CourseCard,
                Sidebar, ProtectedRoute, Hero, SectionHeading
  layouts/      MainLayout, DashboardLayout
  services/     api.js (axios instance + endpoint modules)
  data/         mock JSON (announcements, courses, users)
  hooks/        useAuth (mock, swappable)
```

## Public pages
- **Home** — Split hero (headline + CTAs + railway image), quick-action tiles (Courses / Notices / Login), latest 3 announcements, featured courses, stats strip, CTA band
- **About** — Institute overview, mission, facilities grid, image + text sections, leadership snippet
- **Courses** — Responsive card grid with name, duration, description, level badge; search + category filter
- **Announcements** — Card list with date, title, excerpt; "Latest" highlight ribbon; pagination-ready
- **Contact** — Address / phone / email cards, embedded Google Map iframe, contact form (UI + toast on submit)

## Auth + Dashboard (UI only, backend-ready)
- **Login** — Minimal form, role selector (Admin/Teacher/Student) for demo, stores mock token + role in `localStorage`
- **ProtectedRoute** — Redirects to `/login` if no token (ready for real JWT later)
- **DashboardLayout** — Collapsible sidebar (shadcn) + top bar with user menu
- **Admin:** Manage Users, Announcements, Courses (list views + create/edit modals, mock data)
- **Teacher:** Upload Assignment UI, Student list, My Courses
- **Student:** My Assignments, Announcements feed, Course materials

## Backend integration readiness
- `src/services/api.js` — Axios instance using `import.meta.env.VITE_API_BASE_URL`, request/response interceptors, auth header injection
- Endpoint modules: `authApi`, `coursesApi`, `announcementsApi`, `usersApi` with async functions
- Components consume via hooks with loading + error states; mock today, swap to real endpoints with zero component changes
- `.env.example` documenting `VITE_API_BASE_URL`

## Responsiveness & polish
- Mobile-first Tailwind grids, hamburger menu, stacked cards on small screens
- Sticky navbar with active-route highlight, accessible focus states
- Skeleton loaders on data sections, toast notifications, empty states

## Out of scope (this round)
- Real authentication / database (kept mock; can be wired to Lovable Cloud or your Express API after)
- File uploads to real storage
- Email sending from contact form

<lov-actions>
<lov-suggestion message="Test the site end-to-end on mobile and desktop — navigation, all public pages, login flow, and each role dashboard.">Verify it works end-to-end</lov-suggestion>
<lov-suggestion message="Wire real authentication using Lovable Cloud so login, roles (admin/teacher/student), and protected dashboards actually work.">Add real auth with Lovable Cloud</lov-suggestion>
<lov-suggestion message="Add a Hindi/English language toggle across the site using i18next, with all UI strings externalized.">Add Hindi/English toggle</lov-suggestion>
<lov-suggestion message="Build an admin CRUD for Announcements and Courses backed by Lovable Cloud so admins can publish content live.">Make announcements/courses editable</lov-suggestion>
<lov-suggestion message="Add downloadable PDF prospectus and notice download links on the Courses and Announcements pages.">Add downloadable prospectus/notices</lov-suggestion>
</lov-actions>
