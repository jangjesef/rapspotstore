'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Simulovaná data postů
const allPosts = [
  { id: 1, title: "Nové album XY", category: "Albums", slug: "nove-album-xy" },
  { id: 2, title: "Rozhovor s rapperem Z", category: "Articles", slug: "rozhovor-rapper-z" },
  { id: 3, title: "Top 10 rapových skladeb", category: "Playlists", slug: "top-10-rapovych-skladeb" },
  // ... přidejte více postů pro testování stránkování
];

const POSTS_PER_PAGE = 5;

export function PostList() {
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilteredPosts(allPosts.filter(post => post.category === category));
    } else {
      setFilteredPosts(allPosts);
    }
    setCurrentPage(1);
  }, [searchParams]);

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="space-y-4 mb-4">
        {currentPosts.map(post => (
          <Link href={`/posts/${post.slug}`} key={post.id} className="block p-4 border rounded">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">{post.category}</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(filteredPosts.length / POSTS_PER_PAGE) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}