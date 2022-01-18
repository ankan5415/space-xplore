import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
} from "@chakra-ui/react";
import type { iImageData } from "../../types";
import Image from "next/image";

interface iImageDetailsProps extends iImageData {
  isOpen: boolean;
  onClose: () => void;
}

const ImageDetails = (props: iImageDetailsProps) => {
  return (
    <Modal isOpen={props.isOpen} size="3xl" onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box minW="250px" w="100%" minH="300px" h="80%" position="relative">
            <Image
              quality={10}
              onDragStart={(e) => e.preventDefault()}
              src={props.hdurl}
              alt="Picture from NASA"
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="https://apod.nasa.gov/apod/image/1901/IC342Medvedevas1024.jpg" // a random placeholder image
            />
          </Box>
          <Text
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="sm"
            my={3}
          >
            Published on {props.date}
          </Text>
          <Text
            mt="1"
            fontWeight="medium"
            fontSize="sm"
            lineHeight="tight"
            my={3}
          >
            {props.explanation}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default ImageDetails;
