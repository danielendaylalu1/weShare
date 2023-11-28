import { useState } from "react";

import { useDispatch } from "react-redux";

import "./post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleCreatePost } from "../store/postSlice";
const Post = () => {
  const [post, setPost] = useState({
    location: "",
    desc: "",
    catagories: [],
  });

  const [catagory, setCatagory] = useState("");

  const dispatch = useDispatch();
  return (
    <div className="post-page">
      <h2>Share a post</h2>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(handleCreatePost(post));
          setPost({
            location: "",
            desc: "",
            catagories: [],
          });
        }}
      >
        <div className="sign-form">
          <div>
            <label>Location</label>
            <input
              type="text"
              placeholder="Addis ababa bole"
              value={post.location}
              onChange={(e) => {
                const location = e.target.value;
                setPost((prv) => ({ ...prv, location: location }));
              }}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              placeholder="type description"
              rows="4"
              cols="50"
              value={post.desc}
              onChange={(e) => {
                const desc = e.target.value;
                setPost((prv) => ({ ...prv, desc: desc }));
              }}
            ></textarea>
          </div>
          <div>
            <label>Catagory</label>
            <div className="catagories">
              {post.catagories &&
                post.catagories.map((cat, index) => {
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
                  const catagory = e.target.value;
                  setCatagory(catagory.toLowerCase());
                }}
              />
              <button
                className="add-catagory"
                type="button"
                onClick={() => {
                  if (catagory === "") {
                    return;
                  }
                  setPost((prv) => ({
                    ...prv,
                    catagories: prv.catagories.concat(catagory),
                  }));
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
