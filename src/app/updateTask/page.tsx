'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function UpdateTask() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get('id');
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [Status, setStatus] = useState('');

  useEffect(() => {
    if (taskId) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const task = storedTasks.find((t: any) => String(t.id) === taskId);
      if (task) {
        setTitle(task.title);
        setStatus(task.Status);
      }
    }
  }, [taskId]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.map((task: any) =>
      String(task.id) === taskId
        ? { ...task, title, Status }
        : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    router.push('/Task');
  };

  return (
    <form onSubmit={handleUpdate} className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Modifier la tâche #{taskId}</h2>
      <input
        className="border p-2 w-full"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="tâche"
      />
      <textarea
        className="border p-2 w-full"
        value={Status}
        onChange={e => setStatus(e.target.value)}
        placeholder="Status"
      />
      <button className="bg-yellow-500 text-white px-4 py-2 rounded" type="submit">
        Mettre à jour
      </button>
    </form>
  );
}
