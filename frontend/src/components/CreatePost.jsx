import { useNavigate } from "react-router-dom";
import { useContext, useRef, useEffect } from "react";
import { PostList } from "../store/post-list-store";
import { toast } from "react-toastify";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();

  const photoInputRef = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const tagsElement = useRef();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      // Redirect user to login page if they are not logged in
      localStorage.setItem("redirectAfterLogin", "/createpost");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const photoFile = photoInputRef.current.files[0];
    const postTitle = postTitleElement.current.value.trim();
    const postBody = postBodyElement.current.value.trim();
    const tags = tagsElement.current.value.trim().split(" ");

    if (!postTitle || !postBody || tags.length === 0 || tags[0] === "") {
      alert("Please fill in all required fields.");
      return;
    }

    // If there's a photo, convert it to base64
    if (photoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photo = reader.result;

        addPost({
          id: Date.now(),
          title: postTitle,
          body: postBody,
          tags,
          reactions: 0,
          photo, // include image preview
        });

        // Show success toast
        toast.success("✅ Post successful!");
      };
      reader.readAsDataURL(photoFile);
    } else {
      // No photo
      addPost({
        id: Date.now(),
        title: postTitle,
        body: postBody,
        tags,
        reactions: 0,
        photo: null,
      });

      // Show success toast
      toast.success("✅ Post successful!");
    }

    // Reset form
    photoInputRef.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    tagsElement.current.value = "";
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="photo" className="form-label">
          Upload a Photo
        </label>
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
