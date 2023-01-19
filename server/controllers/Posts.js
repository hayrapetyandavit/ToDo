const { Post } = require("../model/models");

exports.createPost = async (req, res) => {
  try {
    const postsave = await Post.create({
      title: req.body.title,
      details: req.body.details,
      done: req.body.done,
      userId: req.userId,
    });
    res.json(postsave);
  } catch (error) {
    console.log(error);
  }
};

exports.getPost = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        userId: req.userId,
      },
    });
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: `${req.params.id}` } });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.upsert({
      id: req.params.id,
      title: req.body.title,
      details: req.body.details,
      done: req.body.done,
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postDelete = await Post.destroy({
      where: { id: `${req.params.id}` },
    });
    res.json(postDelete);
  } catch (error) {
    console.log(error);
  }
};

exports.isDone = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: `${req.params.id}` } });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};
