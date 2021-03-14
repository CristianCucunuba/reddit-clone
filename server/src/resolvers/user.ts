import { User } from "../entities/User";
import { AppContext } from "../../src/types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { USER_SESSION_COOKIE } from "../constants";

@InputType()
class UsernamePasswordInput {
  @Field()
  email: string;

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
  // @Mutation(() => Boolean)
  // async forgotPassword(@Arg("email") email: string, @Ctx() { em }: AppContext) {
  //   // const user = await em.findOne(User, { email });
  //   return true;
  // }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: UsernamePasswordInput,
    @Ctx() { em, req }: AppContext
  ): Promise<UserResponse> {
    // TODO: Use validation library
    if (input.email.includes("@")) {
      return {
        errors: [
          {
            field: "email",
            message: "invalid email",
          },
        ],
      };
    }

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
      email: input.email,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      // duplicate username error
      if (error.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }

    // Set logged in cookie
    req.session.user = { id: user.id };

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: AppContext
  ): Promise<UserResponse> {
    const loginError = [
      {
        field: "password",
        message: "the username or password is incorrect please try again",
      },
    ];

    const user = await em.findOne(
      User,
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    );

    if (!user) {
      return {
        errors: loginError,
      };
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return {
        errors: loginError,
      };
    }

    req.session.user = { id: user.id };

    return {
      user,
    };
  }

  @Query(() => User, { nullable: true })
  async user(@Ctx() { em, req }: AppContext) {
    // Unlogged user
    if (!req.session.user.id) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.user.id });
    return user;
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: AppContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(USER_SESSION_COOKIE);
        if (err) {
          console.log(err);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}
