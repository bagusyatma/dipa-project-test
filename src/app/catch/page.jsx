'use client';

import Button from '@/components/ui/button';
import ListPokemon from '@/features/pokemon/components/ListPokemon';
import { routes } from '@/lib/constant/routes';
import { useLocalStorage } from '@/lib/hooks/useStorage';
import { cn } from '@/lib/utils/helper';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  const [pokemon] = useLocalStorage('pokemon', []);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(['flex flex-col gap-4'])}>
      <h1 className={cn(['text-2xl font-bold'])}>Koleksi Pokémon anda</h1>

      {isLoading ? (
        <div>Sedang memuat...</div>
      ) : typeof window !== 'undefined' && pokemon?.length > 0 ? (
        <ListPokemon data={pokemon} pokemon={pokemon} />
      ) : (
        <div className={cn(['flex flex-col gap-4'])}>
          <div>
            <div>Anda belum menangkap Pokémon!</div>
            <div>Ayo tangkap dan kumpulkan sebanyaknya!</div>
          </div>
          <Link href={routes.home} prefetch>
            <Button size="sm" variant="primary-outline" className={cn(['flex w-fit items-center gap-2'])}>
              Gass <span className="text-lg">🚀</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
