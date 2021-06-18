import * as React from "react";
import { Box, Link, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    // data is loading
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    // user is logged in
    body = (
      <Flex>
        <Box mr={2}>{data?.me?.username}</Box>
        <Box>
          <Link>logout</Link>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex bg="darkgray" p={4} ml={"auto"}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default NavBar;
