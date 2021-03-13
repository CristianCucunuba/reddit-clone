import { withUrqlClient } from "next-urql";
import Navbar from "../components/Navbar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../util/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <div>
      <Navbar />
      {data?.posts.map((post) => (
        <div>{post.title}</div>
      ))}
    </div>
  );
};
export default withUrqlClient(createUrqlClient, {
  ssr: true,
})(Index);
