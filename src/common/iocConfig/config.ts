import { Container } from "inversify";
import { UserService } from "../../user/Service/user";
import { UserController } from "../../user/Controller/UserController";
import { OAuthUtil } from "../../MiddleWare/OAuth/Util/OAuth.Util";

const container = new Container();
container.bind<UserService>(UserService).toSelf();
container.bind<UserController>(UserController).toSelf();
container.bind<OAuthUtil>(OAuthUtil).toSelf();
export {container}