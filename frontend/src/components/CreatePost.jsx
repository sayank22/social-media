import { useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import { PostListContext } from "../store/post-list-store";
import { toast } from "react-toastify";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);
  const navigate = useNavigate();

  const photoInputRef = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const photoFile = photoInputRef.current.files[0];
    const postTitle = postTitleElement.current.value.trim();
    const postBody = postBodyElement.current.value.trim();
    const tags = tagsElement.current.value.trim().split(" ").filter(tag => tag !== "");

    if (!postTitle || !postBody || tags.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to create a post.");
        return;
      }

      const formData = {
        title: postTitle,
        body: postBody,
        tags,
        reactions: 0,
        photo: null,
      };

      if (photoFile) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          formData.photo = reader.result;
          await submitPost(formData, token);
        };
        reader.readAsDataURL(photoFile);
      } else {
        await submitPost(formData, token);
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  const submitPost = async (formData, token) => {
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const savedPost = await res.json();
      addPost(savedPost);
      toast.success("✅ Post created successfully!");
      resetForm();
      navigate("/");
    } else {
      const errorData = await res.json();
      toast.error(`❌ ${errorData.message || "Failed to post."}`);
    }
  };

  const resetForm = () => {
    photoInputRef.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    tagsElement.current.value = "";
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="photo" className="form-label">Upload a Photo</label>
        <input
          type="file"
          ref={photoInputRef}
          className="form-control"
          id="photo"
          accept="image/*"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="How are you feeling today"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Content <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          ref={postBodyElement}
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Tags <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="tags"
          ref={tagsElement}
          placeholder="Enter tags separated by space"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
