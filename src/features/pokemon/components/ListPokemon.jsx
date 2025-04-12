'use client';

import { routes } from '@/lib/constant/routes';
import { cn } from '@/lib/utils/helper';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ItemPokemon from './ItemPokemon';

export default function ListPokemon({ data, pokemon = [] }) {
  const pathname = usePathname();
  const isHome = pathname === routes.home;
  const pokemonCatch = pokemon.map(item => item.name);
  return (
    <div className={cn(['grid grid-cols-1 gap-4 md:grid-cols-3'])}>
      {data.map((item, index) => (
        <Link prefetch href={routes.detail(item.name)} key={`${item.name}-${index}`}>
          <ItemPokemon data={item} isHome={isHome} isCatch={pokemonCatch.includes(item.name)} />
        </Link>
      ))}
    </div>
  );
}
