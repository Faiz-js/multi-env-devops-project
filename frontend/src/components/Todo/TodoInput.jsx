import { FaRegSquarePlus } from "react-icons/fa6";

const TodoInput = ({ input, setInput, addTodo }) => {
  return (
    <div className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Enter your todo..."
        className="flex-1 rounded-md p-4 outline-none"
      />
      <button
        onClick={() => addTodo(input)}
        className="bg-slate-500 text-white text-lg font-semibold px-4 py-1 rounded-md flex items-center gap-2"
      >
        <FaRegSquarePlus size={25} /> <span>Add</span>
      </button>
    </div>
  );
};

export default TodoInput;
