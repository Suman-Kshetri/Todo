export type Theme = "light" | "dark";

export type Todo = {
  _id: string;
  title: string;
  description?: string;
  status: "completed" | "incomplete" | "pending";
  priority: "low" | "medium" | "high";
  createdAt: string;
};

