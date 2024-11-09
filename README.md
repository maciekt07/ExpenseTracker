<p align="center">
<img src="screenshots/logo.png" width="128px" />
<h1>💸 Expense Tracker</h1>
<h3>A simple expense tracker application with authentication built with the MERN stack.</h3>
</p>

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/maciekt07/ExpenseTracker?color=%230061FF)
![GitHub last commit](https://img.shields.io/github/last-commit/maciekt07/ExpenseTracker?color=%230061FF)
![GitHub License](https://img.shields.io/github/license/maciekt07/ExpenseTracker?color=%230061FF)

<p align="center">
<img src="screenshots/preview.png" width="650px" />
</p>

## Tech stack

<ul style="display: flex; flex-direction: column; gap:6px;">
  <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=react" alt="react" width="24" style="vertical-align: middle; margin-right: 4px;" /> React
  </li>
  <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=redux" alt="redux" width="24" style="vertical-align: middle; margin-right: 4px;" /> Redux
  </li>
   <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=ts" alt="ts" width="24" style="vertical-align: middle; margin-right: 4px;" /> TypeScript
  </li>
   <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=vite" alt="vite" width="24" style="vertical-align: middle; margin-right: 4px;" /> Vite
  </li>
   <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=tailwind" alt="Tailwind" width="24" style="vertical-align: middle; margin-right: 4px;" /> Tailwind CSS
  </li>
   <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=daisyui" alt="daisyui" width="24" style="vertical-align: middle; margin-right: 4px;"/> DaisyUI
  </li>
    <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=nodejs" alt="nodejs" width="24" style="vertical-align: middle; margin-right: 4px;" /> Node.js
  </li>
    <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=express" alt="express" width="24" style="vertical-align: middle; margin-right: 4px;" /> Express
  </li>
     <li style="vertical-align: middle;">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=mongodb" alt="mongodb" width="24" style="vertical-align: middle; margin-right: 4px;" /> MongoDB
  </li>
</ul>

## Features

- Dark Mode
- Currency Selection with Intl API [https://codepen.io/maciekt07/pen/zYVdPLy](https://codepen.io/maciekt07/pen/zYVdPLy)
- Profile Picture Upload
- JWT Authentication

## To run this project locally

### 1. Clone the Repository

First, clone the project repository from GitHub.

```bash
git clone https://github.com/maciekt07/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Configure Environment Variables

Create a .env file and fill it with your MongoDB token and JSON Web Token (JWT) key. You can use .env.example as a reference for the required format.

```env
MONGODB_URI=your_mongodb_token
JWT_SECRET=your_jwt_secret
```

### 3. Install Backend Dependencies

```bash
npm install
```

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 5. Run the Server and Client

```bash
cd ..
npm run dev
```

<img src="screenshots/console.png" width="400px" />

The server will start running on port 8000.

The client will start running on port 5173.

## Credits

Made with ❤️ by [maciekt07](https://github.com/maciekt07).

Inspired by [Traversy Media Course](https://youtu.be/-0exw-9YJBo?si=Sb0nOUDenxp5Ez3X).
