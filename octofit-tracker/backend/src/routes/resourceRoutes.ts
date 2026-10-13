import { Router, type RequestHandler } from 'express';
import type { Model } from 'mongoose';

export function listRoute<T>(resourceModel: Model<T>, sort: Record<string, 1 | -1> = {}): Router {
  const router = Router();

  const listResources: RequestHandler = (_request, response, next) => {
    void resourceModel
      .find()
      .sort(sort)
      .lean()
      .exec()
      .then((resources) => response.json(resources))
      .catch(next);
  };

  router.get('/', listResources);
  return router;
}
