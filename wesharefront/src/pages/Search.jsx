import "./search.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import Posts from "../components/Posts";
const Search = () => {
  const [searchedPost, setSearchedPost] = useState(null);
  const posts = useSelector((state) => state.post);
  return (
    <div className="search">
      <div className="search-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (posts) {
              const result = posts.filter(
                (post) =>
                  post.desc
                    .toLowerCase()
                    .includes(e.target.query.value.toLowerCase()) ||
                  post.location
                    .toLowerCase()
                    .includes(e.target.query.value.toLowerCase()) ||
                  post.catagories.includes(e.target.query.value.toLowerCase())
              );
              setSearchedPost(result);
            }
          }}
        >
          <input type="text" placeholder="search" name="query" />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="search-result">
        {searchedPost ? (
          searchedPost.length > 0 ? (
            <Posts posts={searchedPost} />
          ) : (
            <p>no result found</p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Search;
