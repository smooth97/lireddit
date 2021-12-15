import {withUrqlClient} from "next-urql";
import {createUrqlClient} from "../utils/createUrqlClient";
import {usePostsQuery} from "../generated/graphql";
import Layout from "../components/Layout";
import {Box, Heading, Link, Stack, Text} from "@chakra-ui/react";
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
                        <Box p={5} shadow='md' borderWidth='1px'>
                            <Heading fontSize='xl'>{p.title}</Heading>
                            <Text mt={4}>{p.text}</Text>
                        </Box>
                    ))
                }</Stack>

            )}
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
