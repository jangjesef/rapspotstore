'use client'

import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

interface Event {
  id: number;
  title: string;
  date: Date;
  link: string;
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Simulace načítání dat
    const dummyEvents: Event[] = [
      { id: 1, title: "Rapspot Live: Speciální epizoda", date: new Date("2023-07-01T19:00:00"), link: "https://www.facebook.com/events/1615671309046367" },
      { id: 2, title: "Hip Hop Kemp", date: new Date(2023, 7, 20), link: "#" },
    ];

    setEvents(dummyEvents);
  }, []);

  return (
    <ul className="space-y-4">
      {events.map(event => (
        <li key={event.id} className="flex items-start space-x-2">
          <Calendar className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <Link href={event.link} className="font-medium hover:underline">
              {event.title}
            </Link>
            <p className="text-sm text-muted-foreground">
              {event.date.toLocaleDateString('cs-CZ', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}