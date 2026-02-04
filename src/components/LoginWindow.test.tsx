import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginWindow from './LoginWindow'

// Mock Firebase
vi.mock('../firebase', () => ({
  default: {
    auth: {},
  },
}))

// Mock Firebase Auth functions
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(() => Promise.resolve({})),
  createUserWithEmailAndPassword: vi.fn(() => Promise.resolve({})),
}))

describe('LoginWindow', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders sign in form by default', () => {
    render(<LoginWindow />)
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('switches to sign up mode when Sign Up tab is clicked', async () => {
    const user = userEvent.setup()
    render(<LoginWindow />)
    
    const signUpTab = screen.getByRole('tab', { name: 'Sign Up' })
    await user.click(signUpTab)
    
    expect(screen.getByText('Create Account')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
  })

  it('shows close button when onClose is provided', () => {
    const onClose = vi.fn()
    render(<LoginWindow onClose={onClose} />)
    
    const closeButton = screen.getByRole('button', { name: 'Close' })
    expect(closeButton).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<LoginWindow onClose={onClose} />)
    
    const closeButton = screen.getByRole('button', { name: 'Close' })
    await user.click(closeButton)
    
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('displays error message when passwords do not match in signup mode', async () => {
    const user = userEvent.setup()
    render(<LoginWindow />)
    
    // Switch to sign up mode
    const signUpTab = screen.getByRole('tab', { name: 'Sign Up' })
    await user.click(signUpTab)
    
    // Fill in form
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.type(screen.getByLabelText('Confirm Password'), 'different')
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: 'Create Account' })
    await user.click(submitButton)
    
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
  })

  it('disables submit button when submitting', async () => {
    const user = userEvent.setup()
    const { signInWithEmailAndPassword } = await import('firebase/auth')
    vi.mocked(signInWithEmailAndPassword).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )
    
    render(<LoginWindow />)
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    
    const submitButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(submitButton)
    
    expect(submitButton).toBeDisabled()
    expect(screen.getByText('Please wait…')).toBeInTheDocument()
  })

  it('requires email and password fields', () => {
    render(<LoginWindow />)
    
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    
    expect(emailInput).toBeRequired()
    expect(passwordInput).toBeRequired()
  })
})



