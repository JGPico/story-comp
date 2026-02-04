## Story Comp

React + TypeScript + Vite app for submitting literary work, with Firebase Authentication and Cloud Storage.

The main UI lets users:
- **Browse the home page** with project copy
- **Submit a message** via the contact form
- **Upload a story file** (stored in Firebase Storage)
- **Open a login window** backed by Firebase Auth

---

## Prerequisites

- **Node.js**: v18+ (v20+ recommended)
- **npm**: comes with Node
- **Firebase CLI** (optional, for emulators/deploy): `npm install -g firebase-tools`

---

## 1. Install dependencies

From the project root:

```bash
npm install
```

---

## 2. Configure Firebase environment

This project reads Firebase config from Vite env variables in `src/config.ts`.  
Create a `.env.local` (or `.env`) file in the project root with:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id   # optional
```

> **Note:** All required `VITE_` variables must be set; otherwise the app will throw an error at startup.

---

## 3. Run the app locally

Start the Vite dev server:

```bash
npm run dev
```

Then open the URL shown in the terminal (by default `http://localhost:5173`).

### Using Firebase Emulator UI (optional)

You can also run via Firebase App Hosting emulator, which will start `npm run dev` for you:

```bash
firebase emulators:start --only apphosting
```

---

## 4. Scripts

All commands are run from the project root:

- **Start dev server**

  ```bash
  npm run dev
  ```

- **Type-check & production build**

  ```bash
  npm run build
  ```

- **Preview production build locally**

  ```bash
  npm run preview
  ```

- **Run tests (Vitest)**

  ```bash
  npm test
  # or
  npm run test:ui
  npm run test:coverage
  ```

- **Run ESLint**

  ```bash
  npm run lint
  ```

---

## 5. Deploying with Firebase App Hosting (outline)

You can deploy the app using Firebase App Hosting. In general:

1. **Log in and select your project**

   ```bash
   firebase login
   firebase use <your-firebase-project-id>
   ```

2. **Build and deploy**

   ```bash
   npm run build
   firebase apphosting:deploy
   ```

Refer to the Firebase App Hosting docs for details on configuring `apphosting.yaml` and project-level settings.

---

## 6. Deploying to Netlify

The repo includes a `netlify.toml` so Netlify uses the right build command and publish directory.

1. **Push your code** to GitHub, GitLab, or Bitbucket.

2. **In Netlify:** [Add new site](https://app.netlify.com/start) → **Import an existing project** → choose your repo. Netlify will pick up `netlify.toml` (build: `npm run build`, publish: `dist`).

3. **Set environment variables** in Netlify (Site settings → Environment variables). Add the same Firebase env vars you use locally (all `VITE_FIREBASE_*` from your `.env.local`). Without these, the app will fail at runtime.

4. **Deploy.** Netlify will build and publish the site; later pushes to your main branch can trigger automatic deploys.

For local-style builds you can run `netlify deploy --build` (requires [Netlify CLI](https://docs.netlify.com/cli/get-started/) and `netlify link`).

