import React from "react";
import TodoFilterControl from "./TodoFilterControl";
import TodoFooter from "./TodoFooter";
import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoContainer = () => {
  return (
    <div className="flex flex-col mt-20 max-w-[500px] w-full px-6 sm:px-0 z-50">
      <TodoHeader />
      <TodoInput />
      <TodoList />
      <TodoFilterControl />
      <TodoFooter />
    </div>
  );
};

export default TodoContainer;
