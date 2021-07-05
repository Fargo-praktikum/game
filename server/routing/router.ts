import { Router } from "express";
import { appRoutes } from "./appRoutes";
import { commentRoutes } from "./commentRoutes";
import { emojiRoutes } from "./emojiRoutes";
import { topicRoutes } from "./topicRoutes";
import { themeRoutes } from "./themeRoutes";

const router: Router = Router();

appRoutes(router);
topicRoutes(router);
commentRoutes(router);
emojiRoutes(router);
themeRoutes(router);

export default router;
