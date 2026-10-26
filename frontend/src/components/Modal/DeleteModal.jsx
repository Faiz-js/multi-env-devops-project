const DeleteModal = ({ selectedTodoData, closeModal, deleteTodo }) => {
  const deleteTodoAndCloseModal = (id) => {
    deleteTodo(id);
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>
        Are you sure you want to delete{" "}
        <span className="text-red-500 font-semibold">
          "{selectedTodoData?.todo_description}"
        </span>{" "}
        Todo
      </h1>
      <div className="flex justify-end gap-3">
        <button
          onClick={closeModal}
          className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={() => deleteTodoAndCloseModal(selectedTodoData?.id)}
          className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
