// Delete project button component

'use client';

import { deleteProjectAction } from '@/actions/projectActions';
import { useTransition } from 'react';

interface DeleteProjectButtonProps {
  projectId: number;
  projectName: string;
}

export default function DeleteProjectButton({ projectId, projectName }: DeleteProjectButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`"${projectName}" projesini silmek istediğinizden emin misiniz?`)) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('id', projectId.toString());
        await deleteProjectAction(formData);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-2 rounded text-sm transition-colors"
    >
      {isPending ? 'Siliniyor...' : 'Sil'}
    </button>
  );
}