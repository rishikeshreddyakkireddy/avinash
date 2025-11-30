# Node.js + MongoDB CRUD API

A basic backend setup with Node.js, Express, and MongoDB featuring complete CRUD operations.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/interview_db
```

For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interview_db
```

### 3. Start MongoDB (if running locally)

```bash
mongod
```

### 4. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Items CRUD (v1)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/items` | Get all items |
| GET | `/api/v1/items/:id` | Get single item by ID |
| POST | `/api/v1/items` | Create new item |
| PUT | `/api/v1/items/:id` | Update item by ID |
| DELETE | `/api/v1/items/:id` | Delete item by ID |

### Sample Request Bodies

**Create Item (POST /api/v1/items)**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1299.99,
  "quantity": 10
}
```

**Update Item (PUT /api/v1/items/:id)**
```json
{
  "price": 1199.99,
  "quantity": 8
}
```

## Testing the API

You can test using curl, Postman, or any HTTP client.

### Example with curl:

```bash
# Health check
curl http://localhost:3000/health

# Get all items
curl http://localhost:3000/api/v1/items

# Create an item
curl -X POST http://localhost:3000/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Gaming laptop","price":1500,"quantity":5}'

# Get single item
curl http://localhost:3000/api/v1/items/{item_id}

# Update an item
curl -X PUT http://localhost:3000/api/v1/items/{item_id} \
  -H "Content-Type: application/json" \
  -d '{"price":1400}'

# Delete an item
curl -X DELETE http://localhost:3000/api/v1/items/{item_id}
```

## Project Structure

```
├── config/
│   └── database.js      # MongoDB connection
├── models/
│   └── Item.js          # Item model schema
├── routes/
│   └── items.js         # CRUD routes
├── .env                 # Environment variables (create this)
├── .env.example         # Example environment variables
├── .gitignore          # Git ignore file
├── package.json        # Dependencies
├── server.js           # Main server file
└── README.md           # This file
```

## Features

- ✅ Express.js server setup
- ✅ MongoDB connection with Mongoose
- ✅ Complete CRUD operations
- ✅ API versioning (v1)
- ✅ Input validation
- ✅ Error handling
- ✅ Clean code structure
- ✅ Environment variable configuration
- ✅ CORS enabled

## Notes for Interview

- The code is modular and follows MVC pattern
- Each route has proper error handling
- Mongoose schema includes validation
- Ready to extend with additional models or features
- Can easily add authentication, pagination, or other features as needed

Good luck with your interview! 🚀

