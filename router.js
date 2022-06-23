const router = require("express").Router();
// const express = require("express");
// const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require("./controllers/Todo");
const {
  getUsers,
  registerUser,
  login,
  updateUser,
  deleteUser,
} = require("./controllers/users");

router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

router.get("/users", (req, res) => {
  res.send("users page!");
});

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.post("/todos/:todoID", updateTodo);
router.delete("/todos/:todoID", deleteTodo);

router.get("/users-list", getUsers);
router.post("/register", registerUser);
router.post("/login", login);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;