import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: [String],
  photo: { type: String }, // base64 image
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reactions: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: "User",
  },
},
{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
