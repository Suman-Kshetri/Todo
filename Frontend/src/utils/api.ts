import axios from "../utils/axios";

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: "completed" | "incomplete" | "pending";
  priority: "low" | "medium" | "high";
  createdAt: string;
  completedAt?: string | null;
}

// Helper to extract data property from your API responses
const extractData = <T>(res: { data: { data: T } }): T => res.data.data;

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await axios.get("/api/v1/todo/todolist");
  return extractData<Todo[]>(res);
};

export const createTodo = async (todoData: {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
}): Promise<Todo> => {
  const res = await axios.post("/api/v1/todo/create", todoData);
  return extractData<Todo>(res);
};

export const fetchSingleTodo = async (id: string): Promise<Todo> => {
  const res = await axios.get(`/api/v1/todo/single/${id}`);
  return extractData<Todo>(res);
};

export const updateTodo = async (
  id: string,
  updateData: Partial<{ 
    title: string; 
    description?: string; 
    priority: "low" | "medium" | "high"; 
    status: "completed" | "incomplete" | "pending"; 
  }>
): Promise<Todo> => {
  const res = await axios.patch(`/api/v1/todo/edit/${id}`, updateData);
  return extractData<Todo>(res);
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`/api/v1/todo/delete/${id}`);
};

export const fetchFilteredTodos = async (sort: string, value: string): Promise<Todo[]> => {
  const res = await axios.get(`/api/v1/todo/filter/criteria`, {
    params: { sort, value },
  });
  return extractData<Todo[]>(res);
};
