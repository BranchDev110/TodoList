import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { changeItem } from "../axios/api";
import { useTodoContext } from "../context";
import TodoListItem from "./TodoListItem";
const TodoList = () => {
  const [todos, setTodos, filterStatus] = useTodoContext();

  const changeTodoItems = async (source, destination) => {
    const todo_src_id = todos[source.index]["todo_id"];
    const todo_dest_f_id =
      source.index > destination.index
        ? destination.index === 0
          ? -1
          : todos[destination.index - 1]["todo_id"]
        : todos[destination.index]["todo_id"];
    const todo_dest_s_id =
      source.index > destination.index
        ? todos[destination.index]["todo_id"]
        : todos[destination.index + 1] === undefined
        ? -1
        : todos[destination.index + 1]["todo_id"];
    const res = await changeItem(todo_src_id, todo_dest_f_id, todo_dest_s_id);
    if (res.success === true) {
      const items = [...todos];
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setTodos(items);
    }
    else {
      alert("Error!")
    }
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    changeTodoItems(source, destination);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <ul
            className="shadow-xl"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos
              .filter((item) => {
                if (filterStatus === "All") return true;
                return filterStatus === "Active"
                  ? item["todo_complete"] === false
                  : item["todo_complete"] === true;
              })
              .map((todo, index) => (
                <TodoListItem todo={todo} key={todo["todo_id"]} index={index} />
              ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
