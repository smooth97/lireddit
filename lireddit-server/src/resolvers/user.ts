import { Resolver, Query, Arg, InputType, Field, Ctx } from "type-graphql";
import { MyContext } from "src/types";
import { User } from "src/entities/User";
import {argan}

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const user = em.create(User, { username: options.username });
    await em.persistAndFlush(user);
    return "hello world";
  }
}
