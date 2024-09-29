'use client'

import { useRouter, useSearchParams } from 'next/navigation';

const categories = ["Vše", "Articles", "Albums", "Playlists"];

export function PostFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    if (category === "Vše") {
      router.push('/');
    } else {
      router.push(`/?category=${category}`);
    }
  };

  return (
    <div className="mb-4">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`mr-2 px-3 py-1 rounded ${
            searchParams.get('category') === category || (category === "Vše" && !searchParams.get('category'))
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}