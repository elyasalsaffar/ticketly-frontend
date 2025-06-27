import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Client from "../services/api"

const Profile =({ user, setUser }) => {

    const navigate = useNavigate()

    const [editing, setEditing] = useState(false)
    const [formValues, setFormValues] = useState({
        first: '',
        last: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        profilePicture: ''
    })

    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (user) {
            setFormValues({
                first: user.first || '',
                last: user.last || '',
                email: user.email || '',
                phone: user.phone || '',
                password: '',
                confirmPassword: '',
                profilePicture: user.profilePicture || ''
            })
        }
    }, [user])

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.id]: e.target.value })
        setErrors({})
        setMessage('')
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

        if (formValues.password) {
            if (formValues.password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters'
            }
            if (formValues.password !== formValues.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match'
            }
        }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
    }

  try {
    const token = localStorage.getItem('token')

    const updatePayload = {
        first: formValues.first,
        last: formValues.last,
        email: formValues.email,
        phone: formValues.phone,
        profilePicture: formValues.profilePicture
    }

    if (formValues.password) {
        updatePayload.password = formValues.password
    }

    const response = await Client.put(`/auth/users/${user.id}`, updatePayload)

    setMessage('Profile updated successfully!')
    setUser(response.data.user)
    localStorage.setItem('token', response.data.token)
    setEditing(false)
  } catch (error) {
    setMessage('Error updating profile.')
  }
}

const handleCancel = () => {
    if (user) {
            setFormValues({
                first: user.first || '',
                last: user.last || '',
                email: user.email || '',
                phone: user.phone || '',
                password: '',
                confirmPassword: '',
                profilePicture: user.profilePicture || ''
            })
        }
        setErrors({})
        setMessage('')
        setEditing(false)
  }

    if (!user) { // Prevents component crash by checking if user exists
        return <div>Loading Profile...</div>
    }

    return (
        <div className="profile-page">
            <div className="profile">

            {!editing && (
                <>
                <h2>Hello, {user.first}!</h2>
                <div className="profile-header">
                <img src={user.profilePicture || 'https://via.placeholder.com/150'} alt="Profile" className="profile-picture" />
                <div className="profile-details">
                <p><strong>First Name:</strong> {user.first}</p>
                <p><strong>Last Name:</strong> {user.last}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                </div>
                </div>
                <div className="profile-actions">
                <button onClick={() => setEditing(true)}>
                    Edit Profile
                </button>
                </div>
                </>
            )}

      {editing && (   
        <>
        <h2 style={{ textAlign: 'center' }}>Editing {user.first}'s Profile</h2>         
      <form onSubmit={handleSubmit}>
        {['first', 'last', 'email', 'phone'].map((field) => (
            <div className="input-wrapper" key={field}>
                <label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}</label>
                <input 
                  type="text"
                  id={field}
                  value={formValues[field]}
                  onChange={handleChange}
                  />
                  {errors[field] && <span style={{ color: 'red' }}>{errors[field]}</span>}
            </div>
            
        ))}

        <div className="input-wrapper">
            <label htmlFor="profilePicture">Profile Picture URL</label>
            <input 
            type="text"
            id="profilePicture"
            value={formValues.profilePicture}
            onChange={handleChange}
             />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">New Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            value={formValues.password}
            placeholder="Leave blank to keep current password"
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
            placeholder="Only needed if changing password"
          />
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
        </div>
        <div className="profile-button-row">
          <button type="submit" className="profile-update-btn">Update Profile</button>
          <button type="button" onClick={handleCancel} className="profile-cancel-btn">Cancel</button>
        </div>
        </form>
        </>
    )}

    {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
    </div>
    
    )
}

export default Profile