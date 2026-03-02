const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { taskSchema } = require("../validations/task.validation");
const controller = require("../controllers/task.controller");

router.use(auth);

router.post("/", validate(taskSchema), controller.create);
router.get("/", controller.getAll);

module.exports = router;