# Fitness Tracker Website

A modern fitness tracking web application where users can manage workouts, track progress, and maintain a healthy lifestyle.

## 🚀 Features

- User authentication (Login / Signup)
- Dashboard to track fitness activities
- Workout tracking
- Responsive UI
- Secure backend API
- Token based authentication
- Real-time UI updates

## 🛠️ Tech Stack

Frontend:
- HTML
- CSS
- JavaScript
- React
- Axios

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Deployment:
- Vercel (Frontend)
- Render / Other backend hosting

## 📂 Project Structure

```
fitness-tracker
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── App.js
│
├── backend
│   ├── routes
│   ├── controllers
│   ├── models
│   └── server.js
│
└── README.md
```

## ⚙️ Installation

### 1 Clone the repository

```bash
git clone https://github.com/your-username/fitness-tracker.git
```

### 2 Go to project directory

```bash
cd fitness-tracker
```

### 3 Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

### 4 Run the project

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm start
```

## 🔑 Environment Variables

Create a `.env` file in the backend folder.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

For frontend (Vite):

```
VITE_API_BASE_URL=http://localhost:5000
```

## 🌐 Deployment

Frontend deployed on **Vercel**.

To deploy:

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

## 📸 Screenshots

Add screenshots of your project here.

## 🧑‍💻 Author

**Swadhin Kumar Kar**

- GitHub: https://github.com/Swadhin-kar
- LinkedIn: https://www.linkedin.com/in/swadhin-kumar-kar-b13166355/

## 📄 License

This project is open source and available under the MIT License.