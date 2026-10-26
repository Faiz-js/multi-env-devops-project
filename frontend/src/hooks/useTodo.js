import { useState } from "react";

const useTodo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedTodoData, setSelectedTodoData] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  const getSelectedTodoData = (todo) => {
    setSelectedTodoData(todo);
  };

  const getTodos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todos/get-todos`);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error in getTodos: ", error);
    }
  };

  const addTodo = async (todo_description) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todos/add-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo_description,
        }),
      });
      const data = await res.json();
      setTodos(data);
      setInput("");
    } catch (error) {
      console.error("Error in addTodo: ", error);
    }
  };

  const editTodo = async (id, todo_description) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/todos/edit-todo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, todo_description }),
      });
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error in editTodo: ", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/todos/delete-todo`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        },
      );
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error in deleteTodo: ", error);
    }
  };

  return {
    input,
    setInput,
    todos,
    setTodos,
    getTodos,
    addTodo,
    editTodo,
    deleteTodo,
    getSelectedTodoData,
    selectedTodoData,
    editedTodo,
    setEditedTodo,
  };
};

export default useTodo;
