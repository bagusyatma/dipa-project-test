import { routes } from '@/lib/constant/routes';
import { cn } from '@/lib/utils/helper';
import Link from 'next/link';
import ItemPokemon from './ItemPokemon';

export default function ListPokemon({ data }) {
  return (
    <div className={cn(['grid grid-cols-1 gap-4 md:grid-cols-3'])}>
      {data.map((item, index) => (
        <Link prefetch href={routes.detail(item.name)} key={`${item.name}-${index}`}>
          <ItemPokemon data={item} />
        </Link>
      ))}
    </div>
  );
}
