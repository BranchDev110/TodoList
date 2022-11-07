import React, { useState } from "react";
import { createTodo } from "../axios/api";
import { useTodoContext } from "../context";

const TodoInput = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useTodoContext();

  const submitTodo = async () => {
    if (todoText !== "") {
      const result = await createTodo(todoText);
      if (result.success === true) {
        setTodoText("");
        setTodos([...todos, result.data]);
      }
      else {
        alert("Error!")
      }
    }
  };

  const handleClick = () => {
    submitTodo();
  };

  const handleKeyEvent = (e) => {
    if (e.keyCode === 13) submitTodo();
  };
  return (
    <div className="relative flex items-center mb-14">
      <div
        className="w-6 h-6 absolute ml-5 border border-slate-300 rounded-full z-10 dark:border-[#393a4d] dark:text-[#4d5066]"
        onClick={handleClick}
      />
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyEvent}
        className="absolute w-full p-4 pl-16  rounded-md focus:outline-none bg-[#fafafa] text-[#484b6a] dark:bg-[#25273c] dark:text-[#cacde8] placeholder:text-[#9293a4] "
        placeholder="Create a new todo"
      />
    </div>
  );
};

export default TodoInput;
