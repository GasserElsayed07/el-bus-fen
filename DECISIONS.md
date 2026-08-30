## Fixed Bottom Navbar Layout - 2026-08-27

**What:** Added a fixed footer navbar shell for authenticated pages without obscuring page content.

**Files involved:** `store/UserStoreProvider.tsx`, `features/map/Map.tsx`, `features/onboarding/Onboarding.tsx`

**How it works:** The authenticated provider reserves `2.5rem` of bottom space on the main content and renders a fixed `h-10` footer. Full-viewport map and onboarding screens use `100dvh - 2.5rem` so their controls remain above the navbar.

**Why:** A fixed element is removed from normal document flow, so content needs explicit space reserved for it. Keeping the navbar fixed makes it persist while long pages scroll.

**Gotchas:**

- Keep the footer height and the reserved `pb-10` / viewport subtraction in sync.
- Full-screen authenticated pages must subtract the navbar height or they will extend beneath it.

**Key concepts:** `position: fixed`, reserved bottom space, `100dvh`, authenticated layout

## Refresh User Store After Onboarding Save - 2026-08-30

**What:** Refetched the authenticated user after onboarding fields are saved and synchronized the result into Zustand.

**Files involved:** `features/onboarding/hooks/useOnboardingHook.ts`, `features/shared/apis/getUser.ts`, `store/userStore.ts`

**How it works:** The onboarding hook awaits `updateUserWithCustomFields`, calls `getCurrentUser`, and passes the refreshed record to the store's `useUser` setter before continuing with the existing step transition or redirect.

**Why:** The database update alone left the in-memory user stale during the current session. Refreshing through the existing authenticated-user action keeps the store aligned with persisted data.

**Gotchas:**

- The refresh must happen after awaiting the database update so it cannot read the pre-update record.
- `getCurrentUser` can return no user, so the store is updated with `null` in that case.

**Key concepts:** `getCurrentUser`, Zustand synchronization, awaited persistence
