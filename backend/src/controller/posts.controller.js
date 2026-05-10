import { Post } from "../models/posts.model.js";
import { User } from "../models/user.model.js";

const createPost = async (req, res) => {
  try {
    const { userId, title, content, isPinned, tags, checklist } = req.body;

    if (!userId || !title || !content) {
      return res.status(400).json({ message: "Enter the fields" });
    }

    const userExists = await User.findOne({ _id: userId });
    if (!userExists)
      return res.status(400).json({ message: "User doesn't exist" });

    const post = await Post.create({
      userId,
      title,
      content,
      isPinned,
      tags,
      checklist,
    });

    res.status(201).json({
      message: "Post created Successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error });
  }
};

const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find().sort({ isPinned: -1 });

    if (!allPost) return res.status(400).json({ message: "No Post Created" });

    res.status(200).json({
      message: "Read all post",
      allPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error });
  }
};

const getPostbyUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = { userId };
    const { tag } = req.query;

    if (tag) {
      query.tags = tag;
    }

    const Exsiting = await User.findById(userId);
    if (!Exsiting)
      return res.status(400).json({ message: "User doesn't exist" });

    const read = await Post.find(query).sort({ isPinned: -1 });

    if (!read) return res.status(400).json({ message: "Post doesn't exist" });

    res.status(200).json({
      message: "Read Post By ID",
      read,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error });
  }
};

const getPostbyId = async (req, res) => {
  try {
    const postId = req.params.postId;

    console.log(postId);
    const read = await Post.findById(postId);

    console.log(read);

    if (!read) return res.status(400).json({ message: "Post doesn't exist" });

    res.status(200).json({
      message: "Read Post By ID",
      read,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error });
  }
};
const updatePost = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Enter the fields need to be updated" });
    }

    const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Successfully updated", post });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error });
  }
};
export {
  createPost,
  getPostbyUserId,
  getAllPost,
  getPostbyId,
  updatePost,
  deletePost,
};
