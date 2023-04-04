import {
  RoutingControllersOptions,
} from "routing-controllers";
import { UserController } from "../../user/Controller/UserController";
import { AuthMiddleware } from "../../MiddleWare/OAuth/Authentication/OAuth20";


export const options: RoutingControllersOptions = {
  controllers: [UserController],
  middlewares: [AuthMiddleware],
};
