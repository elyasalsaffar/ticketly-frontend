import { useNavigate } from 'react-router-dom'

const Home = ({ user }) => {
  let navigate = useNavigate()

  return (
    <div className="col home">
    {!user ? (
      <section>
        <button onClick={() => navigate('/register')}>
          Click Here To Get Started
        </button>
      </section>
    ) : (
        <section>
            <h2>Welcome back!</h2>
            <p>Use the sidebar to navigate.</p>
        </section>
    )}
    </div>
  )
}

export default Home