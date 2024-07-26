<p align="center">
<img src="screenshots/logo.png" width="128px" />
<h1>💸 Expense Tracker</h1>
<h3>A simple expense tracker application with authentication built the MERN stack.</h3>
</p>

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/maciekt07/ExpenseTracker?color=%230061FF)
![GitHub License](https://img.shields.io/github/license/maciekt07/ExpenseTracker?color=%230061FF)

## Tech stack

<ul>
  <li>React</li>
  <li>Redux</li>
  <li>TypeScript</li>
  <li>Vite</li>
  <li>Tailwind CSS</li>
  <li>DaisyUI</li>
  <li>Node.js</li>
  <li>Express</li>
  <li>MongoDB</li>
</ul>

## To run this project locally

### 1. Clone the Repository

First, clone the project repository from GitHub.

```bash
git clone https://github.com/maciekt07/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Configure Environment Variables

Create a .env file in the backend directory and fill it with your MongoDB token and JSON Web Token (JWT) key.

```env
MONGODB_URI=your_mongodb_token
JWT_SECRET=your_jwt_secret
```

### 3. Install Backend Dependencies and run the Server

```bash
cd backend
npm install
npm run dev
```

The server will start running on port 8000.

### 4. Install Frontend Dependencies and run the Client

```bash
cd frontend
npm install
npm run dev
```

The client will start running on port 5173.
