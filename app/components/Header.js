
"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { Menu, X, Search, Sun, Moon } from "lucide-react"; // Import Sun and Moon icons

export default function Header() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const searchInputRef = useRef(null);

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="fixed w-full p-4 bg-gray-100 dark:bg-gray-900 h-16 rounded-lg shadow-md text-black dark:text-white flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        Well Fashion
      </Link>

      {/* Search Bar (Desktop) */}
      <div className="hidden md:flex items-center bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-sm border w-1/4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow outline-none px-2 bg-transparent"
        />
        <button onClick={() => console.log("Searching for:", searchQuery)}>
          <Search size={20} />
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Link href="/about">About</Link>
        <Link href="/service">Services</Link>
        <Link href="/contact">Contact</Link>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Mobile Search Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
            <Search size={20} />
          </button>
        </div>

        <Link href="/login">Login</Link>

        {/* Cart */}
        <div className="flex">
          <Link href="/cart">
            <Image className="mt-2" src="/image/cart1.png" alt="Cart" width={30} height={20} />
          </Link>
          <Link className="bg-red-500 text-white mb-2 px-2 rounded-full font-bold" href="/cart">
            {cart.length}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-50 dark:bg-gray-900 shadow-md flex flex-col space-y-4 p-4 md:hidden">
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/service" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}

      {/* Mobile Search Input (Popup) */}
      {isMobileSearchOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 p-3 shadow-md flex items-center" ref={searchInputRef}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow outline-none px-2 py-1 border rounded-lg bg-transparent"
          />
          <button onClick={() => console.log("Searching for:", searchQuery)} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-lg">
            Search
          </button>
        </div>
      )}
    </nav>
  );
}
