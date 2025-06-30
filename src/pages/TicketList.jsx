import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const TicketList = () => {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:3001/tickets', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setTickets(res.data)
      } catch (err) {
        console.error('Error fetching tickets:', err)
      }
    }
    fetchTickets()
  }, [])

  return (
    <div className="admin-ticket-container">
      <h2>My Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets submitted yet.</p>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id}>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link
                    to={`/tickets/${ticket._id}`}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TicketList