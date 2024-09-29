'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export function SpotifyPlaylists() {
  const [isSubscriber] = useState(false);  // Odstraňte setIsSubscriber, pokud se nepoužívá

  if (!isSubscriber) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-card rounded-lg shadow-md">
        <Lock className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Prémiový obsah</h2>
        <p className="text-center text-muted-foreground">
          Playlisty jsou dostupné pouze pro odběratele. Staňte se odběratelem pro přístup k exkluzivnímu obsahu.
        </p>
        <Button onClick={() => alert('Zde by byl přesměrován na stránku s předplatným')}>
          Stát se odběratelem
        </Button>
      </div>
    )
  }

  // Zde by byl kód pro zobrazení playlistů pro odběratele
  return (
    <div>
      {/* Obsah playlistů pro odběratele */}
    </div>
  )
}