"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { getAllBlogPostIds } from "@/lib/contentful";

const BlogPost = dynamic(
  () => import("@/app/components/BlogPost").then((mod) => mod.default),
  {
    loading: () => <div>Načítání...</div>,
  }
);

interface BlogPageProps {
  params: { id: string };
}

export default function BlogPage({ params }: BlogPageProps) {
  return <BlogPost id={params.id} />;
}

export async function generateStaticParams() {
  const ids = await getAllBlogPostIds();
  return ids.map((id) => ({ id }));
}

export const revalidate = 3600; // Revalidace každou hodinu
