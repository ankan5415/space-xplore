import {
  Button,
  Center,
  Heading,
  Stack,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import ImageCard from "../../util/components/ImageCard";
import useImageData from "../../util/hooks/useImageData";

const Explore = () => {
  const { data, isLoading, isError } = useImageData();
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.log(isError);
    return <div>Error</div>;
  }

  return (
    <Center bgColor="background">
      <Stack p="10" spacing="10" w="100%" alignItems={"center"}>
        <Heading as="h1" size="2xl" color="heroTitle" fontWeight={700}>
          Our Universe In Images.
        </Heading>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={6} w="100%">
          {data.map((el, index: number) => {
            if (el.media_type === "image")
              return (
                <GridItem justifyContent={"center"} key={index}>
                  <ImageCard {...el} />
                </GridItem>
              );
          })}
        </SimpleGrid>
      </Stack>
    </Center>
  );
};

export default Explore;
