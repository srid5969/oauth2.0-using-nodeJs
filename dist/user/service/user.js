"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.UserSignUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../model/user"));
// export async function login(username: string, password: string): Promise<any> {
//   return new Promise<any>(async (resolve, reject) => {
//     let data: any = await user.findOne({ username }, { _id: 1, password: 1 ,username:1});
//     if (!(username && password)) {
//       reject({ "message":"First enter username and password miss Frontend developer" });
//       return;
//     }
//     //if  data
//     if (data) {
//       /**
//        * TODO : Login
//        * !comparing
//        * @param password  plain text password
//        * @param data.password bcrypt password
//        */
//       const Data = await bcrypt.compare(password, data.password);
//       if (Data) {
//         await generateToken(data._id)
//           .catch((err) => reject({message:err.toString()}))
//           .then((token) => resolve({ username:data.username,id:data._id,token }));
//       } else {
//         reject({ message: "wrong password" });
//       }
//     } else {
//       reject({ message: "user cannot be found" });
//     }
//   });
// }
async function UserSignUp(data) {
    const salt = await bcrypt_1.default.genSalt(10);
    const password = await bcrypt_1.default.hash(data.password, salt);
    return await user_1.default.create({
        username: data.username,
        password,
        role: data.role,
    });
}
exports.UserSignUp = UserSignUp;
async function logout(data) {
}
exports.logout = logout;
