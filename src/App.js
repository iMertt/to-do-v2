import React, { useContext, useState, useEffect } from "react";
import { TaskProvider, TaskContext } from "./contexts/TaskContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";

const AddTaskForm = () => {
  const { addTask, categories } = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    priority: "medium",
    categoryId: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    addTask({
      ...formData,
      completed: false,
      tags: tagsArray,
      dueDate: new Date(formData.dueDate),
    });

    setFormData({
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "medium",
      categoryId: "",
      tags: "",
    });
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-primary w-full group relative overflow-hidden backdrop-blur-md"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-conic from-primary-light via-transparent to-primary-light opacity-0 group-hover:opacity-20 transition-all duration-500"></span>
          <span className="absolute inset-0 w-full h-full bg-gradient-shine opacity-0 group-hover:opacity-30 animate-shimmer"></span>
          <span className="relative flex items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-300">
            <svg
              className="w-5 h-5 animate-float"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add New Task
          </span>
        </button>
      ) : (
        <div className="card border-t-4 border-t-primary-light dark:border-t-primary-dark backdrop-blur-md shadow-glow dark:shadow-glow-dark hover:shadow-neo hover:dark:shadow-neo-dark transition-all duration-500">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-primary-light dark:text-primary-dark animate-float"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            New Task
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input hover:shadow-glow dark:hover:shadow-glow-dark transition-all duration-300"
                required
                placeholder="Task title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input hover:shadow-glow dark:hover:shadow-glow-dark transition-all duration-300"
                rows="3"
                placeholder="Task description..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={
                    formData.dueDate instanceof Date
                      ? formData.dueDate.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                  className="input hover:shadow-glow dark:hover:shadow-glow-dark transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="input hover:shadow-glow dark:hover:shadow-glow-dark transition-all duration-300"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="input hover:shadow-glow dark:hover:shadow-glow-dark transition-all duration-300"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="input hover:shadow-glow dark:hover:shadow-glow-dark transition-all duration-300"
                  placeholder="e.g., urgent, meeting, project"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn-outline hover:shadow-glow dark:hover:shadow-glow-dark"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary hover:shadow-glow dark:hover:shadow-glow-dark"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const TaskList = () => {
  const {
    tasks,
    loading,
    error,
    toggleTaskCompletion,
    getCategoryById,
    deleteTask,
    startEditingTask,
    editingTask,
    cancelEditingTask,
    saveEditedTask,
  } = useContext(TaskContext);

  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (editingTask) {
      setEditForm(editingTask);
    }
  }, [editingTask]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-light dark:border-primary-dark shadow-glow dark:shadow-glow-dark"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-4 text-red-500 flex items-center gap-2 shadow-glow dark:shadow-glow-dark">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="card flex flex-col items-center justify-center p-8 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mb-4 animate-float"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No tasks yet.
          </p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">
            Use the button above to add a new task.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => {
            const category = getCategoryById(task.categoryId);

            if (editingTask?.id === task.id) {
              return (
                <li key={task.id} className="card">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveEditedTask(editForm);
                    }}
                  >
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        className="input w-full"
                      />
                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        className="input w-full"
                        rows="2"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={cancelEditingTask}
                          className="btn-outline"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </li>
              );
            }

            return (
              <li
                key={task.id}
                className="card group hover:shadow-glow dark:hover:shadow-glow-dark transition-all duration-500"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-conic from-primary-light/5 via-transparent to-primary-light/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
                <div className="relative flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      task.completed
                        ? "border-primary-light dark:border-primary-dark bg-primary-light dark:bg-primary-dark text-white"
                        : "border-gray-300 dark:border-gray-600 hover:border-primary-light dark:hover:border-primary-dark"
                    }`}
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    {task.completed && (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`font-medium text-lg ${
                        task.completed
                          ? "line-through text-gray-500 dark:text-gray-400"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {task.description}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <div className="flex items-center gap-1 text-gray-500">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>

                      {category && (
                        <span
                          className="px-2 py-1 rounded-full text-white shadow-sm"
                          style={{ backgroundColor: category.color }}
                        >
                          {category.name}
                        </span>
                      )}

                      <span
                        className={`px-2 py-1 rounded-full ${
                          task.priority === "high"
                            ? "priority-high"
                            : task.priority === "medium"
                            ? "priority-medium"
                            : "priority-low"
                        }`}
                      >
                        {task.priority === "high"
                          ? "High"
                          : task.priority === "medium"
                          ? "Medium"
                          : "Low"}
                      </span>

                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <span key={tag} className="tag">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    <button
                      onClick={() => startEditingTask(task)}
                      className="p-1 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 transition-colors duration-200"
                      title="Edit Task"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors duration-200"
                      title="Delete Task"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <TaskProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
              <Header />
              <AddTaskForm />
              <TaskList />
            </div>
          </div>
          <ToastContainer position="bottom-right" theme="colored" />
        </TaskProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
