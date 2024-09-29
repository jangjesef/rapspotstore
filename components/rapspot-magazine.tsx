'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Filter, Calendar as CalendarIcon, Newspaper, Music, Mic, Info, Instagram } from "lucide-react"
import Image from "next/legacy/image"
import Link from 'next/link'
import { ThemeToggle } from "@/components/theme-toggle"
import { PodcastEpisodes } from "@/components/podcast-episodes"
import { AudioPlayer } from "@/components/audio-player"
import { EventCalendar } from "@/components/event-calendar"
import { BlogPosts } from "@/components/blog-posts"
import { SpotifyPlaylists } from "@/components/spotify-playlists"

const categories = ["Vše", "Novinky", "Rozhovory", "Recenze"];

export function RapspotMagazine() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Vše');
  const [currentEpisode, setCurrentEpisode] = useState<{src: string, title: string} | null>(null);
  const [podcastImage, setPodcastImage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('podcast');

  useEffect(() => {
    // Fetch podcast info to get the image
    fetch('https://itunes.apple.com/search?term=rapspot&entity=podcast')
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setPodcastImage(data.results[0].artworkUrl600);
        }
      })
      .catch(err => console.error('Error fetching podcast info:', err));
  }, []);

  const handleSearch = () => {
    console.log('Vyhledávání:', searchTerm);
  };

  const handlePlayEpisode = (episode: { src: string; title: string }) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  };

  const handlePlayPause = (playing: boolean) => {
    setIsPlaying(playing);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Rapspot</h1>
          <ThemeToggle />
        </div>
        <nav className="flex space-x-4 mb-4">
          <Button variant={activeTab === 'podcast' ? 'default' : 'outline'} onClick={() => setActiveTab('podcast')}>
            <Mic className="mr-2 h-4 w-4" /> Podcast
          </Button>
          <Button variant={activeTab === 'calendar' ? 'default' : 'outline'} onClick={() => setActiveTab('calendar')}>
            <CalendarIcon className="mr-2 h-4 w-4" /> Kalendář
          </Button>
          <Button variant={activeTab === 'blog' ? 'default' : 'outline'} onClick={() => setActiveTab('blog')}>
            <Newspaper className="mr-2 h-4 w-4" /> Blog
          </Button>
          <Button variant={activeTab === 'playlists' ? 'default' : 'outline'} onClick={() => setActiveTab('playlists')}>
            <Music className="mr-2 h-4 w-4" /> Playlisty
          </Button>
        </nav>
      </header>

      <main className="flex-grow flex flex-col md:flex-row gap-8">
        {activeTab === 'podcast' && (
          <>
            <div className="md:w-2/3">
              <div className="flex flex-wrap gap-4 mb-6">
                <Input 
                  placeholder="Hledat epizody..." 
                  className="w-full md:w-64" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Vyberte kategorii" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleSearch}>
                  <Filter className="mr-2 h-4 w-4" /> Filtrovat
                </Button>
              </div>
              <PodcastEpisodes onPlayEpisode={handlePlayEpisode} />
            </div>
            <aside className="md:w-1/3">
              <div className="bg-card rounded-lg p-6 shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4">O podcastu</h3>
                {podcastImage && (
                  <Image
                    src={podcastImage}
                    alt="Rapspot podcast"
                    width={400}
                    height={400}
                    layout="responsive"
                    className="rounded-md mb-4"
                  />
                )}
                <p className="text-sm text-muted-foreground mb-4">
                  Rapspot je český podcast moderovaný Karlem Veselým a Lubomírem Dítětem (Děcko). Zaměřují se na historii, současnost a budoucnost českého rapu, rozebírají aktuální novinky, trendy, alba a singly.
                </p>
                <Button variant="outline" className="w-full" onClick={() => alert('Více informací o podcastu')}>
                  <Info className="mr-2 h-4 w-4" /> Více informací
                </Button>
              </div>
            </aside>
          </>
        )}
        {activeTab === 'calendar' && <EventCalendar />}
        {activeTab === 'blog' && <BlogPosts />}
        {activeTab === 'playlists' && <SpotifyPlaylists />}
      </main>

      <footer className="mt-12 py-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2023 Rapspot. Všechna práva vyhrazena.
          </p>
          <div className="flex space-x-4">
            <Link href="https://www.instagram.com/rapspot_cz/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <Instagram className="mr-2 h-4 w-4" /> Instagram
              </Button>
            </Link>
            <Link href="https://soundcloud.com/rapspot-podcast" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <Music className="mr-2 h-4 w-4" /> SoundCloud
              </Button>
            </Link>
            <Link href="https://herohero.co/rapspot" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                Hero Hero
              </Button>
            </Link>
          </div>
        </div>
      </footer>

      {currentEpisode && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
          <AudioPlayer 
            src={currentEpisode.src} 
            title={currentEpisode.title} 
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
          />
        </div>
      )}
    </div>
  );
}