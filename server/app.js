// require('dotenv').config(); 
const express = require('express');
const path= require('path')
require('dotenv').config();
const cors = require('cors');
const mongoDB = require('./db/database');
const userRoutes= require('./router/user-routes')
const blogRoutes= require('./router/blog.routes')
const commentRoutes= require('./router/comment.routes')
const app = express();
// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
//connect to database
mongoDB()
app.use('/api/auth', userRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/comments', commentRoutes)
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
