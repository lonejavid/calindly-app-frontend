# Backend connection (Schedley API)

This frontend is built to work with the **Schedley NestJS backend** (`backed_end_schedley` or your API server). Use this guide to run the backend locally and connect it to the frontend.

## 1. Frontend env (already set for local backend)

In the project root, `.env` should point to your local API:

```env
VITE_APP_ORIGIN=http://localhost:3000
VITE_API_BASE_URL=http://localhost:8000/api
```

If `VITE_API_BASE_URL` is missing, the app defaults to `http://localhost:8000/api`.

- **Frontend** runs on **port 3000** (see `vite.config.ts`).
- **Backend** must run on **port 8000** (or update `VITE_API_BASE_URL` to match your backend URL).

## 2. Backend env (what the backend should use)

Your backend `.env` should include at least:

```env
PORT=8000
FRONTEND_ORIGIN=http://localhost:3000

# JWT
JWT_SECRET=your-secret-at-least-32-chars
JWT_EXPIRES_IN=7d

# Google OAuth – redirect after login to the frontend
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback
```

Important:

- **CORS**: Allow `FRONTEND_ORIGIN` (e.g. `http://localhost:3000`) so the browser can call your API.
- **Google OAuth**: After the backend handles the Google callback, it must redirect the user to the **frontend** with tokens in the URL, e.g.  
  `http://localhost:3000/oauth-success?accessToken=...&user=...&expiresAt=...`  
  so the frontend can store them and redirect to the app.

## 3. Auth API the frontend expects

| Method | Endpoint              | Body (JSON)              | Response (success) |
|--------|------------------------|---------------------------|---------------------|
| POST   | `/api/auth/login`     | `{ email, password }`     | `{ message, user, accessToken, expiresAt }` |
| POST   | `/api/auth/register`  | `{ name, email, password }` | 201 / success payload |
| GET    | `/api/auth/google`    | —                         | Redirect to Google, then to callback |

**Login response** shape:

```ts
{
  message: string;
  user: { id: string; name: string; username: string; email: string; isApproved?: boolean };
  accessToken: string;
  expiresAt: number;  // Unix timestamp (seconds)
}
```

**Google OAuth flow**

1. User clicks “Sign in with Google” → frontend redirects to `{API_BASE_URL}/auth/google` (e.g. `http://localhost:8000/api/auth/google`).
2. Backend redirects to Google, user signs in, Google redirects back to `GOOGLE_CALLBACK_URL`.
3. Backend creates/finds user, issues JWT, then **redirects the browser to the frontend** with tokens in the query string, e.g.:  
   `http://localhost:3000/oauth-success?accessToken=...&user=<url-encoded-JSON>&expiresAt=...`
4. Frontend route `/oauth-success` reads `accessToken`, `user`, `expiresAt`, stores them, and redirects to `/app/event_types` or `/setup`.

So the backend’s Google callback handler must redirect to `{FRONTEND_ORIGIN}/oauth-success?accessToken=...&user=...&expiresAt=...` (and use the same frontend origin as in CORS).

## 4. Other API prefixes used by the frontend

All under `VITE_API_BASE_URL` (e.g. `http://localhost:8000/api`):

- **Events:** `POST /event/create`, `PUT /event/toggle-privacy`, `DELETE /event/:id`, `GET /event/all`
- **Integrations:** `GET /integration/check/:app`, `GET /integration/all`, `GET /integration/connect/:app`
- **Availability:** `GET /availability/me`, `PUT /availability/update`
- **Meetings:** `GET /meeting/user/all`, `PUT /meeting/cancel/:id`, `POST /meeting/public/create`
- **Public (no token):** `GET /event/public/:username`, `GET /event/public/:username/:slug`, `GET /availability/public/:eventId`

Protected routes send `Authorization: Bearer <accessToken>`.

## 5. Verify connection

1. Start the backend (e.g. `npm run start:dev` in the backend repo) on port 8000.
2. Start the frontend: `npm run dev` (port 3000).
3. Open **Login** (`/login`). If the backend is unreachable, a yellow banner appears: “Cannot reach backend...”.
4. If the banner does not appear and you can sign in or see a normal error from the API, the frontend is connected to your local backend.

## 6. Where auth is implemented in the frontend

- **Store:** `src/store/store.ts` – `user`, `accessToken`, `expiresAt`, `clearAuth()`
- **API client:** `src/lib/axios-client.ts` – sends `Authorization: Bearer <token>`, on 401 calls `clearAuth()` and redirects to `/`
- **Login/Register:** `src/pages/auth/components/sign-in-form.tsx`, `sign-up-form.tsx` – call `loginMutationFn` / `registerMutationFn` from `src/lib/api.ts`
- **Google OAuth return:** `src/pages/GoogleAothPages/OAuthSuccess.tsx` – reads query params and stores auth
- **Protected routes:** `src/routes/protectedRoute.tsx` – requires `accessToken`, redirects to `/login` otherwise; sends to `/setup` if `user.isApproved === false`
