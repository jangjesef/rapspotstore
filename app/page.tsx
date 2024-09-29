import BlogPosts from "@/components/blog-posts";
import Search from "@/components/search";

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export default function Home() {
  const handleSearch = (query: string) => {
    console.log("Vyhledávání:", query);
    // Zde můžete implementovat logiku vyhledávání
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Náš blog</h1>
      <Search onSearch={handleSearch} />
      <BlogPosts />
    </main>
  );
}
