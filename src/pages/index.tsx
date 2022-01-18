import type { NextPage } from "next";
import Link from "next/link";
import { Button, Center, Heading, Stack } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Center bgColor="background" height="100vh">
      <Stack w={{ base: "80%", md: "50%" }} spacing="5">
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "4xl", lg: "6xl" }}
          color="heroTitle"
          textAlign={"center"}
          fontWeight={700}
        >
          Spacestagram
        </Heading>
        <Heading as="h2" fontSize="lg" textAlign={"center"}>
          View the beauty of the earth/universe through the eyes of NASA
        </Heading>
        <Center>
          {/* Redirect to explore page*/}
          <Link href="/explore" passHref>
            <Button
              as="a"
              m="10"
              bg="blue.400"
              p="5"
              _hover={{
                bg: "purple.400",
                boxShadow: "6px 6px 20px 0 rgba(106, 53, 255, 0.32)",
              }}
              _active={{
                bg: "purple.400",
              }}
              color="gray.50"
            >
              Let&apos;s explore!
            </Button>
          </Link>
        </Center>
      </Stack>
    </Center>
  );
};

export default Home;
