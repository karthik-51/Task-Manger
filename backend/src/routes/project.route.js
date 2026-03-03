const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");
const controller = require("../controllers/project.controller");

router.use(auth);

router.post("/", controller.create);
router.get("/", controller.getAll);

module.exports = router;