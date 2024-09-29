'use client'

import { ReactNode } from 'react'
import Image from 'next/image' // Přidán import pro Image
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div className="relative w-full h-full" style={{ height: '100px' }}>
          <Image
            src="/Rapspot final.svg"
            alt="Rapspot Logo"
            fill
            style={{ 
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />
        </div>
        <nav className="flex space-x-4">
          <Link href="/blog" className="text-foreground hover:text-primary">Blog</Link>
          <Link href="/podcast" className="text-foreground hover:text-primary">Podcast</Link>
          <Link href="/events" className="text-foreground hover:text-primary">Události</Link>
          <Link href="/playlists" className="text-foreground hover:text-primary">Playlisty</Link>
          <ThemeToggle />
        </nav>
      </header>
      <main>{children}</main>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        © 2023 Rapspot. Všechna práva vyhrazena.
      </footer>
    </div>
  )
}