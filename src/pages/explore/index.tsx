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

// sets the number of posts we want to fetch per call
const FETCH_AMOUNT = 10;

// Page to show image data
const Explore: NextPage = () => {
  // for error alerts
  const toast = useToast();
  // reroutes the user back to the main page if there is an error
  const router = useRouter();

  /* use date as the unique id for the images since they're not as long as the URL and APOD ensures that there is always one date per picture */
  const [liked, setLiked] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<iImageData[]>([]);

  // ------ DATA FETCHING ------
  // function to fetch data from the api
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

  // Updates localstorage every time liked is changed
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
        {/* Responsive grid */}
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={6} w="100%">
          {/* reverse the array without modifying it to show data from most recent to least recent*/}
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
