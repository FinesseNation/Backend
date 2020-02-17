# Finesse-Nation-Backend

Backend for the free food service.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (Use for developing with live code reloading)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

```bash
# Developer Notes Only

# Import test data on mongo database
mongoimport --db=free_food --collection:places --file=dbutil/foodPlaces.json --jsonArray

# Import data into mongodb atlas
mongoimport --uri "mongodb+srv://<username>:<password>@mongoclustercs428-pijzh.mongodb.net/free_food" --collection
 places
 --drop --file dbutil/foodPlaces.json --jsonArray

# Connect to mongodb atlas
mongo "mongodb+srv://mongoclustercs428-pijzh.mongodb.net/test"  --username <username> --password <password>
```

```bash
# Hello world
GET http://localhost:8080/api/food/helloworld

# Basic server -> mongodb call
POST  http://localhost:8080/api/food/getPlaces
{
	"city": "Ann Harbor",
	"state": "MI"
}
```

```bash
# Environment variables
# Place credential in .env file located in root dir:
MONGODB_USERNAME=<username>
MONGODB_PASSWORD=<password>

# Use in nodejs:
let password = process.env.MONGODB_PASSWORD;
```
