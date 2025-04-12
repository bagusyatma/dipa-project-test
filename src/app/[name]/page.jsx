'use client';

import DetailPokemon from '@/features/pokemon/components/DetailPokemon';
import { cn } from '@/lib/utils/helper';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { name } = params;

  return (
    <div className={cn(['flex flex-col gap-8'])}>
      <div className={cn(['flex items-center gap-4'])}>
        <ArrowLeft className={cn(['cursor-pointer hover:text-red-500'])} onClick={() => router.back()} />
        <h1 className={cn(['text-2xl font-bold capitalize'])}>Informasi Lengkap</h1>
      </div>

      <DetailPokemon name={name} />
    </div>
  );
}
