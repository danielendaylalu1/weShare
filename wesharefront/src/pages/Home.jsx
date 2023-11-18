// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchPosts } from "../store/postSlice";

import { useQuery } from "react-query";
import { getPosts } from "../services/postservices";

const Home = () => {
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(fetchPosts());
  //   }, []);
  const result = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (result.isPending) {
    return <div>pending.....</div>;
  }
  //   if (result.isError) {
  //     return <div>{result.error.message}</div>;
  //   }
  return (
    <div>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has
      roots in a piece of classical Latin literature from 45 BC, making it over
      2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
      College in Virginia, looked up one of the more obscure Latin words,
      consectetur, from a Lorem Ipsum passage, and going through the cites of
      the word in classical literature, discovered the undoubtable source. Lorem
    </div>
  );
};

export default Home;
