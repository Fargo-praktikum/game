const Router = require("express")
const router = new Router;
const themeController = require('../controller/theme.controller')

router.get("/themetest", themeController.themetest)

module.exports = router
