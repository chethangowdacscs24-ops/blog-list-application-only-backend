# 📝 Blog List

A full-stack blogging application with user authentication, blog management, and a modern React frontend.

## ✨ Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Blog Management**: Create, read, update, and delete blog posts
- **User Accounts**: Manage user profiles and permissions
- **Responsive Design**: Built with React for a smooth user experience
- **API-Driven**: RESTful backend API with Express.js
- **Database**: MongoDB for persistent data storage

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Testing**: Node.js built-in test runner with Supertest

### Frontend

- **Library**: React 19
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Linting**: ESLint
- **Testing**: Vitest with jsdom

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## 🚀 Getting Started

### 1. Clone or navigate to the project

```bash
cd blog-list
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/bloglist
PORT=3001
NODE_ENV=development
JWT_SECRET=your_secret_key_here
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Running the Application

**Development Mode:**

Terminal 1 - Backend:

```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:

```bash
cd frontend
npm run dev
```

**Production Mode:**

Build the frontend and serve from backend:

```bash
cd backend
npm run build:ui
npm start
```

The backend will serve the built frontend at `http://localhost:3001`

## 📁 Project Structure

```
blog-list/
├── backend/
│   ├── controllers/          # Route handlers
│   │   ├── blogRouters.js
│   │   ├── userRouters.js
│   │   └── loginRouters.js
│   ├── models/               # Database schemas
│   │   ├── blog.js
│   │   └── user.js
│   ├── utils/                # Utilities & config
│   │   ├── config.js
│   │   ├── middleware.js
│   │   └── list_helper.js
│   ├── tests/                # Test files
│   │   ├── blog_api.test.js
│   │   ├── user_api.test.js
│   │   └── test_helper.js
│   ├── app.js                # Express app setup
│   ├── index.js              # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   │   ├── Blog.jsx
    │   │   ├── BlogForm.jsx
    │   │   ├── CreateBlog.jsx
    │   │   ├── LoginForm.jsx
    │   │   └── Notification.jsx
    │   ├── services/         # API services
    │   │   ├── blogServices.js
    │   │   └── loginServices.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.html
    ├── package.json
    ├── vite.config.js
    └── eslint.config.js
```

## 🔌 API Endpoints

### Authentication

- `POST /api/login` - User login

### Blogs

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create a new blog
- `GET /api/blogs/:id` - Get a specific blog
- `PUT /api/blogs/:id` - Update a blog
- `DELETE /api/blogs/:id` - Delete a blog

### Users

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get a specific user

## ✅ Testing

### Backend Tests

```bash
cd backend
npm test
```

Runs tests for:

- Blog API endpoints (`blog_api.test.js`)
- User API endpoints (`user_api.test.js`)

### Frontend Tests

```bash
cd frontend
npm run test
```

## 📝 Scripts

### Backend

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests
- `npm run build:ui` - Build frontend and copy to backend

### Frontend

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

### Backend (.env)

```
MONGODB_URI=<your-mongodb-connection-string>
PORT=3001
NODE_ENV=development|production|test
JWT_SECRET=<your-secret-key>
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running locally or Atlas is accessible
- Check `MONGODB_URI` in `.env` file
- Verify network connectivity

### Port Already in Use

- Backend default port: 3001 (change in `.env` or `PORT` variable)
- Frontend default port: 5173 (Vite will prompt to use another if taken)

### Build Issues

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `npm run build:ui`

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository.

---

**Happy Blogging!** 📚✍️
