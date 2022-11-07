import { createContext, useContext, useEffect, useState } from "react";
import { getTodos } from "../axios/api";

const Context = createContext();

export function TodoContext({children}) {
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  useEffect(() => {
    async function fetchData() {
      const res = await getTodos();
      if (res.success === true)
        setTodos(res.data.todo);
    }
    fetchData();
  }, [])
  return (
    <Context.Provider value={[todos, setTodos, filterStatus, setFilterStatus]}>{children}</Context.Provider>
  )
}

export function useTodoContext() {
  return useContext(Context);
}