import { createContext, useContext, useEffect, useState } from "react";
import { getTodos } from "../axios/api";

const Context = createContext();

export function TodoContext({children}) {
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loadingStatus, setLoadingStatus] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const res = await getTodos();
      setLoadingStatus(false);
      if (res.success === true)
        setTodos(res.data.todo);
    }
    fetchData();
  }, [])
  return (
    <Context.Provider value={[todos, setTodos, filterStatus, setFilterStatus, loadingStatus, setLoadingStatus]}>{children}</Context.Provider>
  )
}

export function useTodoContext() {
  return useContext(Context);
}