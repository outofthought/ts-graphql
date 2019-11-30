import { MiddlewareFn } from "type-graphql";
import { MyContext } from "src/types/MyContext";
import { User } from "./../../entity/User";

export const hasRole: (role: string) => MiddlewareFn<MyContext> = (
  role: string
) => async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("not authenticated");
  }

  const user = await User.findOne(context.req.session!.userId);

  if (!user) {
    throw new Error("not authenticated");
  }

  if (user.role !== role) {
    throw new Error("not authorized");
  }

  return next();
};

// @UseMiddleware(hasRole("admin"))
// @Query(() => String)
// async hello() {
//   return "Hello World!";
// }
