import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    first: '',
    last: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      first: formValues.first,
      last: formValues.last,
      email: formValues.email,
      password: formValues.password,
      phone: formValues.phone
    })
    setFormValues(initialState)
    navigate('/signin')
  }

  return (
    <div className="col register">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="first">First Name</label>
          <input
            onChange={handleChange}
            id="first"
            type="text"
            placeholder="John Doe"
            value={formValues.first}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="last">Last Name</label>
          <input
            onChange={handleChange}
            id="last"
            type="text"
            value={formValues.last}
            required
          />
        </div>
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
          <label htmlFor="phone">Phone</label>
          <input
            onChange={handleChange}
            id="phone"
            type="tel"
            value={formValues.phone}
            required
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
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="confirmPassword"
            value={formValues.confirmPassword}
            required
          />
        </div>
        <button
         disabled={
            !formValues.first ||
            !formValues.last ||
            !formValues.email ||
            !formValues.phone ||
            !formValues.password ||
            formValues.password !== formValues.confirmPassword
         }
        >

          Register
        </button>
        <p>
            Already have an account?{' '}
            <a href="/signin">Sign in here</a>
        </p>
      </form>
    </div>
  )
}

export default Register