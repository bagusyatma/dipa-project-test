import Pokeball from '@/assets/images/pokeball.png';
import { menus } from '@/lib/constant/menus';
import { cn } from '@/lib/utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isActive = path => pathname === path;

  return (
    <header className={cn(['h-16 bg-white shadow'])}>
      <div className={cn(['mx-auto flex h-full max-w-6xl items-center justify-between px-4 xl:max-w-7xl'])}>
        <div className={cn(['flex items-center gap-2'])}>
          <Image src={Pokeball} alt="logo" className={cn(['size-6'])} />
          <h1 className={cn(['text-xl font-bold text-gray-800'])}>Tada: Tangkap Dia!</h1>
        </div>
        <div className={cn(['hidden items-center gap-2 md:flex'])}>
          {menus.map(menu => (
            <div className={cn(['relative'])} key={menu.href}>
              <Link href={menu.href}>
                <button className={cn(['flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-red-100'])}>
                  {menu.icon} {menu.label}
                </button>
              </Link>
              <div className={cn(['absolute bottom-0 flex h-1 w-full items-center justify-center', !isActive(menu.href) && 'hidden'])}>
                <div className={cn(['h-0.5 w-full rounded-full bg-red-500'])} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
