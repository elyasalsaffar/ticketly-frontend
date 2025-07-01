import { useNavigate } from 'react-router-dom'

const Home = ({ user }) => {
  let navigate = useNavigate()

  return (
    <div className="col home-page">
        <h1 className='home-title'>Ticketly</h1>
    {!user ? (
      <section className='home-intro'>
        <h2>Welcome to <strong>Ticketly</strong>, an IT Support Ticket System.</h2>
        <div className='home-buttons'>
            <button onClick={() => navigate('/signin')}>Sign In</button>
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </section>
    ) : (
        <section className='home-intro'>
            <h2>Welcome back!</h2>
            <p>Use the sidebar to navigate.</p>
        </section>
    )}
    </div>
  )
}

export default Home