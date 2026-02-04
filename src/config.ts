type Env = {
  VITE_FIREBASE_API_KEY: string
  VITE_FIREBASE_AUTH_DOMAIN: string
  VITE_FIREBASE_PROJECT_ID: string
  VITE_FIREBASE_STORAGE_BUCKET: string
  VITE_FIREBASE_MESSAGING_SENDER_ID: string
  VITE_FIREBASE_APP_ID: string
  VITE_FIREBASE_MEASUREMENT_ID?: string
}

export type ConfigResult =
  | { firebase: Env; error: null }
  | { firebase: null; error: string }

function readEnv(): ConfigResult {
  const env = import.meta.env as Record<string, string | boolean | undefined>

  function requireString(key: keyof Env): string | null {
    const value = env[key as string]
    if (typeof value !== 'string' || value.trim() === '') return null
    return value
  }

  const apiKey = requireString('VITE_FIREBASE_API_KEY')
  const authDomain = requireString('VITE_FIREBASE_AUTH_DOMAIN')
  const projectId = requireString('VITE_FIREBASE_PROJECT_ID')
  const storageBucket = requireString('VITE_FIREBASE_STORAGE_BUCKET')
  const messagingSenderId = requireString('VITE_FIREBASE_MESSAGING_SENDER_ID')
  const appId = requireString('VITE_FIREBASE_APP_ID')
  const missing = [
    !apiKey && 'VITE_FIREBASE_API_KEY',
    !authDomain && 'VITE_FIREBASE_AUTH_DOMAIN',
    !projectId && 'VITE_FIREBASE_PROJECT_ID',
    !storageBucket && 'VITE_FIREBASE_STORAGE_BUCKET',
    !messagingSenderId && 'VITE_FIREBASE_MESSAGING_SENDER_ID',
    !appId && 'VITE_FIREBASE_APP_ID',
  ].filter(Boolean) as string[]

  if (missing.length > 0) {
    return {
      firebase: null,
      error: `Missing env: ${missing.join(', ')}. Set them in Netlify (Site settings → Environment variables) or in a .env file.`,
    }
  }

  return {
    firebase: {
      VITE_FIREBASE_API_KEY: apiKey!,
      VITE_FIREBASE_AUTH_DOMAIN: authDomain!,
      VITE_FIREBASE_PROJECT_ID: projectId!,
      VITE_FIREBASE_STORAGE_BUCKET: storageBucket!,
      VITE_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId!,
      VITE_FIREBASE_APP_ID: appId!,
      VITE_FIREBASE_MEASUREMENT_ID: (env['VITE_FIREBASE_MEASUREMENT_ID'] as string | undefined) || undefined,
    },
    error: null,
  }
}

const result = readEnv()

/** Use for Firebase init only. Prefer getConfigError() to check before using. */
export const config = result.error
  ? null
  : {
      firebase: {
        apiKey: result.firebase!.VITE_FIREBASE_API_KEY,
        authDomain: result.firebase!.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: result.firebase!.VITE_FIREBASE_PROJECT_ID,
        storageBucket: result.firebase!.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: result.firebase!.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: result.firebase!.VITE_FIREBASE_APP_ID,
        measurementId: result.firebase!.VITE_FIREBASE_MEASUREMENT_ID,
      },
    } as const

export const configError: string | null = result.error
