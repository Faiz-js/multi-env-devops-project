import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { modalOptions } from "../../constants/modalOptions.js";

const TodoCard = ({ todo, handleSelectionModal, getSelectedTodoData }) => {
  return (
    <div className="flex items-center gap-2 text-lg rounded-md hover:bg-white px-4 py-2">
      <span className="text-2xl">✨</span>
      <h1 className="flex-1">{todo?.todo_description}</h1>
      <div>
        <button
          title="Edit"
          onClick={() => {
            handleSelectionModal(modalOptions.EDIT);
            getSelectedTodoData(todo);
          }}
          className="hover:bg-gray-300 p-2 rounded-md"
        >
          <FaRegEdit size={30} />
        </button>
        <button
          title="Delete"
          onClick={() => {
            handleSelectionModal(modalOptions.DELETE);
            getSelectedTodoData(todo);
          }}
          className="hover:bg-red-300 p-2 rounded-md"
        >
          <AiOutlineDelete size={30} />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
