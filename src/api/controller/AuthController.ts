import { NextFunction, Request, Response, Router } from "express";
import userValidation from "../../validators/user";
import { IUserInputDto } from "../../interfaces/IUser";
import { Container } from "typedi";
import logger from "../../loaders/logger";
import AuthService from "../../services/AuthService";
import roleCheckMiddleware from "../../middleware/roleCheckMiddleware";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    '/register',
    // roleCheckMiddleware('Admin'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await userValidation.validateAsync(req.body as IUserInputDto);
        const userService = await Container.get(AuthService);
        const user = await userService.register(
          req.body as IUserInputDto
        );
        return res.status(200).json(user);
      } catch (e) {
        logger.error("🔥 error: %o Failed to register user", e);
        return next(e);
      }
    }
  );

  route.get(
    '/user/:_userId',
    // roleCheckMiddleware('Admin'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const _id = req.params._userId;
        const userService = await Container.get(AuthService);
        const user = await userService.getUser({_id})
        logger.info("📥 Fetched user information successfully");
        return res.status(200).json(user); 
      } catch (error) {
        logger.error("❌ Error fetching user information: %o", error);
        return res.status(500).json({ message: 'Failed to fetch user information', error: error.message });
      }
    }
  );

  route.patch(
    "/:_Id",
    async (req: Request, res: Response, next: NextFunction) => {
      const _id = req.params._teacherId;
      const update = req.body;
      try {
        await userValidation.validateAsync(req.body as IUserInputDto);
        const userService = await Container.get(AuthService);
        const user = await userService.updateUser(
          { _id },
          update as IUserInputDto,
          { new: true }
        );
        return res.status(200).json( user );
      } catch (e) {
        logger.error("🔥 error: %o user Update Failed", e);
        return next(e);
      }
    }
  );

  route.post(
    '/login',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const userService = await Container.get(AuthService);
        await userService.seedAdmin();
        const token = await userService.login(
          email, password
        );
        if (!token) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.json(token);
      } catch (e) {
        logger.error("🔥 error: %o Login failed", e);
        return next(e);
      }
    }
  );

  route.delete(
    "/:_Id",
    async (req: Request, res: Response, next: NextFunction) => {
      const _id = req.params._Id;
      try {
        const userService = Container.get(AuthService);
        const user = await userService.deleteUser(_id);
        return res.status(200).json(user);
      } catch (e) {
        logger.error("🔥 error: %o remove user failed", e);
        return next(e);
      }
    }
  );
};
