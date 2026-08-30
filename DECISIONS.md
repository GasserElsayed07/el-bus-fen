## Fixed Bottom Navbar Layout - 2026-08-27

**What:** Added a fixed footer navbar shell for authenticated pages without obscuring page content.

**Files involved:** `store/UserStoreProvider.tsx`, `features/map/Map.tsx`, `features/onboarding/Onboarding.tsx`

**How it works:** The authenticated provider reserves `2.5rem` of bottom space on the main content and renders a fixed `h-10` footer. Full-viewport map and onboarding screens use `100dvh - 2.5rem` so their controls remain above the navbar.

**Why:** A fixed element is removed from normal document flow, so content needs explicit space reserved for it. Keeping the navbar fixed makes it persist while long pages scroll.

**Gotchas:**

- Keep the footer height and the reserved `pb-10` / viewport subtraction in sync.
- Full-screen authenticated pages must subtract the navbar height or they will extend beneath it.

**Key concepts:** `position: fixed`, reserved bottom space, `100dvh`, authenticated layout
