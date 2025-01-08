const Post = require("../model/Post");

// Create a Post
exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
        await post.updateOne({$set:req.body})
        res.status(200).json({message:"The post has been updated."})
    } else {
      res.status(403).json({ message: "You can only update your post." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
          await post.deleteOne()
          res.status(200).json({message:"The post has been deleted."})
      } else {
        res.status(403).json({ message: "You can only delete your post." });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };
// like a post
// get a post
// get timeline post
