// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRouter = require('./src/routes/auth');
const usersRouter = require('./src/routes/users');
const transactionsRouter = require('./src/routes/transactions');
const categoriesRouter = require('./src/routes/categories');
const goalsRouter = require('./src/routes/goals');
const notificationsRouter = require('./src/routes/notifications');

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*'
};

app.use(cors(corsOptions));
app.use(express.json());

// rotas
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/notifications', notificationsRouter);

// rota health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
