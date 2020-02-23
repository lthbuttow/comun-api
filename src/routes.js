import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/auth', AuthController.store);
routes.post('/user', UserController.store);

routes.use(authMiddleware);

routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

export default routes;
