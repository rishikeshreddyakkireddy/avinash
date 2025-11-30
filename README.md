# Node.js + MongoDB CRUD API

A basic backend setup with Node.js, Express, and MongoDB featuring complete CRUD operations with API versioning.

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

## API Versioning

This API supports multiple versions running simultaneously. Clients can choose which version to use.

### Version 1 (v1) - Stable

Basic CRUD operations with standard response format.

**Endpoints:**
- `GET /api/v1/items` - Get all items
- `GET /api/v1/items/:id` - Get single item
- `POST /api/v1/items` - Create item
- `PUT /api/v1/items/:id` - Update item
- `DELETE /api/v1/items/:id` - Delete item

### Version 2 (v2) - Latest

Enhanced version with additional features:

**Endpoints:**
- `GET /api/v2/items` - Get all items (with metadata & statistics)
- `GET /api/v2/items/:id` - Get single item
- `POST /api/v2/items` - Create item (with notifications)
- `PUT /api/v2/items/:id` - Update item
- `DELETE /api/v2/items/:id` - Delete item (supports soft delete)

**v2 Enhancements:**
- ✅ Enhanced response metadata (total value, statistics)
- ✅ Soft delete support: `DELETE /api/v2/items/:id?soft=true`
- ✅ Item value calculations
- ✅ Notification hooks (logged events)

## Sample Request Bodies

**Create Item (POST /api/v1/items or /api/v2/items)**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1299.99,
  "quantity": 10
}
```

**Update Item (PUT /api/v1/items/:id or /api/v2/items/:id)**
```json
{
  "price": 1199.99,
  "quantity": 8
}
```

## Testing the API

### Example with curl:

```bash
# Health check
curl http://localhost:3000/health

# Get API info
curl http://localhost:3000/

# v1 - Get all items
curl http://localhost:3000/api/v1/items

# v2 - Get all items (with enhanced metadata)
curl http://localhost:3000/api/v2/items

# Create an item (v1)
curl -X POST http://localhost:3000/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","description":"Gaming laptop","price":1500,"quantity":5}'

# Create an item (v2 - with notifications)
curl -X POST http://localhost:3000/api/v2/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Mouse","description":"Wireless mouse","price":50,"quantity":20}'

# Soft delete (v2 only)
curl -X DELETE "http://localhost:3000/api/v2/items/{item_id}?soft=true"

# Hard delete
curl -X DELETE http://localhost:3000/api/v2/items/{item_id}
```

## Project Structure

```
├── config/
│   └── database.js      # MongoDB connection
├── models/
│   └── Item.js          # Item model schema
├── routes/
│   ├── items.js         # v1 CRUD routes
│   └── items-v2.js      # v2 CRUD routes (enhanced)
├── .env                 # Environment variables (create this)
├── .env.example         # Example environment variables
├── .gitignore          # Git ignore file
├── package.json        # Dependencies
├── server.js           # Main server file
└── README.md           # This file
```

## Features

- Express.js server setup
- MongoDB connection with Mongoose
- Complete CRUD operations
- **API versioning (v1 & v2)**
- Input validation
- Error handling
- Clean code structure
- Environment variable configuration
- CORS enabled
- Backward compatibility

## Why API Versioning?

1. **Backward Compatibility** - v1 clients continue working while v2 is developed
2. **Gradual Migration** - Clients can migrate at their own pace
3. **Feature Testing** - Test new features in v2 without affecting v1
4. **Clear Communication** - Developers know which version they're using

## Notes for Interview

- The code demonstrates understanding of API evolution
- Both versions run simultaneously without conflicts
- Easy to add v3, v4, etc. by following the same pattern
- Shows real-world production thinking
- Can discuss trade-offs: URL versioning vs Header versioning vs Query parameters

Good luck with your interview! 🚀
