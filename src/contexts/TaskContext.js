import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const TaskContext = createContext();

// Sample categories
const sampleCategories = [
  { id: "1", name: "Work", color: "#4F46E5" },
  { id: "2", name: "Personal", color: "#F59E0B" },
  { id: "3", name: "Shopping", color: "#10B981" },
  { id: "4", name: "Health", color: "#EF4444" },
  { id: "5", name: "Education", color: "#8B5CF6" },
];

// Sample tasks
const sampleTasks = [
  {
    id: "1",
    title: "Prepare API Documentation",
    description: "Create documentation for new API endpoints",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    priority: "high",
    categoryId: "1",
    tags: ["documentation", "backend"],
    assignedTo: null,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Gym Session",
    description: "Weekly fitness training",
    completed: true,
    dueDate: new Date(),
    priority: "medium",
    categoryId: "4",
    tags: ["fitness", "health"],
    assignedTo: null,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: "3",
    title: "Grocery Shopping",
    description: "Do weekly grocery shopping",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    priority: "low",
    categoryId: "3",
    tags: ["grocery", "food"],
    assignedTo: null,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: "4",
    title: "React Course Videos",
    description: "Watch educational videos about React hooks",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 4)),
    priority: "medium",
    categoryId: "5",
    tags: ["react", "education", "programming"],
    assignedTo: null,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: "5",
    title: "Project Meeting",
    description: "Team meeting for new project",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    priority: "high",
    categoryId: "1",
    tags: ["meeting", "project"],
    assignedTo: null,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)),
  },
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priority: "",
    completed: "",
    date: null,
    tags: [],
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // In a real app, this would be an API call
    // Simulating API call with setTimeout
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Load from localStorage if available
        const savedTasks = localStorage.getItem("tasks");
        const savedCategories = localStorage.getItem("categories");

        if (savedTasks && savedCategories) {
          setTasks(JSON.parse(savedTasks));
          setCategories(JSON.parse(savedCategories));
        } else {
          setTasks(sampleTasks);
          setCategories(sampleCategories);
        }

        setError(null);
      } catch (err) {
        setError("Failed to load tasks");
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success("Task added successfully");
  };

  const updateTask = (id, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
    toast.success("Task updated successfully");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully");
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addCategory = (category) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };

    setCategories((prevCategories) => [...prevCategories, newCategory]);
    toast.success("Category added successfully");
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      )
    );
    toast.success("Category updated successfully");
  };

  const deleteCategory = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id)
    );
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.categoryId === id ? { ...task, categoryId: null } : task
      )
    );
    toast.success("Category deleted successfully");
  };

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      if (
        filters.search &&
        !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !task.description.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (filters.category && task.categoryId !== filters.category) {
        return false;
      }

      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }

      if (
        filters.completed !== "" &&
        task.completed !== (filters.completed === "true")
      ) {
        return false;
      }

      if (
        filters.date &&
        new Date(task.dueDate).toDateString() !==
          new Date(filters.date).toDateString()
      ) {
        return false;
      }

      if (
        filters.tags.length > 0 &&
        !filters.tags.some((tag) => task.tags.includes(tag))
      ) {
        return false;
      }

      return true;
    });
  };

  const getTasksByDate = (date) => {
    const dateString = new Date(date).toDateString();
    return tasks.filter(
      (task) => new Date(task.dueDate).toDateString() === dateString
    );
  };

  const getCategoryById = (id) => {
    return categories.find((category) => category.id === id) || null;
  };

  const reorderTasks = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const startEditingTask = (task) => {
    setEditingTask(task);
  };

  const cancelEditingTask = () => {
    setEditingTask(null);
  };

  const saveEditedTask = (editedTask) => {
    updateTask(editedTask.id, editedTask);
    setEditingTask(null);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        loading,
        error,
        filters,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        addCategory,
        updateCategory,
        deleteCategory,
        updateFilters,
        getFilteredTasks,
        getTasksByDate,
        getCategoryById,
        reorderTasks,
        editingTask,
        startEditingTask,
        cancelEditingTask,
        saveEditedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
