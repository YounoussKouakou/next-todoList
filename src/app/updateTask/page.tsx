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
    <form onSubmit={handleUpdate} className="flex flex-col mx-auto gap-2 max-w-lg">
      <h2 className="text-3xl font-bold">Modifier la tâche{taskId}</h2>
      <input
        className="border p-2 w-full"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="tâche"
      />
      <button className="rounded-lg p-3 bg-green-500/20 border-2 border-solid border-green-500/20 transition-colors hover:bg-green-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2" type="submit">
        Mettre à jour
      </button>
    </form>
  );
}
