import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate, Link } from 'react-router-dom'

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()

  const initialState = { email: '', password: '' }

  const [formValues, setFormValues] = useState(initialState)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const payload = await SignInUser(formValues)
      setFormValues(initialState)
      setUser(payload)
      navigate('/ticketing')
    } catch (error) {
      if (error.response && 
        (error.response.status === 401 || error.response.status === 400)
      ) {
        setError('Invalid email or password.')
      } else {
        setError('Something went wrong. Please try again later.')
      }
    }
    
  }

  return (
    <div className="col signin">
      <form className="col" onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            id="email"
            type="email"
            placeholder="example@example.com"
            value={formValues.email}
            required
            autoComplete="email"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            value={formValues.password}
            required
          />
        </div>
        <button disabled={!formValues.email || !formValues.password}>
          Sign In
        </button>
        <p>
            Don't have an account?{' '}
            <Link to='/register'>Register here</Link>
        </p>
      </form>
    </div>
  )
}

export default SignIn