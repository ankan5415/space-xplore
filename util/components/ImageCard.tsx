import { Box, Text, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import type { iImageData } from "../../types";
import ImageDetails from "./ImageDetails";

const ImageCard = (props: iImageData) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      m="5"
      _hover={{ bg: "gray.100", cursor: "pointer" }}
      onClick={() => onOpen()}
    >
      <ImageDetails {...props} isOpen={isOpen} onClose={onClose} />
      <Box w="100%" h={250} position="relative">
        <Image
          onDragStart={(e) => e.preventDefault()}
          src={props.url}
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
        />
      </Box>

      <Stack p="6" spacing="3">
        <Heading color="gray.800" size="sm">
          {props.title}
        </Heading>
        <Text
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          {props.date}
        </Text>
        <Text
          mt="1"
          fontWeight="medium"
          fontSize="sm"
          lineHeight="tight"
          noOfLines={3}
        >
          {props.explanation}
        </Text>
      </Stack>
    </Box>
  );
};

export default ImageCard;
