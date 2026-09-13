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

## Public Legal Pages for Google OAuth — 2026-09-08

**What:** Added public privacy policy and terms of service pages for Google OAuth review.

**Files involved:** `middleware.ts`, `features/legal/components/LegalDocument.tsx`, `features/legal/index.ts`, `app/privacy-policy/page.tsx`, `app/terms-of-service/page.tsx`

**How it works:** `/privacy-policy` and `/terms-of-service` are explicitly allowed through the existing authentication middleware. Both server-rendered routes use the shared `LegalDocument` component and define page-specific metadata and legal sections. The privacy policy reflects the current flow: Google provides a verified sign-in credential, the app stores profile and bus preference fields, and a seven-day HTTP-only session cookie is created.

**Why:** Google OAuth requires publicly reachable privacy and terms pages, while the app's middleware otherwise redirects every unauthenticated route to `/login`.

**Gotchas:**

- Add any future public route to `PUBLIC_ROUTES` or unauthenticated visitors will be redirected to `/login`.
- Keep the privacy policy aligned with the actual Google token claims and user schema if authentication or stored profile data changes.
- The legal copy is application-specific but is not a substitute for legal advice or a complete jurisdiction-specific privacy notice.

**Key concepts:** public route allowlist, Google OAuth disclosure, shared legal component, page metadata

## Bus Entry Log Model and Repository — 2026-09-11

**What:** Added a durable Mongoose model and server repository for bus-entry logs.

**Files involved:** `features/shared/models/bus-entry.ts`, `features/shared/repositories/bus-entry-repo.ts`

**How it works:** `BusEntry` stores the submitting `userId` as an ObjectId reference, the selected bus `time`, stable stop ID in `busStop`, optional `busRoute`, and coordinate snapshots. Mongoose timestamps provide `createdAt` and `updatedAt` for submission chronology. The repository provides all-entry reads, filtered reads, bounded newest-first recent reads, insertion, updates, and deletion, serializing results into plain objects like the existing user repository.

**Why:** The current socket-only map entries disappear after reload or server restart. Separate event time and creation time preserve both when the bus entry refers to and when the report was logged.

**Gotchas:**

- `busStop` stores the stable stop identifier, not a mutable display label.
- The current Mongoose typings expose `QueryFilter`, not the older `FilterQuery` type.
- Persistence and Socket.IO submission are intentionally not wired together yet; integration must authenticate the user and persist before broadcasting.

**Key concepts:** Mongoose timestamps, ObjectId reference, compound indexes, bounded recent queries, server repository

## Seven-Hour Bus Entry Query — 2026-09-11

**What:** Added `getLastSevenHoursBusEntries` to fetch recent bus logs with their submitting users populated.

**Files involved:** `features/shared/repositories/bus-entry-repo.ts`

**How it works:** The query uses a rolling `createdAt >= now - 7 hours` condition, sorts newest first, populates `userId`, and excludes the user's `passwordHash`.

**Why:** `Date` values represent absolute instants, so subtracting seven hours from `Date.now()` already works correctly when the application operates at UTC+3. A timezone offset would only matter for local calendar boundaries, not a rolling duration.

**Gotchas:** The seven-hour window is based on when the entry was logged (`createdAt`), not the selected bus event time (`time`).

**Key concepts:** rolling time window, Mongoose populate, UTC offsets, projection

## Deserialize Bus Entry Times in Map — 2026-09-11

**What:** Fixed the map crash caused by calling Date methods on serialized bus-entry timestamps.

**Files involved:** `features/map/Map.tsx`

**How it works:** The map converts each incoming `entry.time` to a `Date` before extracting the hour and minute. Entries with invalid timestamps are logged and skipped instead of breaking the entire effect.

**Why:** The repository serializes database results for the server-to-client boundary, so MongoDB dates arrive in the client as ISO strings rather than `Date` instances.

**Gotchas:** Keep parsing persisted dates at the client boundary; do not assume a server action's serialized result retains JavaScript `Date` instances.

**Key concepts:** server-client serialization, date normalization, defensive rendering

## Store Selected Bus Time as UTC — 2026-09-11

**What:** Bus-entry creation now accepts the selected hour, minute, and AM/PM values and stores them as a UTC `Date` using `UTC_OFFSET` from the server environment.

