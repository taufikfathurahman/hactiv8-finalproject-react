import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const { postId } = useParams();
  const { name } = useParams();

  useEffect(() => {
    let uri = "posts/";
    if (postId) uri += postId;
    if (name) uri += "author/" + name;

    fetch(props.apiUrl + uri)
      .then((response) => response.json())
      .then((response) => {
        setPosts(response);
      });
  }, [postId, name]);

  return (
    <span key={name}>
      {posts.map((post) => (
        <section key={post._id.$oid}>
          <header className="main">
            <h1>{post.title}</h1>
          </header>
          <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={post.img.$1} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={post.img.$2} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={post.img.$3} class="d-block w-100" alt="..." />
              </div>
            </div>
            <button style={{top:"40%"}} class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button style={{top:"40%"}} class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <h3>{post.resume}</h3>
          <p>{post.text}</p>
          <h4>Related Links</h4>
          <ul className="alt">
            {post.relatedlinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
          <h4>Tags</h4>
          <ul>
            {post.tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
          <h4>Author</h4>
          <p>{post.author}</p>
        </section>
      ))}
      <p>
        <Link to="/">Back to Home Page</Link>
      </p>
    </span>
  );
}
