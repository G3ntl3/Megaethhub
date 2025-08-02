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

  if (loading) return <p className="text-center"> <small>Wait some secs more content Loading... </small><b>GMega</b></p>;

  return (
    <div className="container mt-4">
      <center className="mb-4 fs-2">Latest Content</center>
      <div className="row">
        {contents.map((item) => (
          <div className="  col-md-6 col-lg-4 mb-4" key={item._id}>
            <div className="result card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title"><b>Topic:  </b>
 {item.title}</h5>
                <p className="card-text"><b>Description:</b> {item.description}</p>
                <p className="text-muted">
                  <small>
                    <br />
                    <b>Type:</b> {item.type} <br /> 
                    <b>Author :</b> {item.author}  <br />
                     <b>⌚</b>{item.readTime || "N/A"} 
                     
                  </small>
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary"
                >
                  View Content
                </a><br />
                <br /> <b className="fs-3">⭐</b>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
