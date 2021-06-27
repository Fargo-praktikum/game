import { Router } from "express";
import { appRoutes } from "./appRoutes";
import { commentRoutes } from "./commentRoutes";
import { emojiRoutes } from "./emojiRoutes";
import { topicRoutes } from "./topicRoutes";

const router: Router = Router();

topicRoutes(router);
commentRoutes(router);
emojiRoutes(router);
appRoutes(router);

export default router;
