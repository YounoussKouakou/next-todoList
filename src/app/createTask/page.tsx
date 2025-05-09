'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      status,
    };

    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    router.push('/Task');
  };

  return (
    <div className="mt-10 p-10 border-2 border-solid border-gray-300 rounded-lg shadow-md bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col mx-auto gap-4 max-w-lg">
        <h1 className="text-3xl font-bold">Créer une tâche</h1>

        <input
          type="text"
          placeholder="Tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded font-semibold text-lg"
          required
        />

        <button
          type="submit"
          className="rounded-lg p-3 bg-green-500/20 border-2 border-solid border-green-500/20 transition-colors hover:bg-green-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
