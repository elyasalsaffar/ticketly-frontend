import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const TicketList = () => {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('/ticketList')
        setTickets(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTickets()
  }, [])

  return (
    <div>
      <h2>Ticket List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>
                {/* Use Link for routing to details */}
                <Link to={`/tickets/${ticket._id}`}>{ticket._id}</Link>
              </td>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TicketList
