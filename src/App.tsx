import { useState } from "react";
import { Box, ChakraProvider, Flex, Grid, GridItem } from "@chakra-ui/react";
import TimeLine from "./components/TimeLine";
function App() {
  return (
    <ChakraProvider>
      <Box background="gray.500" width={"100%"} height={"100vh"}>
        <Grid
          templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
          gridTemplateRows={"50px 1fr 30px"}
          gridTemplateColumns={"150px 1fr"}
          h="100%"
          overflow={"hidden"}
          gap="1"
          color="blackAlpha.700"
          fontWeight="bold">
          <GridItem pl="2" bg="orange.300" area={"header"}>
            Header
          </GridItem>
          <GridItem pl="2" bg="pink.300" area={"nav"}>
            Nav
          </GridItem>
          <GridItem p="2" bg="green.300" area={"main"}>
            <TimeLine />
          </GridItem>
          <GridItem pl="2" bg="blue.300" area={"footer"}>
            Footer
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
