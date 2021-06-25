import { Router } from "express";
import { appRoutes } from "./appRoutes";
import { themeRoutes } from "./themeRoutes";

const router: Router = Router();

themeRoutes(router);
appRoutes(router);

export default router;
