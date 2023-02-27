import {
  Box,
  Center,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Card({ btn_name, handleClick, loading=false }) {
  return (
    <Center py={5}>
      <Box
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <Button
            w={"full"}
            bg={"green.400"}
            color={"white"}
            rounded={"xl"}
            isLoading={loading}
            boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
            onClick={handleClick}
          >
            {btn_name}
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
