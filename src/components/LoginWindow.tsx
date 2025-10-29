import { useState } from 'react'
import './LoginWindow.css'
import firebase from '../firebase'

interface LoginWindowProps {
  onClose?: () => void
  onLoggedIn?: () => void
}

export default function LoginWindow({ onClose, onLoggedIn }: LoginWindowProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (mode === 'signin') {
        const { signInWithEmailAndPassword } = await import('firebase/auth')
        await signInWithEmailAndPassword(firebase.auth, email, password)
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setSubmitting(false)
          return
        }
        const { createUserWithEmailAndPassword } = await import('firebase/auth')
        await createUserWithEmailAndPassword(firebase.auth, email, password)
      }
      if (onLoggedIn) onLoggedIn()
      if (onClose) onClose()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-window">
      <div className="login-window__card" role="dialog" aria-modal="true" aria-labelledby="login-window-title">
        <div className="login-window__header">
          <h2 id="login-window-title">{mode === 'signin' ? 'Sign In' : 'Create Account'}</h2>
          {onClose && (
            <button className="login-window__close" aria-label="Close" onClick={onClose}>
              ×
            </button>
          )}
        </div>
        <div className="login-window__tabs" role="tablist" aria-label="Authentication mode">
          <button
            role="tab"
            aria-selected={mode === 'signin'}
            className={`login-window__tab ${mode === 'signin' ? 'is-active' : ''}`}
            onClick={() => setMode('signin')}
          >
            Sign In
          </button>
          <button
            role="tab"
            aria-selected={mode === 'signup'}
            className={`login-window__tab ${mode === 'signup' ? 'is-active' : ''}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <form className="login-window__form" onSubmit={handleSubmit}>
          <label className="login-window__label">
            Email
            <input
              type="email"
              className="login-window__input"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="login-window__label">
            Password
            <input
              type="password"
              className="login-window__input"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {mode === 'signup' && (
            <label className="login-window__label">
              Confirm Password
              <input
                type="password"
                className="login-window__input"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          )}

          {error && <div className="login-window__error" role="alert">{error}</div>}

          <button className="login-window__submit" type="submit" disabled={submitting}>
            {submitting ? 'Please wait…' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  )
}


