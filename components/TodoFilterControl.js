import React from "react";
import { clearComplete } from "../axios/api";
import { useTodoContext } from "../context";

const TodoFilterControlItem = ({ filterData }) => {
  const [, , filterStatus, setFilterStatus] = useTodoContext();

  const handleClick = () => {
    setFilterStatus(filterData.value);
  };

  return (
    <button
      key={filterData.value}
      onClick={handleClick}
      className={
        filterStatus === filterData.value
          ? "text-[#3a7bfc]"
          : "hover:text-[#484b6a] dark:hover:text-[#e4e5f1]"
      }
    >
      {filterData.label}
    </button>
  );
};

const filterControls = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Complete", value: "Complete" },
];

const TodoFilterControl = () => {
  const [todos, setTodos, filterStatus] = useTodoContext();

  const clearCompletedTodos = async () => {
    const res = await clearComplete();
    if (res.success === true) {
      const newTodos = todos.filter((item) => item["todo_complete"] === false);
      setTodos(newTodos);
    }
  };
  const handleClearComplete = async () => {
    clearCompletedTodos();
  };
  const getUncompletedTodoCount = () => {
    const uncompleted = todos.filter((item) => {
      if (filterStatus === "All") return true;
      return filterStatus === "Active"
        ? item["todo_complete"] === false
        : item["todo_complete"] === true;
    });
    return uncompleted.length;
  };

  return (
    <>
      <div className="p-4 px-4 flex justify-between text-sm bg-[#fafafa] dark:bg-[#25273c] rounded-md rounded-t-none text-[#9293a4] dark:text-[#4d5066] shadow-xl ">
        <div>{`${getUncompletedTodoCount()} items left`}</div>
        <div className="hidden sm:flex justify-center gap-4 cursor-pointer font-bold">
          {filterControls.map((filter) => (
            <TodoFilterControlItem key={filter.value} filterData={filter} />
          ))}
        </div>
        <div className="cursor-pointer ">
          <button
            className="hover:text-[#484b6a] dark:hover:text-[#e4e5f1]"
            onClick={handleClearComplete}
          >
            Clear Completed
          </button>
        </div>
      </div>
      <div className="sm:hidden p-4 mt-6 px-4 flex justify-center gap-4 text-sm bg-[#fafafa] dark:bg-[#25273c] font-bold rounded-md text-[#9293a4] dark:text-[#4d5066] shadow-xl">
        {filterControls.map((filter) => (
          <TodoFilterControlItem key={filter.value} filterData={filter} />
        ))}
      </div>
    </>
  );
};

export default TodoFilterControl;
