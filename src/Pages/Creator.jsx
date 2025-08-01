import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth"; 
export default function UploadForm({ user }) {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    type: "article",
    source: "",
    author: user?.displayName || "",
    tags: "",
    link: "",
    readTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.log("User not logged in");
        return;
      }

      const token = await currentUser.getIdToken();

      const payload = {
        title: formData.title,
        description: formData.excerpt, 
        type: formData.type,
        source: formData.source,
        author: formData.author,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        link: formData.link,
        readTime: formData.readTime,
      };

      const response = await axios.post(
        "https://backend-for-megaeth-2.onrender.com/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Content uploaded:", response.data);
      alert("Successfully uploaded your contents!");

      // make the form reset
      setFormData({
        title: "",
        excerpt: "",
        type: "article",
        source: "",
        author: user?.displayName || "",
        tags: "",
        link: "",
        readTime: "",
      });
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="card mx-auto my-4" style={{ maxWidth: "360px" }}>
      <div className="card-body">
        <h5 className="card-title mb-3">Upload Content</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              name="excerpt"
              placeholder="Short Description"
              rows="2"
              value={formData.excerpt}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <select
              className="form-select"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="article">Article</option>
              <option value="thread">Thread</option>
              <option value="technical">Technical</option>
            </select>
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="source"
              placeholder="Source (e.g., Twitter)"
              value={formData.source}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="url"
              className="form-control"
              name="link"
              placeholder="Link to Content"
              value={formData.link}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="readTime"
              placeholder="Read Time (e.g., 8 min)"
              value={formData.readTime}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
