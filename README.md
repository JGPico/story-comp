## Story Comp

A literary submission app with a **React + TypeScript + Vite** frontend and an **Express + TypeScript** backend.

Users can browse the home page, submit a contact form, upload a story file, and open a login window. The login UI is in place; backend auth and file storage are not wired up yet.

---

## Project structure

```
story-comp/
├── server/           # Express API (TypeScript)
│   └── server.ts
├── src/              # React frontend
├── dist/             # Build output (frontend + compiled server)
├── tsconfig.app.json # Frontend TypeScript config
├── tsconfig.server.json
└── netlify.toml      # Frontend deploy config
```

| Part | Stack | Default URL |
|------|--------|-------------|
| Frontend | React, Vite, TypeScript | `http://localhost:5173` |
| Backend | Express, TypeScript, tsx | `http://localhost:5432` |

---

## Prerequisites

- **Node.js** v22.12+ (see `.nvmrc`; run `nvm use` or `fnm use` in the project)
- **npm** (included with Node)

---

## 1. Install dependencies

From the project root:

```bash
npm install
```

---

## 2. Run locally

### Frontend

```bash
npm run dev
```

Open the URL shown in the terminal (default `http://localhost:5173`).

### Backend

In a second terminal:

```bash
npm run dev:server
```

The API listens on port **5432** (or set `PORT` in the environment). A health check is available at `http://localhost:5432/`.

---

## 3. Scripts

All commands are run from the project root.

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and build frontend to `dist/` |
| `npm run preview` | Serve the production frontend build locally |

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev:server` | Run Express with `tsx` (reloads on file changes) |
| `npm run build:server` | Compile `server/` to `dist/server/` |
| `npm run start:server` | Run the compiled server (`node dist/server/server.js`) |

### Quality

| Command | Description |
|---------|-------------|
| `npm test` | Run Vitest tests |
| `npm run test:ui` | Vitest UI |
| `npm run test:coverage` | Vitest with coverage |
| `npm run lint` | ESLint |

---

## 4. TypeScript

- **Frontend:** `tsconfig.app.json` — React app under `src/`
- **Backend:** `tsconfig.server.json` — Express app under `server/`, emits to `dist/server/`
- **Tooling:** `tsconfig.node.json` — Vite config

`npm run build` type-checks the frontend (and related projects via `tsc -b`). Use `npm run build:server` to compile the API separately.

---

## 5. Deploying the frontend (Netlify)

The repo includes `netlify.toml` (build: `npm run build`, publish: `dist`). No environment variables are required for the frontend.

1. Push the repo to GitHub, GitLab, or Bitbucket.
2. In [Netlify](https://app.netlify.com/start), import the project.
3. Deploy; later pushes to the linked branch can trigger automatic deploys.

For a local Netlify-style build: `netlify deploy --build` (requires the [Netlify CLI](https://docs.netlify.com/cli/get-started/) and `netlify link`).

The Express API is not deployed by Netlify. Host it separately (e.g. Railway, Render, Fly.io, or your own server) with `npm run build:server` and `npm run start:server`, and point the frontend at that API when you add API calls.

---

## 6. Next steps

- Connect the contact form and story upload to Express routes
- Add authentication on the server and hook up the login window
- Configure CORS and a `VITE_API_URL` (or similar) for the frontend to call the API in development and production
