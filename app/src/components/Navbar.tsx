import { Box, Flex, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useUserQuery } from "../generated/graphql";

const Navbar = () => {
  const [{ data, fetching }] = useUserQuery();

  let content = null;

  if (fetching) return null;

  if (!data?.user) {
    return (content = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    ));
  } else {
    content = (
      <Flex>
        <Box mr={4}>{data.user.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>{content}</Box>
    </Flex>
  );
};

export default Navbar;
