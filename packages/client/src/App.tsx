import { useState } from "react";
import { Card, Button } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Card.Root width="320px">
      <Card.Header>Vite + React</Card.Header>
      <Card.Body gap="2">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        Edit <code>src/App.tsx</code> and save to test HMR
      </Card.Body>
    </Card.Root>
  );
}

export default App;
