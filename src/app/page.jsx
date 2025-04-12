'use client';

import Button from '@/components/ui/button';
import ListPokemon from '@/features/pokemon/components/ListPokemon';
import { pokemonServices } from '@/features/pokemon/pokemon.services';
import { useLocalStorage } from '@/lib/hooks/useStorage';
import { cn } from '@/lib/utils/helper';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function Home() {
  const limit = 15;
  const { getList } = pokemonServices();
  const [pokemon] = useLocalStorage('pokemon', []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getList(pageParam, limit);
      return response?.results;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * limit;
      return lastPage.next !== null ? nextOffset : undefined;
    },
  });

  return (
    <div className={cn(['flex flex-col gap-4'])}>
      <h1 className={cn(['text-2xl font-bold'])}>Cari Pokémon</h1>
      {isLoading && <div>Sedang memuat...</div>}
      {!isLoading && <ListPokemon data={data?.pages.flatMap(page => page)} pokemon={pokemon} />}

      <div className={cn(['flex justify-center'])}>
        {hasNextPage && !isFetchingNextPage && (
          <Button onClick={fetchNextPage} className={cn(['w-fit'])}>
            Lihat Lebih Banyak
          </Button>
        )}

        {isFetchingNextPage && (
          <div className={cn(['flex items-center justify-center'])}>
            <div>Sedang memuat...</div>
          </div>
        )}
      </div>
    </div>
  );
}
