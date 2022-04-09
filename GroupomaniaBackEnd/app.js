const Mysql = require('./db_connection');
const express = require('express');
const postsRoutes = require('./routes/posts');
const commentairesRoutes = require('./routes/commentaires');
/*const userRoutes = require('./routes/user');*/
const path = require('path');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(express.json());
  app.use('/api/posts', postsRoutes);
  app.use('/api/commentaires', commentairesRoutes);
  /*app.use('/api/auth', userRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));*/

module.exports = app;

