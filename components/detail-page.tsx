'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Calendar, User } from "lucide-react"
import { AudioPlayer } from "@/components/audio-player"
import Link from 'next/link'

interface DetailPageProps {
  data: {
    type: string;
    title: string;
    content: string;
    date: string;
    audioSrc?: string;
    author?: string;
  };
}

interface Event {
  id: number;
  title: string;
  date: Date;
}

export function DetailPage({ data }: DetailPageProps) {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Simulace načítání nadcházejících událostí
    const events: Event[] = [
      { id: 1, title: "Rapspot Live s Toxxxem", date: new Date("2023-07-15T19:00:00") },
      { id: 2, title: "Hip Hop Kemp", date: new Date("2023-08-20") },
    ];
    setUpcomingEvents(events);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <main className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(data.date).toLocaleDateString('cs-CZ')}
            {data.author && (
              <>
                <span className="mx-2">|</span>
                <User className="mr-2 h-4 w-4" />
                {data.author}
              </>
            )}
          </div>
          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: data.content }} />
          {data.type === 'podcast' && data.audioSrc && (
            <AudioPlayer
              src={data.audioSrc}
              title={data.title}
              isPlaying={isPlaying}
              onPlayPause={setIsPlaying}
            />
          )}
        </main>
        <aside className="md:w-1/3">
          <div className="bg-card rounded-lg p-6 shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Nadcházející události</h2>
            <ul className="space-y-4">
              {upcomingEvents.map(event => (
                <li key={event.id} className="border-b pb-2">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {event.date.toLocaleDateString('cs-CZ')}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/" passHref>
            <Button variant="outline" className="w-full">
              Zpět na hlavní stránku
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}