const Post = require("../model/Post");
const User = require("../model/User");

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
      await post.updateOne({ $set: req.body });
      res.status(200).json({ message: "The post has been updated." });
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
      await post.deleteOne();
      res.status(200).json({ message: "The post has been deleted." });
    } else {
      res.status(403).json({ message: "You can only delete your post." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like & dislike a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ message: "You have liked this post." });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ message: "You have disliked this post." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get userFeed posts
exports.getUserFeedPosts = async (req,res)=>{ 
  try {
    const currentUser = await User.findById(req.body.userId)
    const userPosts = await Post.find({userId:currentUser._id})
    const friendPosts = await Promise.all(
      currentUser.followings.map(friendId=>{
        return Post.find({userId:friendId})
      })
    ) 
    res.json(userPosts.concat(...friendPosts))
  } catch (error) {
    res.status(500).json(error)
  }
}
