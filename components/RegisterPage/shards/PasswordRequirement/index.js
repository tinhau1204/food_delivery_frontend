import { AiFillCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { Text, Box } from "@mantine/core";

function PasswordRequirement({ meets, label }) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <AiFillCheckCircle /> : <AiOutlineCloseCircle />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

export default PasswordRequirement;
