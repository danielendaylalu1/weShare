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
                  post.desc.includes(e.target.query.value) ||
                  post.location.includes(e.target.query.value) ||
                  post.catagories.includes(e.target.query.value)
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
        {searchedPost && <Posts posts={searchedPost} />}
      </div>
    </div>
  );
};

export default Search;
