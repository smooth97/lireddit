import * as React from "react";
import { Box, Link, Flex, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching) {
    // data is loading.
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
          <Button onClick={() => logout()} isLoading={logoutFetching}>
            logout
          </Button>
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
