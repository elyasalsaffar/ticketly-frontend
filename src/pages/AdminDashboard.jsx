import { useEffect, useState } from "react";
import Client from '../services/api'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
    
    const [userCount, setUserCount] = useState(0)
    const [ticketCount, setTicketcount] = useState(0)
    const [openTickets, setOpenTickets] = useState(0)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const usersResponse = await Client.get('./auth/all-users')
            const ticketsResponse = await Client.get('/admin')

            setUserCount(usersResponse.data.length)
            setTicketcount(ticketsResponse.data.length)
            setOpenTickets(ticketsResponse.data.filter(t => t.status === 'open').length)
        } catch (error) {
            console.error('Error fetching dashboard stats', error)
        }
    }

    const closedTickets = ticketCount - openTickets

    const pieData = [
        { name: 'Open', value: openTickets },
        { name: 'Closed', value: closedTickets }
    ]

    const COLORS = ['#007bff', '#28a745']

    return (
        <div style={{ marginLeft: '200px', padding: '30px' }}>
            <h2>Admin Dashboard</h2>
            <div className="dashboard-grid">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{userCount}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Tickets</h3>
                    <p>{ticketCount}</p>
                </div>
                <div className="stat-card">
                    <h3>Open Tickets</h3>
                    <p>{openTickets}</p>
                </div>
            </div>

            <div className="dashboard-chart">
                <h3>Ticket Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                     data={pieData}
                     cx="50%"
                     cy="50%"
                     outerRadius={80}
                     label
                     dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )

}

export default AdminDashboard