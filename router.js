const router = require("express").Router();

const { getTodos, createTodo, updateTodo, deleteTodo } = require("./controllers/Todo");

router.get("/", (req, res) => {
  console.log("asd ~ file: router.js ~ line 4 ~ router.get ~ req", req)
  res.send("Let's build a CRUD API!");
});

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.post("/todos/:todoID", updateTodo);
router.delete("/todos/:todoID", deleteTodo);

module.exports = router;