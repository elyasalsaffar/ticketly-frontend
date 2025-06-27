import { useState, useEffect } from "react";
import Client from '../services/api'

const UserManagement = () => {
    
    const [users, setUsers] = useState([])
    const [editingUserId, setEditingUserId] = useState(null)
    const [editForm, setEditForm] = useState({})

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await Client.get('/auth/all-users')
            setUsers(response.data)
        } catch (error) {
            console.error('Error fetching users', error)
        }
    }

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {
            await Client.put(`/auth/users/${editingUserId}`, editForm)
            setEditingUserId(null)
            fetchUsers()
        } catch (error) {
            console.error('Error updating user', error)
        }
    }

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return
        try {
            await Client.delete(`/auth/users/${userId}`)
            fetchUsers()
        } catch (error) {
            console.error('Error deleting user', error)
        }
    }

    const handleEditClick = (user) => {
        setEditingUserId(user._id)
        setEditForm({
            first: user.first || '',
            last: user.last || '',
            email: user.email || '',
            phone: user.phone || '',
            role: user.role || ''
        })
    }

    return (
    <div style={{ marginLeft: '220px', padding: '30px' }}>
        <h2>User Management</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
         <thead>
           <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th colSpan="2">Actions</th>
           </tr>
         </thead>
         <tbody>
            {users.map((user) => 
              editingUserId === user._id ? (
                <tr key={user._id}>
                 <td><input name="first" value={editForm.first} onChange={handleChange} /></td>
                 <td><input name="last" value={editForm.last} onChange={handleChange} /></td>
                 <td><input name="email" value={editForm.email} onChange={handleChange} /></td>
                 <td><input name="phone" value={editForm.phone} onChange={handleChange} /></td>
                 <td>
                    <select name="role" value={editForm.role} onChange={handleChange} className="user-management-select">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                 </td>
                <td><button onClick={handleSave}>Save</button></td>
                <td><button onClick={() => setEditingUserId(null)}>Cancel</button></td>
                </tr>
              ) : (
                <tr key={user._id}>
                 <td>{user.first}</td>
                 <td>{user.last}</td>
                 <td>{user.email}</td>
                 <td>{user.phone}</td>
                 <td>{user.role}</td>
                 <td><button onClick={() => handleEditClick(user)}>Edit</button></td>
                 <td><button onClick={() => handleDelete(user._id)}>Delete</button></td>
                </tr>
              )
            )}
         </tbody>
        </table>
    </div>
    )
}

export default UserManagement