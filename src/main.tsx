import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import firebase from './firebase.tsx'

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <>
      {firebase.error && (
        <div
          style={{
            padding: '12px 16px',
            margin: 0,
            background: '#c00',
            color: '#fff',
            textAlign: 'center',
            fontSize: '14px',
          }}
          role="alert"
        >
          {firebase.error}
        </div>
      )}
      <App />
    </>
  </StrictMode>,
)
