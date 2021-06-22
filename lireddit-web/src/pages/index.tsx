import NavBar from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();

  console.log(data);
  return (
    <>
      <NavBar />
      <div>hello~</div>
      {!data ? null : data.posts.map((p) => console.log(p))}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
