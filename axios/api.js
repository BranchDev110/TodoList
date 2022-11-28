import axios from "axios";

const BASE_URL = "http://localhost:8000";
// const BASE_URL = 'https://boiling-savannah-17838.herokuapp.com'

export const createTodo = async (text) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/todo/`, {
      todo_desc: text,
    });
    return { success: true, data: res.data };
  } catch (e) {
    return { success: false, error: e };
  }
};

export const getTodos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/todo/`);
    return { success: true, data: res.data };
  } catch (e) {
    return { success: false, error: e };
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/todo/delete/`, {
      id,
    });
    return { success: true, data: res.data };
  } catch (e) {
    return { success: false, error: e };
  }
};

export const updateTodo = async (id) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/todo/update/`, {
      id,
    });
    return { success: true, data: res.data };
  } catch (e) {
    return { success: false, error: e };
  }
};

export const clearComplete = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/api/todo/clear/`);
    return { success: true, data: res.data };
  } catch (e) {
    return { success: false, error: e };
  }
};

export const changeItem = async (src, destf, destn) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/todo/change/`,{
      src, destf, destn
    });
    return { success: true, data: res.data };    
  } catch (e) {
    return { success: false, error: e };   
  }
}