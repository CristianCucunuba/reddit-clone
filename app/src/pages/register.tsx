import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Wrapper } from "../components/Wrapper";

const Register = ({}) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Wrapper variant="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={false}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input name="username" placeholder="username" ref={register} />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
        <Box mt={4}>
          <FormControl isInvalid={false}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              name="password"
              placeholder="password"
              type="password"
              ref={register}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={formState.isSubmitting}
          type="submit">
          Submit
        </Button>
      </form>
    </Wrapper>
  );
};

export default Register;
