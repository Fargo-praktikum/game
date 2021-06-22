import { Router } from "express";
import { appRoutes } from "./appRoutes";
import { topicRoutes } from "./topicRoutes";

const router: Router = Router();

topicRoutes(router);
appRoutes(router);

export default router;
