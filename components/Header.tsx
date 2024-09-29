import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-background shadow mb-8">
      <div className="relative w-[150px] h-[50px]">
        <Image
          src="/Rapspot final.svg"
          alt="Rapspot Logo"
          fill
          className="object-contain object-center dark:invert"
          priority
        />
      </div>
      <nav className="flex space-x-4">
        <Link href="/" className="text-foreground hover:text-primary">Domů</Link>
        <Link href="/blog" className="text-foreground hover:text-primary">Blog</Link>
        <Link href="/podcast" className="text-foreground hover:text-primary">Podcast</Link>
        <Link href="/events" className="text-foreground hover:text-primary">Události</Link>
        <Link href="/playlists" className="text-foreground hover:text-primary">Playlisty</Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}