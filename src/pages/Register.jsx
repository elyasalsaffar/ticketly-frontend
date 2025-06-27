import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate, Link } from 'react-router-dom'

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
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
    setErrors({ ...errors, [e.target.id]: ''})
    setApiError('')
  }

  const validate = () => {
    const newErrors = {}

    if (!formValues.first.trim()) newErrors.first = 'First name is required'
    if (!formValues.last.trim()) newErrors.last = 'Last name is required'
    if (!formValues.email.trim()) {
        newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        newErrors.email = 'Email format is invalid'
    }
    if (!formValues.phone.trim()) {
        newErrors.phone = 'Phone number is required'
    } else if (!/^\d+$/.test(formValues.phone)) {
        newErrors.phone = 'Phone must be numeric'
    }
    if (!formValues.password) {
        newErrors.password = 'Password is required'
    } else if (formValues.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
    }
    if (formValues.password !== formValues.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
    }

    try {
     await RegisterUser({
      first: formValues.first,
      last: formValues.last,
      email: formValues.email,
      password: formValues.password,
      phone: formValues.phone
     })
     setFormValues(initialState)
     navigate('/signin')
    } catch (error) {
     if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.includes('already been registered')
     ) {
        setApiError('An account with this email already exists.')
     } else {
        setApiError('Something went wrong. Please try again.')
     }
    }
  }

  return (
    <div className="col register">
      <form className='auth-form' onSubmit={handleSubmit}>
        {apiError && <p style={{ color: 'red' }}>{apiError}</p>}

        <div className="input-wrapper">
          <label htmlFor="first">First Name</label>
          <input
            onChange={handleChange}
            id="first"
            type="text"
            value={formValues.first}
            required
          />
          {errors.first && <span style={{ color: 'red' }}>{errors.first}</span>}
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
          {errors.last && <span style={{ color: 'red' }}>{errors.last}</span>}
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
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
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
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
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
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
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
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
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
            <Link to='/signin'>Sign in here</Link>
        </p>
      </form>
    </div>
  )
}

export default Register