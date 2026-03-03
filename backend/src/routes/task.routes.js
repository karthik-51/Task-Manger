const router = require("express").Router();
const { auth } = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { taskSchema, updateTaskSchema, statusSchema } = require("../validations/task.validation");
const controller = require("../controllers/task.controller");

router.use(auth);

/* =========================
   CREATE TASK
========================= */
router.post(
  "/",
  validate(taskSchema),
  controller.create
);

/* =========================
   GET ALL TASKS (filters, pagination)
========================= */
router.get("/", controller.getAll);

/* =========================
   GET SINGLE TASK
========================= */
router.get("/:id", controller.getOne);

/* =========================
   UPDATE TASK
========================= */
router.put(
  "/:id",
  validate(updateTaskSchema),
  controller.update
);

/* =========================
   DELETE TASK
========================= */
router.delete("/:id", controller.remove);

/* =========================
   CHANGE STATUS
========================= */
router.patch(
  "/:id/status",
  validate(statusSchema),
  controller.changeStatus
);

module.exports = router;