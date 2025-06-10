import { useEffect, useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './HeroSection.css';

const API_KEY = 'e12c7b410930958ebb268917c3968cb4';

export default function HeroSection({ search, setSearch }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const fetchMovies = async (query) => {
    setIsLoading(true);

    const url =
      query.trim().length > 0
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.results) {
        const seen = new Set();
        const titles = [];

        data.results.forEach((movie) => {
          if (!movie.title || !movie.release_date || !movie.id || !movie.poster_path) return;

          const year = movie.release_date.slice(0, 4);
          const key = `${movie.title} (${year})`;

          if (!seen.has(key)) {
            seen.add(key);
            titles.push({
              id: movie.id,
              fullTitle: key,
              originalTitle: movie.title,
              poster: movie.poster_path,
            });
          }
        });

        setSuggestions(titles);
      }
    } catch (error) {
      console.error('Error fetching movie suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (showSuggestions) {
        fetchMovies(search);
      }
    }, 400);

    return () => clearTimeout(debounce);
  }, [search, showSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = () => {
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      navigate(`/movie/${suggestions[0].id}`);
      handleSelect();
    }
  };

  const handleFocus = () => {
    setShowSuggestions(true);
    if (search.trim().length === 0) {
      fetchMovies('');
    }
  };

  return (
    <section className="text-center py-12 px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Track. Search. Discover.
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          From cult classics to trending hits — everything in one spot.
        </p>

        <div className="relative max-w-xl mx-auto shadow-md rounded-full" ref={inputRef}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={handleFocus}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder="Search for movies..."
            className="w-full pl-12 pr-4 py-3 rounded-full focus:outline-none"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-card-border)',
              boxShadow: `0 4px 6px var(--color-shadow)`,
            }}
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            style={{ color: 'var(--color-text-secondary)' }}
          />

          {showSuggestions && (suggestions.length > 0 || isLoading) && (
  <ul
    className="absolute z-50 left-0 right-0 mt-2 rounded-xl shadow-lg overflow-hidden animate-dropdown"
    style={{
      backgroundColor: 'var(--color-card-bg)',
      border: '1px solid var(--color-card-border)',
      maxHeight: '300px',
      overflowY: 'auto',
    }}
  >
    {isLoading ? (
      Array.from({ length: 5 }).map((_, index) => (
        <li
          key={`skeleton-${index}`}
          className="flex items-center gap-4 px-4 py-2 animate-pulse"
        >
          <div className="w-12 h-16 bg-gray-300 rounded" />
          <div className="flex-1 h-4 bg-gray-300 rounded w-3/4" />
        </li>
      ))
    ) : (
      suggestions.slice(0, 10).map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-4 px-4 py-2 cursor-pointer effect-hover"
          style={{ color: 'var(--color-text-primary)' }}
        >
          <Link
            to={`/movie/${item.id}`}
            className="flex items-center gap-4 w-full"
            onClick={handleSelect}
          >
            <img
              src={`https://image.tmdb.org/t/p/w92${item.poster}`}
              alt={item.originalTitle}
              className="w-12 h-16 rounded object-cover"
            />
            <span>{item.fullTitle}</span>
          </Link>
        </li>
      ))
    )}
  </ul>
)}

        </div>
      </div>
    </section>
  );
}
