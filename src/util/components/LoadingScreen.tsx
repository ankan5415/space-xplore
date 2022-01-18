import { Spinner, Center } from "@chakra-ui/react";
const LoadingScreen = () => {
  return (
    <Center h="100vh">
      <Spinner color="blue.400" size="xl" thickness="4px" />
    </Center>
  );
};

export default LoadingScreen;
