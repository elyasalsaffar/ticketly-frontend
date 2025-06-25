import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="col home">

      <section>
        <button onClick={() => navigate('/register')}>
          Click Here To Get Started
        </button>
      </section>
    </div>
  )
}

export default Home