# Caro Game Frontend - AI Agent Instructions

## Architecture Overview

**Tech Stack**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS + SignalR (for real-time features)

**Project Structure**:

- `src/app/` - Next.js pages using file-based routing (login, profile, game/caro, etc.)
- `src/components/` - Reusable React components (Navbar, Footer)
- `src/utils/` - API client (`api.tsx`) and token management (`token.ts`)
- Backend: C# .NET API at `https://localhost:7083/api`

## Critical Patterns & Conventions

### 1. API Communication Pattern

- **Location**: `src/utils/api.tsx` - unified HTTP client with standard methods: `apiGet`, `apiPost`, `apiPut`, `apiPatch`, `apiDelete`
- **Headers**: Automatically adds `Authorization: Bearer ${token}` when token provided
- **Error Handling**: Non-200 responses throw Error with backend message
- **Usage Example**: `await apiPut("/User/request-profile-update", payload, token)`

### 2. Authentication & Token Management

- **Token Storage**: Stored in `localStorage` under key `"token"` (JWT format)
- **User ID Extraction**: Use `getUserId()` from `src/utils/token.ts` to extract from token
- **Pattern**: Always check token exists before API calls; handle missing auth gracefully

### 3. Multi-Step Forms with Sensitive Changes

- **Workflow**: Some updates (username/email) require OTP verification; others (fullName/phone) update directly
- **State Machine**: `step` state manages flow: "form" → "otp" → "done"
- **Payload Difference Rule**:
  - **For OTP requests**: Only send `newUsername`/`newEmail` if actually changed (send `null` or omit if unchanged)
  - **For direct updates**: Send all fields but backend ignores unchanged values
  - **Backend Validation**: Rejects if no actual changes detected ("Bạn không thay đổi thông tin nào")

### 4. Form Handling Pattern

- State tracks current values + original baseline values
- Change detection: compare current vs original to determine which changes trigger OTP
- Example from `profile/page.tsx`:
  ```tsx
  user.username !== original.username ? user.username : null;
  ```
  (Send new value if changed, otherwise null to skip backend validation)

## Component Patterns

### Page Components

- All use `"use client"` directive (Client Components for interactivity)
- Fetch user data on mount with `useEffect` + error handling
- Loading states managed with local `loading` boolean during API calls

### Styling

- Tailwind CSS for all styling
- Custom colors: `#c19a6b` (gold), `#8c6746` (brown) - reuse in buttons
- Form inputs: consistent `w-full p-2 border rounded-md` pattern

## Common Issues & Solutions

| Issue                             | Cause                                                | Fix                                                                                          |
| --------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 400 Bad Request on profile update | Payload sends unchanged fields to backend validation | Only include changed fields in OTP requests; use ternary to send `null` for unchanged values |
| "OTP hết hạn" errors              | OTP expiration logic on backend (5 min TTL)          | Reduce wait time in UI tests; use fresh OTP for each attempt                                 |
| Auth fails silently               | Missing token or token expired                       | Add token existence check in try blocks; redirect to login on 401                            |

## Development Workflow

```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build (check for TS errors)
npm run lint         # Run ESLint
```

**Backend must be running** on `https://localhost:7083` with CORS enabled for frontend requests.

## Key Files Reference

- **API Client**: `src/utils/api.tsx` - modify here to add new endpoints or change header handling
- **Auth Utils**: `src/utils/token.ts` - handles JWT parsing
- **Profile Page**: `src/app/profile/page.tsx` - reference for multi-step OTP flow pattern
- **Layout**: `src/app/layout.tsx` - global styles and structure
