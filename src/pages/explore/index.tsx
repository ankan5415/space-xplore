import {
  Center,
  Heading,
  Stack,
  SimpleGrid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import ImageCard from "../../util/components/ImageCard";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoadingScreen from "../../util/components/LoadingScreen";
import type { NextPage } from "next";
import { iImageData } from "../../types";
import getImageData from "../../util/api/getImageData";

// sets the number of posts we want to fetch per API call
const FETCH_AMOUNT = 10;

// Page to show image data
const Explore: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const [liked, setLiked] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<iImageData[]>([]);

  // ------ DATA FETCHING ------
  // fetch data from the api and push user back to main page if it errors
  const fetchImageData = async (count: number, skip: number) => {
    setIsLoading(true);
    try {
      const data = await getImageData({ count, skip });
      setImageData([...imageData, ...data.slice().reverse()]);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error Fetching Data",
        description: error.message,
        status: "error",
        duration: 10000,
        isClosable: true,
      });
      router.push("/");
    }
    setIsLoading(false);
  };

  // ------ HANDLING LIKES -------
  // load previously saved liked posts
  useEffect(() => {
    fetchImageData(FETCH_AMOUNT, 0);
    const savedLikedPosts = localStorage.getItem("likedPosts");
    if (savedLikedPosts) setLiked(JSON.parse(savedLikedPosts));
  }, []);

  // Updates localstorage every time liked state is changed
  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(liked));
  }, [liked]);

  const handleLikeClick = (date: string) => {
    // if date is already in liked, remove it from liked state
    if (liked.includes(date)) {
      setLiked(liked.filter((like) => like !== date));
    } else {
      // else, add it to state
      setLiked([...liked, date]);
    }
  };

  // ------ INFINITE SCROLL ------

  const handleScroll = () => {
    // check if user has reached bottom of page
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      fetchImageData(FETCH_AMOUNT, imageData.length);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [imageData]); // have to pass in image data so that the scroll handler can access the updated imageData array

  // ------ LOADING SCREEN ------
  // Loading state while we wait for NASA's API to return data
  if (isLoading && imageData.length === 0) return <LoadingScreen />;

  return (
    <Center bgColor="background" minH="100vh">
      <Stack p="10" spacing="4" w="100%" alignItems={"center"}>
        <Heading as="h1" size="2xl" color="heroTitle" fontWeight={700}>
          Our Universe In Images.
        </Heading>
        <Heading as="h2" size="md">
          Click on the cards to view more details, and keep scrolling to view
          more!
        </Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={6} w="100%">
          {imageData.map((el, index: number) => {
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
      {/* Loading Spinner for infinite load */}
      <Stack
        p="2"
        visibility={isLoading ? "visible" : "hidden"}
        borderRadius="full"
        bg="white"
        position="absolute"
        bottom="10"
        left="50%"
        transform="translate(-50%, 0%)"
        shadow={"lg"}
      >
        <Spinner size="xl" color="blue.400" />
      </Stack>
    </Center>
  );
};

export default Explore;
