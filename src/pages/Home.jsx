//packages
import { Box, Container,Text,Button,Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

//Local imports
import Navbar from "../components/Navbar";
import "../App.css"

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Container id="heroContainer" maxW="container.xxl" padding="10px">
        {/* left side */}
        <Box pl={5} h={400}>
          <Text id="heroText">
            Todooo.... <br />
            Daily.....
          </Text>
          {/* button */}
          <Button
            id="heroButton"
            colorScheme="orange"
            fontSize={"20px"}
            mt={3}
            _hover={{ bg: "orange.600" }}
            onClick={() => navigate("/todos")}
          >
            Get Started
          </Button>
        </Box>
        {/* right side */}
        <Box w={500} h={500}>
          <Image
            src="https://static.vecteezy.com/system/resources/previews/035/863/293/non_2x/time-management-flat-icon-with-to-do-list-and-clock-animated-cartoon-illustration-vector.jpg"
            alt="random image"
            id="heroImage"
          />
        </Box>
      </Container>
    </>
  );
}

export default Home

