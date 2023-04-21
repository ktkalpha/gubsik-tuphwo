import "./App.css";

import LunchViewer from "./components/LunchViewer.js";
import Vote from "./components/Vote.js";
import { ChakraProvider, Text, Center, Stack } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Stack>
        <Center>
          <Text as="b" fontSize="5xl">
            급식 투표
          </Text>
        </Center>
        <LunchViewer />
        <Vote></Vote>
      </Stack>
    </ChakraProvider>
  );
}

export default App;
