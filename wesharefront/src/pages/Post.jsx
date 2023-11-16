import { useState } from "react";
import { createPost } from "../services/postservices";

export const Post = () => {
  const categories = [
    "place",
    "food",
    "app",
    "website",
    "game",
    "gym",
    "cinema",
    "book",
  ];
  const [checkboxes, setCheckboxes] = useState({});

  const handleCheckboxChange = (event) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.value]: event.target.checked,
    });
  };

  const create = async (post) => {
    const data = await createPost(post);
    console.log(data);
  };
  return (
    <div className="post">
      <h1 className="post-header">Share your expirence</h1>
      <form
        className="post-form"
        onSubmit={(e) => {
          e.preventDefault();
          const selectedCategories = Object.keys(checkboxes).filter(
            (category) => checkboxes[category]
          );
          console.log(selectedCategories);
          const location = e.target.location.value;
          const description = e.target.description.value;

          console.log(location, description);
          create({
            location,
            desc: description,
            catagories: selectedCategories,
          });
        }}
      >
        <h3 className="post-form-header">post</h3>
        <div>
          <label>Location</label>
          <input type="text" name="location" />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description"></textarea>
        </div>
        {categories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              name="category"
              value={category}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
        <button type="submit">post</button>
      </form>
    </div>
  );
};
