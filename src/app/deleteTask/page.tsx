'use client';
import { useRouter } from 'next/navigation';

export default function DeleteTask() {
  const router = useRouter();

  const handleDelete = () => {
    alert('Tâche supprimée');
    router.push('/Task');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl">Confirmer la suppression ?</h2>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">Confirmer</button>
    </div>
  );
}
