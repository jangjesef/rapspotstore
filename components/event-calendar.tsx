'use client'

import { useState, useEffect } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Event {
  id: number;
  title: string;
  date: Date;
  description: string;
  link: string;
}

export function EventCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    // Simulace načítání dat z Facebook události
    const facebookEvent: Event = {
      id: 1,
      title: "Rapspot Live: Speciální epizoda",
      date: new Date("2023-07-01T19:00:00"),
      description: "Živé nahrávání speciální epizody Rapspot podcastu s hostem.",
      link: "https://www.facebook.com/events/1615671309046367?locale=cs_CZ"
    };

    // Přidání dalších událostí (můžete přidat více, pokud jsou k dispozici)
    const dummyEvents: Event[] = [
      { id: 2, title: "Hip Hop Kemp", date: new Date(2023, 7, 20), description: "Festival Hip Hop Kemp", link: "#" },
    ];

    setEvents([facebookEvent, ...dummyEvents]);
  }, []);

  const selectedDateEvents = events.filter(
    event => event.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Události</h2>
        {selectedDateEvents.length > 0 ? (
          <ul className="space-y-4">
            {selectedDateEvents.map(event => (
              <li key={event.id} className="bg-card rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                <p className="text-sm mb-2">
                  {event.date.toLocaleString('cs-CZ', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href={event.link} target="_blank" rel="noopener noreferrer">
                    Více informací <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Žádné události pro vybrané datum.</p>
        )}
      </div>
    </div>
  );
}