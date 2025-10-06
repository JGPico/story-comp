type Env = {
  VITE_FIREBASE_API_KEY: string
  VITE_FIREBASE_AUTH_DOMAIN: string
  VITE_FIREBASE_PROJECT_ID: string
  VITE_FIREBASE_STORAGE_BUCKET: string
  VITE_FIREBASE_MESSAGING_SENDER_ID: string
  VITE_FIREBASE_APP_ID: string
  VITE_FIREBASE_MEASUREMENT_ID?: string
}

function readEnv(): Env {
  const env = import.meta.env as Record<string, string | boolean | undefined>

  function requireString(key: keyof Env): string {
    const value = env[key as string]
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`Missing required env: ${String(key)}. Define it in a .env file prefixed with VITE_.`)
    }
    return value
  }

  return {
    VITE_FIREBASE_API_KEY: requireString('VITE_FIREBASE_API_KEY'),
    VITE_FIREBASE_AUTH_DOMAIN: requireString('VITE_FIREBASE_AUTH_DOMAIN'),
    VITE_FIREBASE_PROJECT_ID: requireString('VITE_FIREBASE_PROJECT_ID'),
    VITE_FIREBASE_STORAGE_BUCKET: requireString('VITE_FIREBASE_STORAGE_BUCKET'),
    VITE_FIREBASE_MESSAGING_SENDER_ID: requireString('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    VITE_FIREBASE_APP_ID: requireString('VITE_FIREBASE_APP_ID'),
    VITE_FIREBASE_MEASUREMENT_ID: (env['VITE_FIREBASE_MEASUREMENT_ID'] as string | undefined) || undefined,
  }
}

const env = readEnv()

export const config = {
  firebase: {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
  },
} as const
