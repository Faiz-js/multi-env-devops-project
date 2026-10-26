import ModalContainer from "../Modal/ModalContainer";
import TodoCard from "./TodoCard";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import useModal from "../../hooks/useModal";
import { modalOptions } from "../../constants/modalOptions";
import useTodo from "../../hooks/useTodo";
import { useEffect } from "react";
import DeleteModal from "../Modal/DeleteModal";
import EditModal from "../Modal/EditModal";
import NoTodo from "./NoTodo";

const TodoContent = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    selectedModal,
    setSelectedModal,
    openModal,
    closeModal,
    handleSelectionModal,
  } = useModal();

  const {
    todos,
    getTodos,
    input,
    setInput,
    addTodo,
    selectedTodoDescription,
    editTodo,
    deleteTodo,
    getSelectedTodoData,
    selectedTodoData,
    editedTodo,
    setEditedTodo,
  } = useTodo();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <TodoHeader />
      <TodoInput input={input} setInput={setInput} addTodo={addTodo} />
      {todos?.data && todos?.data?.length > 0 ? (
        todos?.data?.map((todo) => (
          <TodoCard
            key={todo?.data?.id}
            todo={todo}
            handleSelectionModal={handleSelectionModal}
            getSelectedTodoData={getSelectedTodoData}
          />
        ))
      ) : (
        <NoTodo />
      )}
      <ModalContainer
        title={
          selectedModal === modalOptions.EDIT ? "Edit Modal" : "Delete Modal"
        }
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {selectedModal === modalOptions.EDIT && (
          <EditModal
            selectedTodoData={selectedTodoData}
            closeModal={closeModal}
            editTodo={editTodo}
            editedTodo={editedTodo}
            setEditedTodo={setEditedTodo}
          />
        )}
        {selectedModal === modalOptions.DELETE && (
          <DeleteModal
            selectedTodoData={selectedTodoData}
            closeModal={closeModal}
            deleteTodo={deleteTodo}
          />
        )}
      </ModalContainer>
    </div>
  );
};

export default TodoContent;
