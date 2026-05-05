# Team Task Manager

A full-stack web application designed for teams to create projects, assign tasks, and track progress with role-based access control.

## 🚀 Features
- **Role-Based Authentication**: Secure login and signup with `Admin` and `Member` roles.
- **Project Management**: Admins can create new projects and assign specific team members to them.
- **Task Management**: Admins can create and assign tasks to single or multiple project members.
- **Member Dashboards**: Members have a dedicated view for tasks assigned specifically to them and can easily update task statuses.
- **Statistics**: Real-time tracking of total projects, total tasks, and completed tasks.
- **Cloud Database**: Integrated with MongoDB Atlas.
- **Modern UI**: Fully responsive, premium interface built with Tailwind CSS v4.

## 💻 Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS v4, React Router DOM, Axios, Lucide React (Icons).
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT) & bcrypt (Password Hashing)

## 🛠️ Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/GautamKumarTiwary/team-task-manager.git
cd team-task-manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
MONGO_URI=your_mongodb_atlas_connection_string
```
Start the backend server:
```bash
npm start
# OR for development:
node server.js
```

### 3. Frontend Setup
Open a new terminal window/tab:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173/`.

## 🌐 Deployment
- **Frontend**: Designed to be easily hosted on platforms like **Vercel** or Netlify.
- **Backend**: Configured to be compatible with **Render** (using standard `app.listen()`) and **Vercel Serverless Functions** (using `module.exports = app`). 
  - *Note: If hosting the backend on Render, the backend `.env` file variables must be manually added to Render's Environment Variables dashboard.*
