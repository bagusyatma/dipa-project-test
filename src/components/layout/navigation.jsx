'use client';

import { menus } from '@/lib/constant/menus';
import { cn } from '@/lib/utils/helper';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  const isActive = path => pathname === path;

  return (
    <section className={cn(['fixed right-0 bottom-2 left-0 bg-transparent md:hidden'])}>
      <div className={cn(['mx-auto flex w-fit items-center justify-between rounded-full bg-white px-4 py-2 shadow'])}>
        <div className={cn(['flex items-center gap-2'])}>
          {menus.map(menu => (
            <div className={cn(['relative'])} key={menu.href}>
              <Link href={menu.href}>
                <button className={cn(['flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-red-100'])}>
                  {menu.icon} {menu.label}
                </button>
              </Link>

              <div className={cn(['absolute bottom-0 flex h-1 w-full items-center justify-center', !isActive(menu.href) && 'hidden'])}>
                <div className={cn(['h-0.5 w-4 rounded-full bg-red-500'])} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
