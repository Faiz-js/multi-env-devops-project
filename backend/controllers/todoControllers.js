const cassandra = require("../config/db.js");
const sortData = require("../utils/sortData.js");

const TODO_TABLE = process.env.TODO_TABLE;

const getTodos = async (req, res) => {
  try {
    const query = `SELECT * FROM ${TODO_TABLE}`;

    const result = await cassandra.execute(query, { prepare: true });

    const data = sortData(result);

    return res
      .status(200)
      .json({ messsage: "data fetched successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Error in getTodos: ", error });
  }
};

const addTodos = async (req, res) => {
  try {
    const { todo_description } = req.body;

    const query = `INSERT INTO ${TODO_TABLE} (id, todo_description, created_at, updated_at) VALUES (uuid(), ?, toTimestamp(now()), toTimestamp(now()))`;

    await cassandra.execute(query, [todo_description], {
      prepare: true,
    });

    const selectQuery = `SELECT * FROM ${TODO_TABLE}`;

    const result = await cassandra.execute(selectQuery, { prepare: true });

    const data = sortData(result);

    return res.status(200).json({ message: "Todo added successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Error in addTodos: ", error });
  }
};

const editTodo = async (req, res) => {
  try {
    const { id, todo_description } = req.body;

    const query = `UPDATE ${TODO_TABLE} SET todo_description = ?, updated_at = toTimestamp(now()) WHERE id = ?`;

    await cassandra.execute(query, [todo_description, id], {
      prepare: true,
    });

    const selectQuery = `SELECT * FROM ${TODO_TABLE}`;

    const result = await cassandra.execute(selectQuery, { prepare: true });

    const data = sortData(result);

    return res.status(200).json({ message: "Todo edited successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Error in editTodos: ", error });
  }
};

const deleteTodos = async (req, res) => {
  try {
    const { id } = req.body;

    const query = `DELETE FROM ${TODO_TABLE} WHERE id = ?`;

    await cassandra.execute(query, [id], { prepare: true });

    const selectQuery = `SELECT * FROM ${TODO_TABLE}`;

    const result = await cassandra.execute(selectQuery, { prepare: true });

    const data = sortData(result);

    return res.status(200).json({ message: "Todo deleted successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Error in deleteTodos: ", error });
  }
};

module.exports = { getTodos, addTodos, editTodo, deleteTodos };
