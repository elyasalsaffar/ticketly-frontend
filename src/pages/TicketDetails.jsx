import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

const TicketDetails = () => {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)

  useEffect(() => {
    // Fetch ticket details from API based on ticket ID
    const fetchTicket = async () => {
      try {
        const res = await axios.get(`/tickets/${id}`)
        setTicket(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTicket()
  }, [id])

  // Show loading state while fetching data
  if (!ticket) return <div>Loading...</div>

  return (
    <div>
      <h2>Ticket Details</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
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
      </table>
      <div style={{ marginTop: '20px' }}>
        {/* Link to go back to the ticket list */}
        <Link to="/">Back to list</Link>
      </div>
    </div>
  )
}

export default TicketDetails
