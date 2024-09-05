import { Document, Model } from "mongoose";

declare global {
  namespace Express {
    export interface Request {
      // currentUsers: IUserInputDto & Document;
    }
  }

  namespace Models {
    // export type UserModels = Model<IUserInputDto & Document>;
  }

}
