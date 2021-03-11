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
import { useLoginMutation } from "../generated/graphql";
import addServerErrors from "../util/addServerErrors";
import { useRouter } from "next/router";

type FormData = {
  username: string;
  password: string;
};

const Login = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const {
    register,
    handleSubmit,
    setError,
    errors,
    formState,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("ayuda");
    const response = await login({ input: data });
    console.log("la respuesta", response);
    if (response.data?.login.errors) {
      addServerErrors<FormData>(response.data?.login.errors, setError);
    } else if (response.data?.login.user) {
      router.push("/");
    }
  };

  return (
    <Wrapper variant="small">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input name="username" placeholder="username" ref={register} />
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
          Login aiudaaaaa
        </Button>
      </form>
    </Wrapper>
  );
};

export default Login;
