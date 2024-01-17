import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import TimeLine from "./components/TimeLine";
function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box width={"100%"} height={"100vh"}>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="100%"
        overflow={"hidden"}
        gap="1"
        fontWeight="bold">
        <GridItem pl="2" area={"header"}>
          <Stack direction={"row"} spacing={2}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </GridItem>
        <GridItem pl="2" area={"nav"}>
          Nav
        </GridItem>
        <GridItem p="2" area={"main"}>
          <TimeLine />
        </GridItem>
        <GridItem pl="2" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </Box>
  );
}

export default App;
