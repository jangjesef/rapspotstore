"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/contentful";
import type { BlogPostSummary } from "@/lib/contentful";

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);

  useEffect(() => {
    getAllBlogPosts().then(setPosts);
  }, []);

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.id}`} className="block hover:underline">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.excerpt}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
