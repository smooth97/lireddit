import NavBar from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  // const [] = usePostsQuery
  return (
    <>
      <NavBar />
      <div>hello~</div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
