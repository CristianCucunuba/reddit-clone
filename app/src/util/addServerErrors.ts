import { ErrorOption } from "react-hook-form";
import { FieldError } from "../generated/graphql";

export default function addServerErrors<FormData>(
  errors: FieldError[],
  setError: (name: keyof FormData, error: ErrorOption) => void
) {
  return errors.forEach((error) => {
    setError(error.field as keyof FormData, {
      type: "server",
      message: error.message,
    });
  });
}
