const db = require("../config/db.js");
const sortData = require("../utils/sortData.js");

const TODO_TABLE = process.env.TODO_TABLE;

const getTodos = async (req, res) => {
  try {
    const query = `SELECT * FROM ${TODO_TABLE}`;

    const [rows] = await db.execute(query);

    const data = sortData(rows);

    return res.status(200).json({ message: "data fetched successfully", data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in getTodos: ", error: error.message });
  }
};

const addTodos = async (req, res) => {
  try {
    const { todo_description } = req.body;

    const query = `INSERT INTO ${TODO_TABLE} (id, todo_description, created_at, updated_at) VALUES (UUID(), ?, NOW(), NOW())`;

    await db.execute(query, [todo_description]);

    const selectQuery = `SELECT * FROM ${TODO_TABLE}`;

    const [rows] = await db.execute(selectQuery);

    const data = sortData(rows);

    return res.status(200).json({ message: "Todo added successfully", data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in addTodos: ", error: error.message });
  }
};

const editTodo = async (req, res) => {
  try {
    const { id, todo_description } = req.body;

    const query = `UPDATE ${TODO_TABLE} SET todo_description = ?, updated_at = NOW() WHERE id = ?`;

    await db.execute(query, [todo_description, id]);

    const selectQuery = `SELECT * FROM ${TODO_TABLE}`;

    const [rows] = await db.execute(selectQuery);

    const data = sortData(rows);

    return res.status(200).json({ message: "Todo edited successfully", data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in editTodos: ", error: error.message });
  }
};

const deleteTodos = async (req, res) => {
  try {
    const { id } = req.body;

    const query = `DELETE FROM ${TODO_TABLE} WHERE id = ?`;

    await db.execute(query, [id]);

    const selectQuery = `SELECT * FROM ${TODO_TABLE}`;

    const [rows] = await db.execute(selectQuery);

    const data = sortData(rows);

    return res.status(200).json({ message: "Todo deleted successfully", data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in deleteTodos: ", error: error.message });
  }
};

module.exports = { getTodos, addTodos, editTodo, deleteTodos };
