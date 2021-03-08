import { User } from "../entities/User";
import { AppContext } from "../../src/types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import argon from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("input") input: UsernamePasswordInput,
    @Ctx() { em }: AppContext
  ) {
    const hashedPassword = await argon.hash(input.password);
    const user = em.create(User, {
      username: input.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    return user;
  }
}
