import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
import QuestionController from './app/controllers/QuestionController';

const routes = new Router();

// Authorization Routes
routes.post('/auth', AuthController.store);
routes.post('/user', UserController.store);

routes.use(authMiddleware);

// User Routes
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

// Question Routes
routes.post('/question', QuestionController.store);
routes.get('/question', QuestionController.index);
routes.get('/question/:id', QuestionController.show);
routes.put('/question/:id', QuestionController.update);
routes.delete('/question/:id', QuestionController.delete);

export default routes;
