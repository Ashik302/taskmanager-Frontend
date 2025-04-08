import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaTrashAlt, FaCalendarAlt, FaRegEdit, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface TaskFormData {
  title: string;
  description: string;
  category: string;
  dueDate: string;
}

interface Task extends TaskFormData {
  id: string;
  createdAt: string;
}

const Dashboard = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterType, setFilterType] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [forceRender, setForceRender] = useState(false); // used for reload
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No token found');
          navigate('/login');
          return;
        }
        
        const response = await axios.get(`https://taskmanager-backend-production-7a27.up.railway.app/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err: any) {
        setError('Failed to fetch tasks. Please try again.');
        console.error('Fetch tasks error:', err);
      }
    };
    
    fetchTasks();
  }, [forceRender]);
  
  // window.location.reload();
  useEffect(() => {
    // Simulate force refresh
    setTimeout(() => setForceRender(true), 100);
  }, []);
  


  const calculateCountdown = (dueDate: string) => {
    const now = new Date().getTime();
    const due = new Date(dueDate).getTime();
    const distance = due - now;

    if (distance <= 0) return 'Expired';

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  const onSubmit = async (data: TaskFormData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const newTask = {
        title: data.title,
        description: data.description,
        category: data.category,
        createdTime: new Date().toISOString(),
        dueDate: new Date(data.dueDate).toISOString(),
      };

      const response = await axios.post(`https://taskmanager-backend-production-7a27.up.railway.app/api/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prev) => [...prev, response.data]);
      reset();
      setFormVisible(false);
    } catch (err: any) {
      setError('Failed to add task. Please try again.');
      console.error('Add task error:', err);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      await axios.delete(`https://taskmanager-backend-production-7a27.up.railway.app/api/tasks/delete/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err: any) {
      setError('Failed to delete task. Please try again.');
      console.error('Delete task error:', err);
    }
  };

  const sortTasks = (tasks: Task[], filter: string) => {
    if (filter === 'createdAt') {
      return [...tasks].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (filter === 'dueDate') {
      return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }
    return tasks;
  };

  const filteredTasks = sortTasks(
    tasks.filter(task => categoryFilter ? task.category === categoryFilter : true),
    filterType
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6 font-sans overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-indigo-700 drop-shadow-sm">Dashboard</h1>

      </div>

      <div className="max-w-full mx-auto space-y-10">

        {/* Add Task Toggle Button */}
        <div className="text-center">
          <button
            onClick={() => setFormVisible((prev) => !prev)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            {isFormVisible ? 'Close Task Form' : 'Add Task'}
          </button>
        </div>

        {/* Task Form */}
        {isFormVisible && (
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-semibold">Title</label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-semibold">Description</label>
                  <input
                    {...register("description", { required: "Description is required" })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-semibold">Category</label>
                  <select
                    {...register("category", { required: "Category is required" })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Category</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Car">Car</option>
                    <option value="Lease">Lease</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-semibold">Due Date</label>
                  <input
                    type="date"
                    {...register("dueDate", { required: "Due date is required" })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-bold"
              >
                Add Task
              </button>
            </form>
          </div>
        )}

        {/* Filter Section */}
        <div className="bg-white w-full p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-indigo-700">Filter Tasks</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full sm:w-1/2 p-2 border rounded"
            >
              <option value="">No Filter</option>
              <option value="createdAt">Sort by Created Date</option>
              <option value="dueDate">Sort by Due Date</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-1/2 p-2 border rounded"
            >
              <option value="">All Categories</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Car">Car</option>
              <option value="Lease">Lease</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4 text-center sm:text-left">Your Tasks</h2>
            <ul className="space-y-4">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 bg-gray-100 rounded-lg hover:shadow transition"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-base sm:text-lg text-indigo-700 font-semibold break-words">
                      <FaRegEdit />
                      <span>{task.title}</span>
                    </div>
                    <div className="text-sm text-gray-600 break-words">{task.description}</div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
                      <FaCalendarAlt className="text-indigo-500" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      <span className="text-red-500 italic">({calculateCountdown(task.dueDate)})</span>
                    </div>
                  </div>
                  <div className="self-end sm:self-auto">
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md w-full sm:w-auto"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
