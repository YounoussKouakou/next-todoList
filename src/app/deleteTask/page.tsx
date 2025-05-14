'use client';
import { useRouter } from 'next/navigation';

export default function DeleteTask() {
  const router = useRouter();

  const handleDelete = () => {
    router.push('/Task');
  };

  return (
   <main
        className={`min-h-screen flex items-center justify-center  p-0`}
      >
        <div
          className={`w-full max-w-2xl  rounded-2xl shadow-2xl mx-auto p-12 flex flex-row gap-12 items-center mt-16 animate-fade-in-up`}
        >
          <div className="flex-1">
            <h1
              className={`text-2xl font-mono font-bold mb-4  animate-fade-in`}
            >
              Confirmation de suppression
            </h1>
            <p className="mb-6 text-base text-gray-400">
              Voulez-vous vraiment supprimer la tâche&nbsp;?
            </p>
            <div className="mb-6 font-medium text-green-400"></div>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-none font-medium"
              onClick={() => router.push('/Task')}
            >
              Non
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-none font-semibold shadow"
              onClick={handleDelete}
            >
              Oui
            </button>
          </div>
        </div>
      </main>
  );
}
