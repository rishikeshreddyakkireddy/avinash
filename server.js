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

// API versioning - v1 routes
const v1Routes = express.Router();

// v1 middleware - sets version header
v1Routes.use((req, res, next) => {
  res.setHeader('X-API-Version', 'v1');
  next();
});

v1Routes.use('/items', require('./routes/items'));

// API versioning - v2 routes
const v2Routes = express.Router();

// v2 middleware - sets version header
v2Routes.use((req, res, next) => {
  res.setHeader('X-API-Version', 'v2');
  next();
});

v2Routes.use('/items', require('./routes/items-v2'));

// Mount versioned routes
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

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
    versions: {
      v1: {
        status: 'stable',
        endpoints: {
          items: '/api/v1/items'
        }
      },
      v2: {
        status: 'latest',
        endpoints: {
          items: '/api/v2/items'
        },
        enhancements: [
          'Enhanced response metadata',
          'Soft delete support (?soft=true)',
          'Item value calculations',
          'Notification hooks'
        ]
      }
    },
    health: '/health'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Version: v1`);
});
