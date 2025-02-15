import { createFileRoute } from "@tanstack/react-router";
import { Button, Input, Text, Card } from "@chakra-ui/react";
import { useState } from "react";
import { trpc } from "@/trpc";

const Index: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Use the tRPC mutation hook for creating a user
  const createUserMutation = trpc.user.createUser.useMutation();

  const handleCreateUser = async () => {
    try {
      const newUser = await createUserMutation.mutateAsync({ name, email });
      console.log("User created:", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Card.Root width={"320px"}>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleCreateUser}>Create User</Button>
      {createUserMutation.isError && (
        <Text color="red.500">
          Error creating user: {String(createUserMutation.error)}
        </Text>
      )}
      {createUserMutation.isSuccess && (
        <Text color="green.500">User created successfully!</Text>
      )}
    </Card.Root>
  );
};

export default Index;

export const Route = createFileRoute("/")({
  component: Index,
});
