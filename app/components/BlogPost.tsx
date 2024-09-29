import React, { ReactNode } from "react";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { getBlogPost } from "@/lib/contentful";

interface BlogPostProps {
  id: string;
}

export default async function BlogPost({ id }: BlogPostProps) {
  const post = await getBlogPost(id);

  if (!post) {
    return <div>Post nenalezen</div>;
  }

  const options: Options = {
    // Zde můžete přidat vlastní renderovací možnosti
  };

  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div>
        {
          documentToReactComponents(
            post.content as Document,
            options
          ) as ReactNode
        }
      </div>
    </article>
  );
}
