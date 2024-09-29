'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, ChevronUp, Play, Apple } from "lucide-react"
import Image from "next/legacy/image"
import Link from 'next/link'

interface Episode {
  trackId: number;
  trackName: string;
  releaseDate: string;
  description: string;
  episodeUrl: string;
  artworkUrl600: string;
  collectionViewUrl?: string; // Přidáno jako volitelné pole
}

interface PodcastEpisodesProps {
  onPlayEpisode: (episode: { src: string; title: string }) => void;
}

export function PodcastEpisodes({ onPlayEpisode }: PodcastEpisodesProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedEpisodes, setExpandedEpisodes] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const descriptionRefs = useRef<{ [key: number]: HTMLParagraphElement | null }>({});

  const fetchEpisodes = async (pageNum: number) => {
    try {
      const response = await fetch('https://itunes.apple.com/search?term=rapspot&entity=podcast');
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const podcastId = data.results[0].collectionId;
        const episodesResponse = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode&limit=10&offset=${(pageNum - 1) * 10}`);
        const episodesData = await episodesResponse.json();
        const newEpisodes = episodesData.results.slice(1).map((episode: Episode) => ({
          trackId: episode.trackId,
          trackName: episode.trackName,
          releaseDate: episode.releaseDate,
          description: episode.description,
          episodeUrl: episode.episodeUrl,
          artworkUrl600: episode.artworkUrl600,
          applePodcastsUrl: episode.collectionViewUrl || '', // Použijeme collectionViewUrl, pokud existuje
          spotifyUrl: "https://open.spotify.com/show/2OeUOMt6CLg578FZy6m2VC?si=3d6dc313e3bc4814",
          heroHeroUrl: "https://herohero.co/rapspot",
        }));
        setEpisodes(prev => [...prev, ...newEpisodes]);
        setHasMore(newEpisodes.length === 10);
      } else {
        throw new Error('Podcast not found');
      }
    } catch (err) {
      console.error('Error fetching podcast data:', err);
      setError('Nepodařilo se načíst epizody podcastu. Zkuste to prosím později.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes(page);
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleEpisodeExpansion = (trackId: number) => {
    setExpandedEpisodes(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const isDescriptionOverflowing = (trackId: number) => {
    const element = descriptionRefs.current[trackId];
    if (element) {
      return element.scrollHeight > element.clientHeight;
    }
    return false;
  };

  const handlePlay = (episode: Episode) => {
    onPlayEpisode({ src: episode.episodeUrl, title: episode.trackName });
  };

  if (loading && episodes.length === 0) return <div className="text-center py-8">Načítání epizod...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="space-y-8">
      {episodes.map((episode, index) => {
        const isExpanded = expandedEpisodes.includes(episode.trackId);
        return (
          <div key={`${episode.trackId}-${index}`} className="bg-card rounded-lg p-6 shadow-md">
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-[120px] h-[120px] flex-shrink-0 relative">
                <Image
                  src={episode.artworkUrl600}
                  alt={episode.trackName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold">{episode.trackName}</h2>
                  <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                    <Calendar className="inline mr-1 h-4 w-4" />
                    {new Date(episode.releaseDate).toLocaleDateString('cs-CZ')}
                  </span>
                </div>
                <div 
                  className={`mb-2 ${isExpanded ? '' : 'line-clamp-3'}`}
                  ref={(el) => { if (el) descriptionRefs.current[episode.trackId] = el }}
                >
                  <p className="text-sm text-muted-foreground">{episode.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  {isDescriptionOverflowing(episode.trackId) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleEpisodeExpansion(episode.trackId)}
                    >
                      {isExpanded ? (
                        <>Méně <ChevronUp className="ml-1 h-4 w-4" /></>
                      ) : (
                        <>Více <ChevronDown className="ml-1 h-4 w-4" /></>
                      )}
                    </Button>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Link href={episode.applePodcastsUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Apple className="mr-2 h-4 w-4" /> Apple
                      </Button>
                    </Link>
                    <Link href="https://open.spotify.com/show/2OeUOMt6CLg578FZy6m2VC?si=3d6dc313e3bc4814" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        Spotify
                      </Button>
                    </Link>
                    <Link href="https://herohero.co/rapspot" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        Hero Hero
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePlay(episode)}
                    >
                      <Play className="mr-2 h-4 w-4" /> Přehrát
                    </Button>
                    <Link href={`/detail/podcast-${episode.trackId}`}>
                      <Button variant="outline" size="sm">
                        Zobrazit detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={loadMore} disabled={loading}>
            {loading ? 'Načítání...' : 'Načíst další'}
          </Button>
        </div>
      )}
    </div>
  );
}