import { useEffect, useState } from "react";
import axios from "axios";
import "./contentlist.css"
export default function ContentList() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get("https://backend-for-megaeth-2.onrender.com/");
        setContents(res.data);
      } catch (err) {
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="container mt-4">
      <center className="mb-4 fs-2">Latest Content</center>
      <div className="row">
        {contents.map((item) => (
          <div className="  col-md-6 col-lg-4 mb-4" key={item._id}>
            <div className="result card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p className="text-muted">
                  <small>
                    {item.type} • {item.readTime || "N/A"} • By {item.author}
                  </small>
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary"
                >
                  View Content
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
