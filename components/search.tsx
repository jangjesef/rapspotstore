"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <Input
      type="text"
      placeholder="Hledat v příspěvcích..."
      value={query}
      onChange={handleSearch}
      className="mb-4"
    />
  ) as ComponentProps<"input">;
}
