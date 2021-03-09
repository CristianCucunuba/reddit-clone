import { User } from "../entities/User";
import { AppContext } from "../../src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: UsernamePasswordInput,
    @Ctx() { em }: AppContext
  ): Promise<UserResponse> {
    // TODO: Use validation library
    if (input.username.length <= 3) {
      return {
        errors: [
          {
            field: "username",
            message: "username must be greater than 3",
          },
        ],
      };
    }

    if (input.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            message: "password must be greater than 3",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(input.password);
    const user = em.create(User, {
      username: input.username,
      password: hashedPassword,
    });

    await em.persistAndFlush(user);
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("input") input: UsernamePasswordInput,
    @Ctx() { em }: AppContext
  ): Promise<UserResponse> {
    const loginError = [
      {
        field: "login",
        message: "the username or password is incorrect please try again",
      },
    ];

    const user = await em.findOne(User, {
      username: input.username,
    });

    if (!user) {
      return {
        errors: loginError,
      };
    }

    const validPassword = await argon2.verify(user.password, input.password);

    if (!validPassword) {
      return {
        errors: loginError,
      };
    }

    return {
      user,
    };
  }
}
