import { NextFunction, Request, Response, Router } from "express";
import logger from "../../loaders/logger";
import axios from "axios";
import config from "../../config";
import { getAuthHeader } from "../../utils/authHeader";
import roleCheckMiddleware from "../../middleware/roleCheckMiddleware";

const route = Router();

export default (app: Router) => {
  app.use("/moderate", route);

  // Route to fetch all jokes for moderation
  route.get(
    '/jokes',
    // roleCheckMiddleware('Admin'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization; 
        const response = await axios.get(`${config.submit_jokes_service_url}/submit`,getAuthHeader(token));
        logger.info("📥 Fetched jokes for moderation successfully");
        return res.status(200).json(response.data); 
      } catch (error) {
        logger.error("❌ Error fetching jokes for moderation: %o", error);
        return res.status(500).json({ message: 'Failed to fetch jokes for moderation', error: error.message });
      }
    }
  );

  // Route to create joke type moderation
  route.post(
    '/joke-type',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const updateData = req.body;
        const response = await axios.post(`${config.deliver_jokes_service_url}/joke-type`, updateData);
        logger.info(`📝 New joke type created `);
        return res.status(200).json(response.data); 
      } catch (error) {
        logger.error(`❌ Failed to create joke type: ${error.message}`, error);
        return res.status(400).json({ message: 'Failed to create joke type', error: error.message });
      }
    }
  );

  // Route to update a joke from moderation
  route.patch(
    "/joke/:_jokeId",
    // roleCheckMiddleware('Admin'),
    async (req: Request, res: Response, next: NextFunction) => {
      const jokeId = req.params._jokeId;
      const {status, ...updateData} = req.body;
      try {
        const token = req.headers.authorization; 
        
        if (status === 'approved'){
          const response = await axios.post(`${config.deliver_jokes_service_url}/joke`, updateData);
          logger.info(`✅ New joke Delivered`);
        }
        const response = await axios.delete(`${config.submit_jokes_service_url}/submit/${jokeId}`, getAuthHeader(token));
        logger.info(`🗑️ Joke with ID ${jokeId} deleted successfully via moderation`);
        return res.status(200).json(response.data);
      } catch (error) {
        logger.error("❌ Error updating joke via moderation: %o", error);
        return res.status(500).json({ message: 'Failed to update joke', error: error.message });
      }
    }
  );

  // Route to delete a joke from moderation
  route.delete(
    "/joke/:_jokeId",
    // roleCheckMiddleware('Admin'),
    async (req: Request, res: Response, next: NextFunction) => {
      const jokeId = req.params._jokeId;
      try {
        const token = req.headers.authorization; 
        const response = await axios.delete(`${config.submit_jokes_service_url}/submit/${jokeId}`, getAuthHeader(token));
        logger.info(`🗑️ Joke with ID ${jokeId} deleted successfully via moderation`);
        return res.status(200).json(response.data);
      } catch (error) {
        logger.error("❌ Error deleting joke via moderation: %o", error);
        return res.status(500).json({ message: 'Failed to delete joke', error: error.message });
      }
    }
  );
};
