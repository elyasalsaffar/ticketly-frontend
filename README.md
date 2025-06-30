# ticketly-backend

# ticketly-backend

---

## 🎫 Ticket Management System (MERN Stack)

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to create and manage support tickets, and provides an admin dashboard for support staff to respond and monitor tickets.

---

## 📸 Screenshots

### 🖥️ Home Page  
![Home Page](./screenshots/homepage.png)

### 🧾 Submit Ticket  
![Submit Ticket](./screenshots/submit-ticket.png)

### 📂 My Tickets View  
![My Tickets](./screenshots/my-tickets.png)

### 📋 Admin Dashboard  
![Admin Dashboard](./screenshots/admin-dashboard.png)

### 💬 Admin Reply with Notes  
![Admin Reply](./screenshots/admin-reply.png)

### 📨 Email Notification Example  
![Email Notification](./screenshots/email-notification.png)

---

## 📦 Features

### 👤 User Features:
- 📝 Register and log in securely (JWT Authentication)
- 📨 Submit support tickets with title, description, category, and optional file attachments
- 📋 View submitted tickets and their statuses
- 📧 Receive email notifications when a ticket is updated or replied to
- 🔁 See the number of replies (notes) on each ticket

### 🛠️ Admin Features:
- 🔐 Secure login to access admin dashboard
- 🗃️ View, delete, and update user roles
- 🕵️ View all tickets with full details and attachments
- 💬 Reply to tickets using internal notes
- 🔄 Change ticket status (e.g., Open, Closed)
- 📩 Trigger automatic email notifications on updates
- 📈 See the number of replies per ticket
- 🗂️ Categorize tickets
- 📎 Attach files in replies
- 📊 View system statistics (total tickets, open/closed , total users)

---

## 📌 Technologies Used

### 🖥️ Frontend:
- React.js ⚛️
- React Router DOM 🧭
- Context API 📚
- Axios 🌐
- Tailwind CSS 🎨


### 🔧 Backend:
- Node.js 🔙
- Express.js 🚂
- MongoDB 🍃
- Mongoose 🧬
- JWT Authentication 🔐
- Bcrypt.js 🔒
- dotenv 🧾

---

## 📚 User Stories

---

### 👥 User Stories (User)

1. 👤 As a user, I want to register and log in so that I can submit and track my support tickets.  
2. 📨 As a user, I want to submit a support ticket with a title, description, category, and (optional) file attachments to request help.  
3. 📋 As a user, I want to view all my submitted tickets and their statuses so I can follow up on my requests.  
4. 📧 As a user, I want to receive email notifications when my ticket gets a reply or its status changes so I stay informed.  
5. 🔁 As a user, I want to see the number of replies (notes) on each ticket to understand the level of activity.

---

### 🛠 User Stories (Admin / Support)

1. 🔐 As an admin, I want to log in securely to access the admin dashboard.  
2. 🗃️ As an admin, I want to view, delete, and update user roles to manage the system effectively.  
3. 🕵️ As an admin, I want to view all tickets with details and attachments to monitor and manage user requests.  
4. 💬 As an admin, I want to reply to tickets using notes to assist users with their issues.  
5. 🔄 As an admin, I want to change the status of tickets (e.g., open, closed) to indicate progress.  
6. 📩 As an admin, I want to trigger automatic email notifications to users when a ticket is updated or replied to.  
7. 📈 As an admin, I want to see the number of replies (notes) per ticket for better tracking and prioritization.  
8. 🗂️ As an admin, I want to categorize tickets (optional) to better organize support topics.  
9.📎 As an admin, I want to attach files in replies (optional) to provide additional resources or information.  
10. 📊 As an admin, I want to view system statistics (total tickets, total users, open vs. closed tickets) to assess support performance.