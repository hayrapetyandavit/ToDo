const express = require('express');
const router = express.Router();
const { isSinged } = require('../controllers/Auth');
const AuthController = require('../controllers/Auth');
const PostsController = require('../controllers/Posts');

router.get('/done/:id', isSinged, PostsController.isDone);

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.post('/posts/create', isSinged, AuthController.verify, PostsController.createPost);
router.get('/posts', isSinged, AuthController.verify, PostsController.getPost);

router.get('/posts/:id', isSinged, PostsController.getSinglePost);
router.put('/posts/:id', isSinged, PostsController.updatePost);
router.delete('/posts/:id', isSinged, PostsController.deletePost);

module.exports = router;