 
import { useState } from 'react'
import './App.css'
import firebase from './firebase.tsx'
import ContactForm from './components/ContactForm.tsx'
import StoryUpload from './components/StoryUpload'
import HamburgerNav from './components/HamburgerNav'
import LoginWindow from './components/LoginWindow'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'login'>('home')

  function handleLogin() {
    setCurrentPage('login')
  }

  function handleLogout() {
    alert('Logout clicked')
  }

  function handleSettings() {
    alert('Settings clicked')
  }

  function handleAbout() {
    setCurrentPage('about')
  }

  function handleHome() {
    setCurrentPage('home')
  }

  return (
    <>
      <HamburgerNav 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        onSettings={handleSettings}
        onAbout={handleAbout}
        onHome={handleHome}
      />
      <div className='container'>
        {currentPage === 'home' && (
          <>
            <h1>Literary Submission</h1>
            <p>Writing is cool. You should write. "Lorem ipsum dolor sit amet,
               consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>

            <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
              ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
              quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
            <ContactForm />
            <div style={{ marginTop: 24 }}>
              <h2>Upload Your Story</h2>
              <StoryUpload />
            </div>
          </>
        )}
        
        {currentPage === 'about' && (
          <>
            <h1>About</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
               incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
               exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
               pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
               deserunt mollit anim id est laborum.</p>
          </>
        )}

        {currentPage === 'login' && (
          <LoginWindow
            onClose={() => setCurrentPage('home')}
            onLoggedIn={() => setCurrentPage('home')}
          />
        )}
      </div>
    </>
  )
}

export default App
