import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Inject, Service } from "typedi";
import { IUser, IUserInputDto } from '../interfaces/IUser';
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import config from "../config";

const JWT_SECRET = config.jwtSecret;

@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private userModel,
  ) { }

  public async register(
    userDTO: UpdateQuery<IUserInputDto>
  ): Promise<{ user: String }> {
    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    const user = await this.userModel.create({
      ...userDTO,
      password: hashedPassword
    });

    if (!user) {
      throw new Error("user cannot be created");
    }

    return { user: user._id };
  }

  public async login(email: string, password: string): Promise<any | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return { "_id": user._id, "token": jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2h' }) };
  }

  public async getUser(query: FilterQuery<IUser>): Promise<IUser | null> {
    const user = await this.userModel.findOne(query).select("name email");
    if (!user) {
        return null;
    }

    return user;
  }

  public async deleteUser(_id: any): Promise<IUser | null> {
    const user = await this.userModel.deleteOne({ _id: _id });
    return user;
  }

  public async updateUser(
    query: FilterQuery<IUser>,
    update: UpdateQuery<IUser>,
    options: QueryOptions
  ): Promise<IUser | null> {
    const hashedPassword = await bcrypt.hash(update.password, 10);

    const moderator = await this.userModel.findOneAndUpdate(query, {
      ...update,
      password: hashedPassword
    }, options);

    return moderator;
  }

  public async seedAdmin() {
    const existingAdmin = await this.userModel.findOne({ email: 'admin@admin.com' });
    if (existingAdmin) {
      return;
    }
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await this.userModel.create({
      name: "Moderator",
      email: "admin@admin.com",
      role: "Admin",
      password: hashedPassword
    });

    if (!admin) {
      throw new Error("user creation failed");
    }
  }
}
