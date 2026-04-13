// ====================================
// Imports / Constants
// ====================================

const path = require('path');
const express = require('express');

// 🔎 Load .env variables and import the cookie session module
require('dotenv').config();
const cookieSession = require('cookie-session');

const logRoutes = require('./middleware/logRoutes');
const { register, login, getMe, logout } = require('./controllers/authControllers');
const { listUsers, updateUser, deleteUser } = require('./controllers/userControllers');

const app = express();
const PORT = process.env.PORT || 8080;

const pathToFrontend = process.env.NODE_ENV === 'production' ? '../frontend/dist' : '../frontend';

// ====================================
// Middleware
// ====================================

app.use(logRoutes);

// 🔎 Add a 'session' object to all requests with the cookie
app.use(cookieSession({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  maxAge: 24 * 60 * 60 * 1000, // The cookie lasts for 24 hours
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, pathToFrontend)));

// ====================================
// Auth routes
// ====================================

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// 🔎 The client can send a /api/auth/me request with their cookie to remain logged in
app.get('/api/auth/me', getMe);
app.delete('/api/auth/logout', logout);

// ====================================
// User routes
// ====================================

app.get('/api/users', listUsers);
app.patch('/api/users/:user_id', updateUser);
app.delete('/api/users/:user_id', deleteUser);

// ====================================
// Global Error Handling
// ====================================

// Error-handling middleware must have exactly four parameters
const handleError = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
};

app.use(handleError);

// ====================================
// Listen
// ====================================

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
