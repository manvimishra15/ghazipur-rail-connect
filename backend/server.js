require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize DB (runs schema creation + auto-seed on first run)
require('./database/schema');
require('./database/seed');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOADS_PATH || './uploads')));

// API Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/announcements', require('./src/routes/announcements'));
app.use('/api/courses', require('./src/routes/courses'));
app.use('/api/gallery', require('./src/routes/gallery'));
app.use('/api/faculty', require('./src/routes/faculty'));
app.use('/api/results', require('./src/routes/results'));
app.use('/api/ebooks', require('./src/routes/ebooks'));
app.use('/api/magazine', require('./src/routes/magazine'));
app.use('/api/notices', require('./src/routes/notices'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'ZRTI Ghazipur API running' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ZRTI Backend running on http://localhost:${PORT}`));
