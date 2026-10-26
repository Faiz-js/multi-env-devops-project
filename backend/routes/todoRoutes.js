const express = require("express");
const {
  getTodos,
  addTodos,
  editTodo,
  deleteTodos,
} = require("../controllers/todoControllers.js");

const router = express.Router();

router.get("/get-todos", getTodos);
router.post("/add-todo", addTodos);
router.put("/edit-todo", editTodo);
router.delete("/delete-todo", deleteTodos);

module.exports = router;
