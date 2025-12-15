import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HamburgerNav from './HamburgerNav'

describe('HamburgerNav', () => {
  it('renders the hamburger button', () => {
    render(<HamburgerNav />)
    const button = screen.getByRole('button', { name: /open menu/i })
    expect(button).toBeInTheDocument()
  })

  it('opens menu when button is clicked', async () => {
    const user = userEvent.setup()
    render(<HamburgerNav />)
    
    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)
    
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('calls onHome when Home is clicked', async () => {
    const user = userEvent.setup()
    const onHome = vi.fn()
    render(<HamburgerNav onHome={onHome} />)
    
    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)
    
    const homeButton = screen.getByRole('menuitem', { name: 'Home' })
    await user.click(homeButton)
    
    expect(onHome).toHaveBeenCalledTimes(1)
  })

  it('calls onLogin when Login is clicked', async () => {
    const user = userEvent.setup()
    const onLogin = vi.fn()
    render(<HamburgerNav onLogin={onLogin} />)
    
    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)
    
    const loginButton = screen.getByRole('menuitem', { name: 'Login' })
    await user.click(loginButton)
    
    expect(onLogin).toHaveBeenCalledTimes(1)
  })

  it('closes menu when Escape key is pressed', async () => {
    const user = userEvent.setup()
    render(<HamburgerNav />)
    
    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)
    
    expect(screen.getByRole('menu')).toBeInTheDocument()
    
    await user.keyboard('{Escape}')
    
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes menu when clicking outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <HamburgerNav />
        <div data-testid="outside">Outside</div>
      </div>
    )
    
    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)
    
    expect(screen.getByRole('menu')).toBeInTheDocument()
    
    const outside = screen.getByTestId('outside')
    await user.click(outside)
    
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})


