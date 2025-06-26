import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SidebarNav = ({ user, handleLogOut }) => {
    return (
      <aside className='sidebar-nav'>
        <div className='user-greeting'>
            <h3>Welcome {user.first} {user.last}!</h3>
        </div>
        <nav>
            <ul>
                <li>
                    <NavLink to='/ticketing' className={({ isActive }) => (isActive ? 'active-link' : '')}>
                        Ticketing Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/create-ticket' className={({ isActive }) => (isActive ? 'active-link' : '')}>
                        Submit Ticket
                    </NavLink>
                </li>
                {user.role === 'admin' && (
                    <>
                    <li>
                        <NavLink to='/admin/users' className={({ isActive }) => (isActive ? 'active-link' : '')}>
                            User Management
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/admin/tickets' className={({ isActive }) => (isActive ? 'active-link' : '')}>
                            Tickets Management
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/admin/notifications' className={({ isActive }) => (isActive ? 'active-link' : '')}>
                            Notifications
                        </NavLink>
                    </li>
                    </>
                )}
                <li>
                    <Link onClick={handleLogOut} to='/'>
                        Sign Out
                    </Link>
                </li>
            </ul>
        </nav>
      </aside>
    )
}

export default SidebarNav