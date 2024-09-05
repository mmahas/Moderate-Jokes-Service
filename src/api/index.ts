import { Router } from "express";
import ModeratorController from "./controller/ModeratorController";
import AuthController from "./controller/AuthController";

export default () => {
  const app = Router();
  ModeratorController(app);
  AuthController(app);
  return app;
};
