import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";

export default async ({ expressApp }: { expressApp: any }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const userModel = {
    name: "userModel",
    model: require("../models/UserModels").default,
  };  

  await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
    ],
  });

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
