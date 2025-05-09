'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export default function TodoTask() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const tasksWithStatus = storedTasks.map((task: any) => ({
      ...task,
      status: task.status || 'En cours',
    }));
    setTasks(tasksWithStatus);
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Es-tu sûr de vouloir supprimer cette tâche ?');
    if (!confirmDelete) return;

    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
    alert('Tâche supprimée avec succès.');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Liste des Tâches</h1>

      <div className="mb-4 text-right">
        <Link
          href="/createTask"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Ajouter une tâche
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Tâche</th>
              <th className="py-3 px-6 text-left">Statut</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-t">
                <td className="py-3 px-6 text-left">{task.title}</td>
                <td className="py-3 px-6 text-left">
                  <span className={task.status === 'Terminée' ? 'text-green-600 font-semibold' : 'text-yellow-600'}>
                    {task.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left space-x-2">
                  <Link
                    href={`/updateTask?id=${task.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Éditer
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">Aucune tâche disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
