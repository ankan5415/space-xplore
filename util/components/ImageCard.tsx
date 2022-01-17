import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import type { iImageData } from "../../types";

const ImageCard = (props: iImageData) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m="5">
      <Box w="100%" h={250} position="relative">
        <Image
          src={props.url}
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Text
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {props.date}
          </Text>
        </Box>
        <Text
          mt="1"
          fontWeight="medium"
          fontSize="sm"
          lineHeight="tight"
          noOfLines={3}
        >
          {props.explanation}
        </Text>
      </Box>
    </Box>
  );
};

export default ImageCard;
