import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import {usePostsQuery} from "../generated/graphql";
import Layout from "../components/Layout";
import {Link, Stack} from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => {
    const [{data, error}] = usePostsQuery({variables: {limit: 10, cursor: ""}});

    return (
        <Layout>
            <NextLink href="/create-post">
                <Link>create post</Link>
            </NextLink>
            {error && <div>error: {error.message}</div>}
            {!data ? (
                <div>Loading...</div>
            ) : (
                <Stack spacing={8}>{
                    data.posts.map((p) => (
                        <div>{p.id}: {p.title}</div>
                    ))
                }</Stack>

            )}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
