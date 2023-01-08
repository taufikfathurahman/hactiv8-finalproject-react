import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
          <div
            id="carouselExampleAutoplaying"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active" data-bs-interval="3000">
                <img src={post.img.$1} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <img src={post.img.$2} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item" data-bs-interval="3000">
                <img src={post.img.$3} class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              style={{ top: "40%" }}
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              style={{ top: "40%" }}
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

          {/* Content section 1 */}
          <div class="container px-5">
            <div class="row gx-5 align-items-center">
              <div class="col-lg-6 order-lg-2">
                <div class="p-5">
                  <img
                    class="img-fluid rounded-circle"
                    src={post.img.$4}
                    alt="..."
                  />
                </div>
              </div>
              <div class="col-lg-6 order-lg-1">
                <div class="p-5">
                  <h4 class="display-6">{post.resume}</h4>
                  <p>{post.text}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
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
      <footer class="py-5 bg-black">
        <div class="container px-5">
          <p class="m-0 text-center text-white small">
            <Link to="/">Back to Home Page</Link>
          </p>
        </div>
      </footer>
    </span>
  );
}
