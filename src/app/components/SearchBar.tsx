"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    router.push(`/${search}`);
    if (search) {
        router.push(`/${search}`);
    }
  }
  
  
  
    return (
    <form onSubmit={handleSubmit} className="flex ic juetify-between gap-4 bg-gray-100 p-2 rounded-md flex-1">
      <input
        type="text"
        name = "search"
        placeholder="Search..."
        className="w-full bg-gray-100 focus:outline-none"
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchBar;
