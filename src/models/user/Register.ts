import { Query, Mutation, Resolver, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "./../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth, logger)
  // @Authorized() //here we could had used before middleware was added
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  //1.Instead of putting field resolver here, we can put it into ObjectType of User entity
  // @FieldResolver()
  // async name(@Root() parent: User) {
  //   return `${parent.firstName} ${parent.lastName}`;
  // }

  // 2. Added RegisterInput in User model
  // @Mutation(() => User)
  // async register(
  //   @Arg("firstName") firstName: string,
  //   @Arg("lastName") lastName: string,
  //   @Arg("email") email: string,
  //   @Arg("password") password: string
  // ): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(password, 12);

  @Mutation(() => User)
  async register(@Arg("data")
  {
    email,
    firstName,
    lastName,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
