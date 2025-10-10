import { useEffect, useRef, useState } from 'react'

interface HamburgerNavProps {
  onLogin?: () => void
  onLogout?: () => void
  onSettings?: () => void
  onAbout?: () => void
  onHome?: () => void
}

export default function HamburgerNav({ onLogin, onLogout, onSettings, onAbout, onHome }: HamburgerNavProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    function onDocumentKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    function onClickAway(e: MouseEvent) {
      if (!open) return
      const target = e.target as Node
      if (menuRef.current && !menuRef.current.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onDocumentKeyDown)
    document.addEventListener('mousedown', onClickAway)
    return () => {
      document.removeEventListener('keydown', onDocumentKeyDown)
      document.removeEventListener('mousedown', onClickAway)
    }
  }, [open])

  function handleItem(action?: () => void) {
    return () => {
      setOpen(false)
      if (action) action()
    }
  }

  return (
    <div className="hamburger-nav" style={{ 
      position: 'fixed', 
      top: 16, 
      left: 16, 
      zIndex: 1000,
      width: 'auto',
      maxWidth: 'calc(100vw - 32px)'
    }}>
      <button
        ref={buttonRef}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(v => !v)}
        style={{
          background: 'transparent',
          border: 'none',
          padding: '12px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '48px',
          minHeight: '48px',
          width: 'auto',
          maxWidth: 'none'
        }}
      >
        <span aria-hidden="true" style={{ width: 24, height: 2, background: 'currentColor', display: 'block', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, top: -7, width: 24, height: 2, background: 'currentColor' }} />
          <span style={{ position: 'absolute', left: 0, top: 7, width: 24, height: 2, background: 'currentColor' }} />
        </span>
      </button>
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Main menu"
          style={{
            marginTop: 8,
            minWidth: 180,
            maxWidth: 'calc(100vw - 32px)',
            background: 'var(--menu-bg, #1a1a1a)',
            color: 'inherit',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            padding: 12,
            position: 'relative',
            zIndex: 1001
          }}
        >
          <button 
            role="menuitem" 
            onClick={handleItem(onHome)} 
            style={{ 
              width: '100%', 
              textAlign: 'left',
              padding: '12px 16px',
              marginBottom: '4px',
              fontSize: '1rem',
              minHeight: '44px',
              background: 'transparent',
              border: 'none',
              color: 'inherit'
            }}
          >
            Home
          </button>
          <button 
            role="menuitem" 
            onClick={handleItem(onAbout)} 
            style={{ 
              width: '100%', 
              textAlign: 'left',
              padding: '12px 16px',
              marginBottom: '4px',
              fontSize: '1rem',
              minHeight: '44px',
              background: 'transparent',
              border: 'none',
              color: 'inherit'
            }}
          >
            About
          </button>
          <button 
            role="menuitem" 
            onClick={handleItem(onLogin)} 
            style={{ 
              width: '100%', 
              textAlign: 'left',
              padding: '12px 16px',
              marginBottom: '4px',
              fontSize: '1rem',
              minHeight: '44px',
              background: 'transparent',
              border: 'none',
              color: 'inherit'
            }}
          >
            Login
          </button>
          <button 
            role="menuitem" 
            onClick={handleItem(onLogout)} 
            style={{ 
              width: '100%', 
              textAlign: 'left',
              padding: '12px 16px',
              marginBottom: '4px',
              fontSize: '1rem',
              minHeight: '44px',
              background: 'transparent',
              border: 'none',
              color: 'inherit'
            }}
          >
            Logout
          </button>
          <button 
            role="menuitem" 
            onClick={handleItem(onSettings)} 
            style={{ 
              width: '100%', 
              textAlign: 'left',
              padding: '12px 16px',
              fontSize: '1rem',
              minHeight: '44px',
              background: 'transparent',
              border: 'none',
              color: 'inherit'
            }}
          >
            Settings
          </button>
        </div>
      )}
    </div>
  )
}
