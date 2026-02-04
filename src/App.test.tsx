import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock Firebase
vi.mock('./firebase.tsx', () => ({
  default: {
    auth: {},
  },
}))

// Mock components that might have complex dependencies
vi.mock('./components/ContactForm', () => ({
  default: () => <div data-testid="contact-form">Contact Form</div>,
}))

vi.mock('./components/StoryUpload', () => ({
  default: () => <div data-testid="story-upload">Story Upload</div>,
}))

describe('App', () => {
  it('renders home page by default', () => {
    render(<App />)
    
    expect(screen.getByText('Literary Submission')).toBeInTheDocument()
    expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    expect(screen.getByTestId('story-upload')).toBeInTheDocument()
  })

  it('renders login window when login is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Open hamburger menu
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    await user.click(menuButton)
    
    // Click login
    const loginButton = screen.getByRole('menuitem', { name: 'Login' })
    await user.click(loginButton)
    
    // Check that login window is rendered
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('renders about page when about is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Open hamburger menu
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    await user.click(menuButton)
    
    // Click about
    const aboutButton = screen.getByRole('menuitem', { name: 'About' })
    await user.click(aboutButton)
    
    // Check that about page is rendered
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.queryByText('Literary Submission')).not.toBeInTheDocument()
  })

  it('returns to home page when home is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Navigate to about page
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    await user.click(menuButton)
    const aboutButton = screen.getByRole('menuitem', { name: 'About' })
    await user.click(aboutButton)
    
    // Navigate back to home
    await user.click(menuButton)
    const homeButton = screen.getByRole('menuitem', { name: 'Home' })
    await user.click(homeButton)
    
    // Check that home page is rendered
    expect(screen.getByText('Literary Submission')).toBeInTheDocument()
  })
})



