import { useState } from "react";
import { Link } from "react-router-dom";
import "./post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Post = () => {
  const [post, setPost] = useState(null);

  const [catagories, setCatagories] = useState([]);
  const [catagory, setCatagory] = useState("");
  return (
    <div className="post-page">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="sign-form">
          <div>
            <label>Location</label>
            <input type="text" placeholder="Addis ababa bole" />
          </div>
          <div>
            <label>Description</label>
            <textarea
              placeholder="type description"
              rows="4"
              cols="50"
            ></textarea>
          </div>
          <div>
            <label>Catagory</label>
            <div className="catagories">
              {catagories &&
                catagories.map((cat, index) => {
                  return (
                    <p key={index} className="catagory-text">
                      {cat}{" "}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="catagory-icon"
                      />
                    </p>
                  );
                })}
            </div>

            <div className="form-catagory">
              <input
                type="text"
                placeholder="Add a catagory"
                value={catagory}
                onChange={(e) => {
                  setCatagory(e.target.value);
                }}
              />
              <button
                className="add-catagory"
                onClick={() => {
                  setCatagories((prv) => [...prv, catagory]);
                  setCatagory("");
                }}
              >
                add
              </button>
            </div>
          </div>
          <div>
            <button type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Post;
