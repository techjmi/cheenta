// require('dotenv').config(); 
const express = require('express');
const path= require('path')
const cors = require('cors');
const mongoDB = require('./db/database');
const userRoutes= require('./router/user-routes')
const blogRoutes= require('./router/blog.routes')

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 
//connect to database
mongoDB()
// Simple Route
// app.get('/', (req, res) => {
//   res.send({ message: 'Server is running successfully!' });
// });
app.use('/api/auth', userRoutes)
app.use('/api/blog', blogRoutes)
app.use(express.static(path.join(__dirname, '../client/dist')));
// Catch-All Route for Client-Side Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
