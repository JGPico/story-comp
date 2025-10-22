import { useEffect, useRef, useState } from 'react'
import './HamburgerNav.css'

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
    <div className="hamburger-nav">
      <button
        ref={buttonRef}
        className="hamburger-nav__button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(v => !v)}
      >
        <span aria-hidden="true" className="hamburger-nav__icon" />
      </button>
      {open && (
        <div
          ref={menuRef}
          className="hamburger-nav__menu"
          role="menu"
          aria-label="Main menu"
        >
          <button 
            role="menuitem" 
            className="hamburger-nav__item"
            onClick={handleItem(onHome)} 
          >
            Home
          </button>
          <button 
            role="menuitem" 
            className="hamburger-nav__item"
            onClick={handleItem(onAbout)} 
          >
            About
          </button>
          <button 
            role="menuitem" 
            className="hamburger-nav__item"
            onClick={handleItem(onLogin)} 
          >
            Login
          </button>
          <button 
            role="menuitem" 
            className="hamburger-nav__item"
            onClick={handleItem(onLogout)} 
          >
            Logout
          </button>
          <button 
            role="menuitem" 
            className="hamburger-nav__item"
            onClick={handleItem(onSettings)} 
          >
            Settings
          </button>
        </div>
      )}
    </div>
  )
}
