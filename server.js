const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API versioning middleware - adds version info to response
app.use((req, res, next) => {
  res.setHeader('X-API-Version', 'v1');
  next();
});

// API versioning - v1 routes
const v1Routes = express.Router();
v1Routes.use('/items', require('./routes/items'));

// Mount versioned routes
app.use('/api/v1', v1Routes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    version: 'v1',
    timestamp: new Date().toISOString()
  });
});

// Root route with API info
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the API',
    version: 'v1',
    endpoints: {
      health: '/health',
      items: '/api/v1/items'
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Version: v1`);
});
