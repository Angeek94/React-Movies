import { IUser } from "./IUser";

export interface ISignUp extends IUser{
    confirmPassword:string;
  }