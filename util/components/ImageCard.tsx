import {
  Box,
  Text,
  Heading,
  Stack,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import type { iImageData } from "../../types";
import HeartIcon from "./HeartIcon";
import ImageDetails from "./ImageDetails";

interface iImageCardProps extends iImageData {
  isLiked: boolean;
  handleLikeClick: (date: string) => void;
}

const ImageCard = (props: iImageCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      position="relative"
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
          quality={25}
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
      <IconButton
        right={2}
        top={2}
        position={"absolute"}
        aria-label="Heart Icon"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          props.handleLikeClick(props.date);
        }}
        icon={
          <HeartIcon boxSize={8} color={props.isLiked ? "red.300" : "white"} />
        }
      />
    </Box>
  );
};

export default ImageCard;
