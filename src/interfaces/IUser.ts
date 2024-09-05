export interface IUserInputDto {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IUser extends IUserInputDto {
  _id: string;
}
