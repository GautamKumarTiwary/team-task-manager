import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, Clock } from 'lucide-react';

const MemberDashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('http://localhost:5000/api/tasks/user', config);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/status`, { status: newStatus }, config);
      fetchTasks();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">My Tasks</p>
            <p className="text-2xl font-semibold text-slate-900">{tasks.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg text-green-600">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Completed Tasks</p>
            <p className="text-2xl font-semibold text-slate-900">{tasks.filter(t => t.status === 'Completed').length}</p>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">My Assigned Tasks</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {tasks.length === 0 ? (
            <div className="p-6 text-center text-slate-500">No tasks assigned to you yet.</div>
          ) : (
            tasks.map(task => (
              <div key={task._id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-md font-semibold text-slate-900">{task.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{task.description}</p>
                  <p className="text-xs font-medium text-indigo-600 mt-2">Project: {task.project?.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    className={`text-sm font-medium rounded-full px-3 py-1 border-0 ring-1 ring-inset ${
                      task.status === 'Completed' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                      task.status === 'In Progress' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' :
                      'bg-slate-50 text-slate-700 ring-slate-600/20'
                    }`}
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
