import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
