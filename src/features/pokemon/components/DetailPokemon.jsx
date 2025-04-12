import Button from '@/components/ui/button';
import { useLocalStorage } from '@/lib/hooks/useStorage';
import { cn } from '@/lib/utils/helper';
import { useQuery } from '@tanstack/react-query';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { pokemonServices } from '../pokemon.services';

const BASE_API = process.env.NEXT_PUBLIC_API_URL;
export default function DetailPokemon({ name }) {
  const { getDetail } = pokemonServices();
  const [pokemon, setPokemon] = useLocalStorage('pokemon', []);

  console.log(pokemon);

  const { data, isLoading } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => getDetail(name),
  });

  const handleCatch = name => {
    if (name) setPokemon([...pokemon, { name, url: `${BASE_API}/pokemon/${name}` }]);
  };

  const handleRelease = name => {
    let currentPokemon = [...pokemon];

    if (name) {
      currentPokemon = currentPokemon.filter(item => item.name !== name);
      setPokemon(currentPokemon);
    }
  };

  const check = name => {
    for (let index = 0; index < pokemon.length; index++) {
      if (pokemon[index].name === name) {
        return true;
      }
    }

    return false;
  };

  if (!data?.id || isLoading) return <div>Sedang memuat...</div>;

  return (
    <div className={cn(['flex w-full flex-col items-center gap-8 lg:flex-row'])}>
      <div className={cn(['size-72'])}>
        {data?.sprites?.other?.dream_world?.front_default && (
          <Image
            src={data?.sprites?.other?.dream_world?.front_default}
            alt={data?.name}
            width={100}
            height={100}
            className={cn(['size-full'])}
          />
        )}
      </div>

      <div className={cn(['flex w-full flex-col gap-4 lg:w-1/2'])}>
        <div className={cn(['flex flex-col'])}>
          <h2 className={cn(['text-3xl font-bold capitalize'])}>{data?.name}</h2>
        </div>

        <div className={cn(['flex flex-col', data?.abilities?.length > 0 ? 'block' : 'hidden'])}>
          <h2 className={cn(['text-lg font-bold'])}>Abilities</h2>
          <div className={cn(['flex items-center gap-2'])}>
            {data?.abilities?.map(ability => (
              <div key={ability.ability.name} className={cn(['flex items-center gap-2 rounded bg-red-50 px-2 py-1'])}>
                <span className={cn(['text-sm capitalize'])}>{ability.ability.name}</span>
              </div>
            )) || null}
          </div>
        </div>

        <div className={cn(['flex w-full flex-col', data?.stats?.length > 0 ? 'block' : 'hidden'])}>
          <h2 className={cn(['text-lg font-bold'])}>Stats</h2>
          <div className="mt-2 grid grid-cols-1 gap-x-8 lg:grid-cols-2">
            {data?.stats?.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-sm capitalize">{stat.stat.name.replace(/-/g, ' ')}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-red-500" style={{ width: `${(stat.base_stat / 255) * 100}%` }} />
                  </div>
                  <span className="text-right">{stat.base_stat}</span>
                </div>
              </div>
            )) || null}
          </div>
        </div>

        <div className="flex gap-8">
          <div className={cn(['flex flex-col', data?.height ? 'block' : 'hidden'])}>
            <h2 className={cn(['text-lg font-bold'])}>Height</h2>
            <p className={cn(['text-sm'])}>{data?.height / 10} m</p>
          </div>
          <div className={cn(['flex flex-col', data?.weight ? 'block' : 'hidden'])}>
            <h2 className={cn(['text-lg font-bold'])}>Weight</h2>
            <p className={cn(['text-sm'])}>{data?.weight / 10} kg</p>
          </div>
        </div>

        <div className={cn(['flex flex-col', data?.id ? 'block' : 'hidden'])}>
          <Button
            className={cn(['flex w-fit items-center gap-2', check(data?.name) && 'hidden'])}
            size="sm"
            onClick={() => handleCatch(data?.name)}
          >
            <Plus />
            <span>Tambah ke Koleksi</span>
          </Button>
          <Button
            variant="secondary"
            className={cn(['flex w-fit items-center gap-2', !check(data?.name) && 'hidden'])}
            size="sm"
            onClick={() => handleRelease(data?.name)}
          >
            <Minus />
            <span>Hapus dari Koleksi</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
