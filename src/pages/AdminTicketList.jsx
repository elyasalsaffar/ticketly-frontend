import { useEffect, useState } from "react";
import Client from '../services/api'

const AdminTicketList = () => {
    
    const [tickets, setTickets] = useState([])
    const [filter, setFilter] = useState('open')
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [noteContent, setNoteContent] = useState('')

    useEffect(() => {
        fetchTickets()
    }, [filter])

    const fetchTickets = async () => {
        try {
            const response = await Client.get('/admin')
            const filtered = response.data.filter(t => t.status === filter)
            setTickets(filtered)
            setSelectedTicket(null)
        } catch (error) {
            console.error('Failed to fetch tickets', error)
        }
    }

    const closeTicket = async (ticketId) => {
        try {
            await Client.put(`admin/${ticketId}`, { status: 'closed' })
            fetchTickets()
        } catch (error) {
            console.error('Failed to close ticket', error)
        }
    }

    const reopenTicket = async (ticketId) => {
        try {
            await Client.put(`admin/${ticketId}`, { status: 'open' })
            fetchTickets()
        } catch (error) {
            console.error('Failed to reopen ticket', error)
        }
    }

    const handleAddNote = async () => {
        if (!noteContent.trim()) return

        try {
            await Client.post('/notes', {
                content: noteContent,
                ticket: selectedTicket._id,
                isAdmin: true
            })
            setNoteContent('')
            alert('Note added.')
        } catch (error) {
            console.error('Failed to add note', error)
        }
    }

    return (
        <div className="admin-ticket-container">
          <h2>Admin Ticket Management</h2>

          <div className="filter-toggle">
            <button
            onClick={() => setFilter('open')}
            className={filter === 'open' ? 'active' : ''}
            >
            Open
            </button>
            <button
            onClick={() => setFilter('closed')}
            className={filter === 'closed' ? 'active' : ''}
            >
            Closed
            </button>
          </div>
          {tickets.length === 0 ? (
            <p>No {filter} tickets found.</p>
          ) : (
            <table className="ticket-table">
              <thead>
                <tr>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Department</th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(ticket => (
                    <tr key={ticket._id}>
                        <td>{ticket.title}</td>
                        <td>{ticket.priority}</td>
                        <td>{ticket.department}</td>
                        <td>{ticket.user?.email || ticket.user?.first || 'Unknown'}</td>
                        <td>{ticket.status}</td>
                        <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                        <td>
                          <div className="ticket-actions">
                            <button onClick={() => {
                                setSelectedTicket(prev => {
                                    if (prev && prev._id === ticket._id) {
                                        setNoteContent('')
                                        return null
                                    } else {
                                        setNoteContent('')
                                        return ticket
                                    }
                                })
                            }}>
                             {selectedTicket?._id === ticket._id ? 'Hide' : 'View'}
                            </button>
                             {ticket.status === 'open' ? (
                                <button onClick={() => closeTicket(ticket._id)}>Close</button>
                             ) : (
                                <button onClick={() => reopenTicket(ticket._id)}>Reopen</button>
                             )}
                          </div>
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
          )}
            {selectedTicket && (
                <div className="ticket-details">
                    <h3>Ticket Details</h3>
                    <p><strong>Title:</strong> {selectedTicket.title}</p>
                    <p><strong>Description:</strong> {selectedTicket.description}</p>
                    <p><strong>Status:</strong> {selectedTicket.status}</p>
                    <p><strong>Priority:</strong> {selectedTicket.priority}</p>
                    <p><strong>Department:</strong> {selectedTicket.department}</p>

                    <div className="note-form">
                     <textarea 
                      rows='4'
                      placeholder="Write an admin note..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                     >
                     </textarea>
                     <button onClick={handleAddNote}>Add Note</button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default AdminTicketList