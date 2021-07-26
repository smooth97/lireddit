import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { MyContext } from "src/types";

export const isAuth: Middleware<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  return next;
};
