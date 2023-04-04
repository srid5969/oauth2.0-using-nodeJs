import { Container } from "inversify";
import { UserService, UserServiceI } from "../../user/Service/user";
import { UserController } from "../../user/Controller/UserController";
import { OAuthUtil } from "../../MiddleWare/OAuth/Util/OAuth.Util";
import { Action, ClassConstructor, IocAdapter } from "routing-controllers";

const container = new Container();
container.bind<UserServiceI>("UserService").to(UserService)
container.bind<UserController>(UserController).toSelf();
container.bind<OAuthUtil>(OAuthUtil).toSelf();
// // let server = new InversifyExpressServer(container);

export {container}

class InversifyAdapter implements IocAdapter {
    constructor(private readonly container: Container) {}

    get<T>(someClass: ClassConstructor<T>, action?: Action): T {
        throw new Error("Method not implemented.");
    }
}

const a=new InversifyAdapter(container)