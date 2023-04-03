import { Container } from "inversify";
import { UserService, UserServiceI } from "../../user/Service/user";
import { UserController } from "../../user/Controller/UserController";
import { OAuthUtil } from "../../MiddleWare/OAuth/Util/OAuth.Util";
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';

const container = new Container();
container.bind<UserServiceI>("UserService").to(UserService)
container.bind<UserController>(UserController).toSelf();
container.bind<OAuthUtil>(OAuthUtil).toSelf();
// // let server = new InversifyExpressServer(container);

export {container}