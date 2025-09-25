import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage.jsx'
import UserPage from './pages/UserPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <main>
        <div className="container" style={{ paddingTop: 16 }}>
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  )
}
