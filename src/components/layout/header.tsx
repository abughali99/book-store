"use client";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../public/logo.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <section className="sticky top-0 z-50 w-full border-b bg-[#121520]">
      <header className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-bold text-xl">
              <Image src={logo} alt="Logo" width={100} height={60} />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-white text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/favorites" className="text-white text-sm font-medium hover:text-primary transition-colors">
              Favorites
            </Link>

            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="h-9 w-[200px] rounded-md border border-input bg-background px-8 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </nav>
          <div className="flex md:hidden items-center gap-3">
            {!isSearchVisible && (
              <button onClick={() => setIsSearchVisible(true)} aria-label="Open search">
                <Search className="h-5 w-5 text-white" />
              </button>
            )}
            {!isSearchVisible && (
              <button onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
                {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
              </button>
            )}
          </div>
        </div>
        {isSearchVisible && (
          <div className="absolute top-0 left-0 w-full h-16 bg-background z-50 px-4 flex items-center">
            <form onSubmit={handleSearch} className="flex-1 flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="h-9 w-full rounded-md border border-input bg-background px-8 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <button type="button" className="ml-2 text-white" onClick={() => setIsSearchVisible(false)} aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}
        {isMenuOpen && (
          <div className="md:hidden w-full py-4 pb-6">
            <nav className="flex flex-col space-y-4 text-white">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/favorites" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-primary">
                Favorites
              </Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link href="/services" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-primary">
                Services
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>
    </section>
  );
};
