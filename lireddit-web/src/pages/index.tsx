import { withUrqlClient } from 'next-urql';
import {
  Box, Heading, Link, Stack, Text, Flex, Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';

interface Variable {
    limit: number
    cursor: string | null
}

const Index = function () {
  const [variables, setVariables] = useState<Variable>({
    limit: 10, cursor: null,
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  return (
    <Layout>
      <Flex mb={ 5 } align="center">
        <Heading>Lireddit</Heading>
        <Link href="/create-post" ml="auto">create post</Link>
      </Flex>
      { error && <div>error: { error.message }</div> }
      { !data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={ 8 }>{ data?.posts.posts.map((p) => (
          <Box key={ p.id } p={ 5 } shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{ p.title }</Heading>
            <Text mt={ 4 }>{ p.textSnippet }</Text>
          </Box>
        )) }
        </Stack>
      ) }
      { data && data.posts.hasMore && (
        <Flex>
          <Button
            onClick={ () => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            } }
            isLoading={ fetching }
            m="auto"
            my={ 8 }
          >load more
          </Button>
        </Flex>
      ) }
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