**Files involved:** `features/map/components/EntryForm.tsx`, `features/map/useMapHook.ts`, `features/shared/repositories/bus-entry-repo.ts`

**How it works:** The form forwards AM/PM along with the hour and minute. The repository determines today's date in the configured UTC+3 local clock, converts the 12-hour input to 24-hour time, subtracts the offset, and saves the resulting UTC instant in `time`.

**Why:** The browser should not depend on a server-only environment variable, and MongoDB dates are best stored as absolute instants. The map can still display the user's selected local time from the marker values.

**Gotchas:** `UTC_OFFSET` must be available to the server as a finite numeric value. The persisted value is UTC, so client rendering must apply the desired display timezone when showing it as a clock time.

**Key concepts:** UTC normalization, server environment variables, 12-hour time conversion, absolute timestamps

## Direct Onboarding Route and Stop Selectors — 2026-09-11

**What:** Replaced the outdated shared `StopsSelector` abstraction with direct route and stop selectors in `FirstPage`.

**Files involved:** `features/onboarding/components/FirstPage.tsx`, `features/shared/components/StopsSelector.tsx`

**How it works:** The route selector stores `route.name_en`, matching the current route data shape. The stop selector stores `stop.id` and displays the stop order and English name. Setter props are typed with React state dispatch types.

**Why:** Routes and stops no longer share the same data format, so one selector component was incorrectly modeling both entities.

**Gotchas:** Route values are names because the current route data has no IDs; stop values remain stable stop IDs.

**Key concepts:** direct composition, typed state setters, route/stop data shapes

## Filter Map Entries by User Route — 2026-09-11

**What:** Map entries are now limited to the authenticated user's selected bus route.

**Files involved:** `features/map/Map.tsx`, `features/map/types.ts`, `features/map/useMapHook.ts`

**How it works:** Persisted entries are filtered by `entry.busRoute` before becoming markers. Realtime markers now carry `busRoute` and are rejected when they do not match the current user's route. The map clears entries when no route is selected.

**Gotchas:** Realtime marker payloads must retain `busRoute`; otherwise clients cannot safely filter socket events by route.

**Key concepts:** route-scoped rendering, realtime filtering, marker payloads

## Animated Map Recenter On Stop Selection - 2026-09-12

**What:** The map now smoothly recenters on the bus stop selected in the entry form.

**Files involved:** `features/map/Map.tsx`, `features/map/components/RecenterMap.tsx`

**How it works:** `RecenterMap` renders inside `MapContainer`, reads the Leaflet instance through React Leaflet's `useMap()` hook, and calls `flyTo` with the selected stop coordinates while preserving the current zoom. Missing stops are ignored, and the existing `MapContainer` instance is preserved.

**Why:** React Leaflet treats `MapContainer.center` as an initialization value. Calling `flyTo` responds to later selection changes without remounting the map or resetting user interaction state.

**Gotchas:**

- Keep `RecenterMap` inside `MapContainer`; `useMap()` requires the React Leaflet map context.
- Avoid forcing a remount with a changing `key`, because that resets zoom and map interaction state.
- The initial `center` fallback remains responsible for the first render when no stop is selected.

**Key concepts:** React Leaflet `useMap`, Leaflet `flyTo`, map context, controlled recentering

## Interactive Bus Entry Submission - 2026-09-13

**What:** Added a disabled loading state and success toast to bus-entry submission.

**Files involved:** `features/map/useMapHook.ts`, `features/map/components/EntryForm.tsx`, `features/map/Map.tsx`, `components/ui/sonner.tsx`, `app/layout.tsx`

**How it works:** The map hook exposes `isSubmitting`, sets it around the awaited `addBusEntry` call, and shows a green Sonner success toast only after persistence succeeds. The form disables its submit button and renders a spinning loader while the request is active. The toast host is mounted once in the root layout using a relative import for reliable layout module resolution.

**Gotchas:**

- Keep `isSubmitting` in the hook so all async submission paths share the same lock.
- The toast host must be mounted under the document body before `toast.success` can render.
- The `app/layout.tsx` import uses `../components/ui/sonner` because the editor resolver reported the new alias import as missing even though the alias works elsewhere.

**Key concepts:** async UI state, disabled submit controls, Sonner toast, root provider
