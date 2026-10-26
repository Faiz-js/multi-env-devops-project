import { useEffect } from "react";

const EditModal = ({
  selectedTodoData,
  closeModal,
  editTodo,
  editedTodo,
  setEditedTodo,
}) => {
  useEffect(() => {
    setEditedTodo(selectedTodoData?.todo_description);
  }, []);

  const editTodoAndCloseModal = (id, editedTodo) => {
    editTodo(id, editedTodo);
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        value={editedTodo}
        onChange={(e) => setEditedTodo(e.target.value)}
        type="text"
        placeholder="Edit you Todo..."
        className="outline-none py-2 px-2 rounded-md border w-full"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={closeModal}
          className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={() =>
            editTodoAndCloseModal(selectedTodoData?.id, editedTodo)
          }
          className="bg-slate-500 hover:bg-slate-600 text-white rounded-lg px-4 py-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditModal;
