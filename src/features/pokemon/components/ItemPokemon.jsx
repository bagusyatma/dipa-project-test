'use client';

import { axiosInstance } from '@/lib/config/axios';
import { cn } from '@/lib/utils/helper';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

export default function ItemPokemon({ data, isHome, isCatch }) {
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ['pokemon', data.name],
    queryFn: () => axiosInstance.get(data.url),
  });

  return (
    <div
      className={cn([
        'flex h-full cursor-pointer items-start justify-between rounded-lg p-4 shadow transition-all duration-300 hover:scale-105 hover:shadow-lg',
        isHome && isCatch ? 'bg-green-100' : 'bg-white',
      ])}
    >
      {isLoading || !pokemon ? (
        <React.Fragment>
          <div className={cn(['flex h-full flex-col justify-between'])}>
            <div className={cn(['h-12 w-16 animate-pulse rounded bg-gray-200'])} />
            <div className={cn(['h-8 w-24 animate-pulse rounded bg-gray-200'])} />
          </div>
          <div className={cn(['relative flex size-24 items-center justify-center overflow-hidden'])}>
            <div className={cn(['size-24 animate-pulse rounded-full bg-gray-200'])} />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={cn(['flex h-full flex-col justify-between'])}>
            <h1 className={cn(['text-5xl font-bold text-gray-500 md:text-4xl lg:text-5xl'])}>{pokemon?.data?.id}</h1>
            <h2 className={cn(['text-2xl font-bold capitalize md:text-xl lg:text-2xl'])}>{pokemon?.data?.name}</h2>
          </div>
          <div className={cn(['relative flex size-24 items-center justify-center overflow-hidden'])}>
            {pokemon?.data?.sprites?.other?.dream_world?.front_default ? (
              <Image
                src={pokemon.data.sprites.other.dream_world.front_default}
                alt={pokemon.data.name}
                width={96}
                height={96}
                className={cn(['size-24'])}
                loading="lazy"
              />
            ) : null}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
