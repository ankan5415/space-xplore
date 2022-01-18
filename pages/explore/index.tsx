import {
  Button,
  Center,
  Heading,
  Stack,
  SimpleGrid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import ImageCard from "../../util/components/ImageCard";
import useImageData from "../../util/hooks/useImageData";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Explore = () => {
  const toast = useToast();
  const router = useRouter();
  const { data, isLoading, isError } = useImageData();

  const [liked, setLiked] = useState<string[]>([]);

  useEffect(() => {
    const savedLikedPosts = localStorage.getItem("likedPosts");
    if (savedLikedPosts) setLiked(JSON.parse(savedLikedPosts));
  }, []);

  const handleLikeClick = (date: string) => {
    // if date is already in liked, remove it from liked state
    if (liked.includes(date)) {
      setLiked(liked.filter((like) => like !== date));
    } else {
      // else, add it to state
      setLiked([...liked, date]);
    }
    localStorage.setItem("likedPosts", JSON.stringify(liked));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast({
      title: "Error",
      description: "There was an error fetching the data",
      status: "error",
      duration: 10000,
      isClosable: true,
    });
    router.push("/");
    return null;
  }

  return (
    <Center bgColor="background">
      <Stack p="10" spacing="4" w="100%" alignItems={"center"}>
        <Heading as="h1" size="2xl" color="heroTitle" fontWeight={700}>
          Our Universe In Images.
        </Heading>
        <Heading as="h2" size="md">
          Click on the cards to view more details!
        </Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={6} w="100%">
          {data.map((el, index: number) => {
            if (el.media_type === "image")
              return (
                <GridItem justifyContent={"center"} key={index}>
                  <ImageCard
                    {...el}
                    isLiked={liked.includes(el.date)}
                    handleLikeClick={handleLikeClick}
                  />
                </GridItem>
              );
          })}
        </SimpleGrid>
      </Stack>
    </Center>
  );
};

export default Explore;
