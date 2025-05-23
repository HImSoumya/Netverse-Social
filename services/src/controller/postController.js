const Post = require("../model/Post");
const User = require("../model/User");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;

// 🔥 Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Create a Post
exports.createPost = async (req, res) => {
  try {
    console.log("🔥 Request Received:", req.body);
    console.log("🖼️ File Received:", req.file);

    let imageUrl = null;

    // Upload file to Cloudinary if an image is present
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "social-media-posts",
      });
      imageUrl = result.secure_url; // Get Cloudinary URL
    }

    const newPost = new Post({
      userId: req.body.userId,
      desc: req.body.desc,
      img: imageUrl, // Store Cloudinary URL in MongoDB
    });

    const savedPost = await newPost.save();
    console.log("✅ Post saved successfully:", savedPost);
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("❌ Error creating post:", error);
    res.status(500).json({ message: "Something went wrong" });
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
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.userId === req.query.userId) {
      await post.deleteOne();
      return res.status(200).json({ message: "The post has been deleted." });
    } else {
      return res.status(403).json({ message: "You can only delete your own post." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
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
exports.getUserFeedPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userid);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};

// get user's Feed posts
exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
