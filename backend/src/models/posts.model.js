import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      minLength: 1,
    },
    content: {
      type: String,
      trim: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    checklist: [
      {
        text: {
          type: String,
        },
        isChecked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timeStamp: true },
);

export const Post = mongoose.model("Post", postSchema);
