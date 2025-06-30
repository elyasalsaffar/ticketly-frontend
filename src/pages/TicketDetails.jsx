import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

const TicketDetails = () => {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://localhost:3001/tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setTicket(res.data)
        fetchNotes(res.data._id)
      } catch (err) {
        console.error('Error fetching ticket details:', err)
      }
    }
    fetchTicket()
  }, [id])

  const fetchNotes = async (ticketId) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:3001/notes/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setNotes(res.data)
    } catch (err) {
      console.error('Error fetching notes:', err)
    }
  }

  // Show loading state while fetching data
  if (!ticket) return <div>Loading...</div>

  return (
    <div className='ticket-details'>
      <h2>Ticket Details</h2>
      <table className='ticket-table'>
        <tbody>
          <tr>
            <th>Title</th>
            <td>{ticket.title}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{ticket.description}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{ticket.status}</td>
          </tr>
          <tr>
            <th>Priority</th>
            <td>{ticket.priority}</td>
          </tr>
          <tr>
            <th>User</th>
            <td>{ticket.user}</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>{ticket.department}</td>
          </tr>
          <tr>
            <th>Attachment</th>
            <td>{ticket.attachment ? ticket.attachment : 'None'}</td>
          </tr>
        </tbody>

        <h3 style={{ paddingLeft: '10px' }}>Admin Notes</h3>
      {notes.length > 0 ? (
        <ul>
          {notes.map(note => (
            <li key={note._id}>
              <strong>{note.user.first}:</strong> {note.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No admin notes available.</p>
      )}

      </table>
      <div style={{ marginTop: '20px' }}>
        <Link to="/ticketsList" className="back-link">Back to list</Link>
      </div>
    </div>
  )
}

export default TicketDetails
