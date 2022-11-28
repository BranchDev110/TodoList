import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { deleteTodo, updateTodo } from "../axios/api";
import { useTodoContext } from "../context";
import IconCheck from "../public/images/icon-check.svg";
import IconCross from "../public/images/icon-cross.svg";

const TodoListItem = ({ todo, index }) => {
  const [todos, setTodos] = useTodoContext();

  const handleDelete = async () => {
    const res = await deleteTodo(todo["todo_id"]);
    if(res.success === true){
      const newTodos = todos.filter(
        (item) => item["todo_id"] !== res.data["todo_id"]
      );
      setTodos(newTodos);
    }
    else {
      alert("Error!")
    }
  };

  const handleUpdate = async () => {
    const res = await updateTodo(todo["todo_id"]);
    if(res.success === true){
      const updatedIndex = todos.findIndex(
        (item) => item["todo_id"] === res.data["todo_id"]
      );
      const newTodos = [...todos];
      newTodos[updatedIndex]["todo_complete"] =
        !newTodos[updatedIndex]["todo_complete"];
      setTodos(newTodos);
    }
    else {
      alert ("Error!")
    }
  };

  return (
    <Draggable draggableId={todo["todo_id"].toString()} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="group border-b-[1px] border-[#d3d4db] bg-[#fafafa] dark:bg-[#25273c] dark:border-[#393a4d]  p-4 px-5 text-[#484b6a] dark:text-[#cacde8] first:rounded-t-md "
        >
          <div className="flex items-center justify-between relative">
            <button
              className={
                todo["todo_complete"]
                  ? "w-6 h-6 absolute border bg-gradient-to-br from-[#57DDFF] to-[#C058F3] dark:border-none  rounded-full z-20 cursor-pointer flex justify-center items-center"
                  : "w-6 h-6 absolute border-gradient-br-slate-300-zinc-white gradient-border-1 rounded-full z-20 cursor-pointer hover:border-gradient-br-purple-blue-zinc-white dark:border-gradient-br-grayish-blue-dark-blue dark:hover:border-gradient-br-purple-blue-dark-blue"
              }
              onClick={handleUpdate}
            >
              {todo["todo_complete"] ? <IconCheck /> : ""}
            </button>
            <p
              className={
                todo["todo_complete"]
                  ? "line-through text-[#d3d4db] dark:text-[#4d5066] pl-12 cursor-pointer"
                  : "pl-12 cursor-pointer"
              }
              onClick={handleUpdate}
            >
              {todo["todo_desc"]}
            </p>
            <div className="mr-2">
              <IconCross
                className="sm:hidden ml-3 group-hover:block cursor-pointer"
                onClick={handleDelete}
              />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default TodoListItem;
