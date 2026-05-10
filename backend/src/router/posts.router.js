import { Router } from "express";
import {
  createPost,
  getPostbyUserId,
  getAllPost,
  getPostbyId,
  updatePost,
  deletePost,
} from "../controller/posts.controller.js";

const router = Router();

router.route("/newNote").post(createPost);
router.route("/readNote/:userId").get(getPostbyUserId);
router.route("/allNotes").get(getAllPost);
router.route("/readSingleNote/:postId").get(getPostbyId);
router.route("/updateNote/:postId").patch(updatePost);
router.route("/deleteNote/:postId").delete(deletePost);

export default router;
