import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Ticketing from './pages/Ticketing'
import Profile from './pages/Profile'
import { CheckSession } from './services/Auth'
import { useEffect } from 'react'
import SidebarNav from './components/SidebarNav'
import './App.css'
import UserManagement from './pages/UserManagement'
import SubmitTicket from './pages/SubmitTicket'
import AdminDashboard from './pages/AdminDashboard'
import AdminTicketList from './pages/AdminTicketList'
import TicketList from './Pages/TicketList'
import TicketDetails from './Pages/TicketDetails'

const App = () => {

  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    try {
      const user = await CheckSession()
      setUser(user)
    } catch (error) {
      console.error('Session check failed:', error)
      localStorage.removeItem('token')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
     if (token) {
      checkToken()
     }
  }, [])

  return (
    <>
      {user && <SidebarNav user={user} handleLogOut={handleLogOut} />}
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ticketing" element={<Ticketing />} />
          <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/tickets" element={<AdminTicketList />} />
          <Route path="/create-ticket" element={<SubmitTicket />} />
          <Route path="/ticketList" element={<TicketList />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
        </Routes>
      </main>
    </>
  )
}

export default App