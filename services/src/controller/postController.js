const Post = require("../model/Post")

// Create a Post
exports.createPost = async(req,res)=>{
    res.json({postsList:[1,2,3,4,5,6,7,8,9,10]})
}