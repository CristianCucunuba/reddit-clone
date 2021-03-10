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
import { useRegisterMutation } from "../generated/graphql";
import addServerErrors from "../util/addServerErrors";
import { useRouter } from "next/router";
import { assertValidExecutionArguments } from "graphql/execution/execute";

type FormData = {
  username: string;
  password: string;
};

const Register = ({}) => {
  const router = useRouter();
  const [, registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const response = await registerUser(data);
    console.log("la respuesta", response);
    if (response.data?.register.errors) {
      addServerErrors<FormData>(response.data?.register.errors, setError);
    } else if (response.data?.register.user) {
      router.push("/");
    }
  };

  return (
    <Wrapper variant="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input name="username" placeholder="username" ref={register} />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
        <Box mt={4}>
          <FormControl isInvalid={!!errors.password}>
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
