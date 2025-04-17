import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: [String],
  reactions: { type: Number, default: 0 },
  photo: { type: String }, // base64 image
  createdAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // 👈 enforce ownership
  },
},
{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
