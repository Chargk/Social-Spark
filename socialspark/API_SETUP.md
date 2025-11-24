# API Setup Guide

This project uses JSON Server as a mock API for development. When the real backend is ready, you can easily switch by updating the `environment.ts` file.

## Running the Mock API

### Option 1: Run API and Frontend Separately

1. **Start JSON Server** (in one terminal):
   ```bash
   npm run api
   ```
   This starts the mock API server on `http://localhost:3000`

2. **Start Angular Dev Server** (in another terminal):
   ```bash
   npm start
   ```
   This starts the frontend on `http://localhost:4200`

### Option 2: Run Both Together

```bash
npm run dev
```

This runs both the API server and Angular dev server concurrently.

## API Endpoints

The mock API provides the following endpoints:

### Posts
- `GET /api/v1/posts` - Get all posts (supports `_page`, `_limit`, `_sort`, `_order` query params)
- `GET /api/v1/posts/:id` - Get a specific post
- `POST /api/v1/posts` - Create a new post
- `PUT /api/v1/posts/:id` - Update a post
- `DELETE /api/v1/posts/:id` - Delete a post

### Comments
- `GET /api/v1/comments?postId=:postId` - Get comments for a post
- `GET /api/v1/comments/:id` - Get a specific comment
- `POST /api/v1/comments` - Create a new comment
- `PUT /api/v1/comments/:id` - Update a comment
- `DELETE /api/v1/comments/:id` - Delete a comment

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get a specific user
- `POST /api/v1/users` - Create a new user

### Search
- `GET /api/v1/search` - Get search results

## Switching to Real API

When the real backend is ready:

1. Update `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'https://your-real-api.com/api', // Change this
     apiVersion: 'v1'
   };
   ```

2. The services are already configured to use the real API endpoints. No code changes needed!

## Data Structure

The mock data is stored in `db.json`. JSON Server automatically creates REST endpoints based on this structure.

