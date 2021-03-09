import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface WrapperProps {
  children: ReactNode;
  variant?: "small" | "regular";
}

export const Wrapper = ({ children, variant = "regular" }: WrapperProps) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mt="8"
      mx="auto">
      {children}
    </Box>
  );
};
