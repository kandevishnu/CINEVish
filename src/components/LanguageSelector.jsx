import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const languages = [
  { code: 'te', name: 'Telugu' },
  { code: 'hi', name: 'Hindi' },
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'Tamil' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
  { code: 'bn', name: 'Bengali' },
  { code: 'mr', name: 'Marathi' },
];

const fetchLanguageCovers = async () => {
  const covers = {};

  await Promise.all(
    languages.map(async (lang) => {
      const path = `discover/movie?with_original_language=${lang.code}&sort_by=popularity.desc&region=IN&page=1`;

      const res = await fetch(
        `https://server-tmdb.vercel.app/api/tmdb?path=${encodeURIComponent(path)}`
      );

      const data = await res.json();
      const movieWithPoster = data.results?.find((movie) => movie.poster_path);

      if (movieWithPoster) {
        covers[lang.code] = movieWithPoster.poster_path;
      }
    })
  );

  return covers;
};


const LanguageSelector = () => {
  const navigate = useNavigate();

  const { data: covers = {}, isLoading } = useQuery({
    queryKey: ['language-covers'],
    queryFn: fetchLanguageCovers,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });


      return (
    <div className="px-6 py-10">
      <h2
        className="text-2xl font-bold mb-6 text-center"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Browse by Language
      </h2>

      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {languages.map((lang) => {
          const poster = covers[lang.code];
          return (
            <div
              key={lang.code}
              onClick={() => navigate(`/language/${lang.code}`)}
              className="w-[200px] h-[200px] rounded-xl overflow-hidden relative flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-card-border)',
                boxShadow: '0 4px 8px var(--color-shadow)',
                backgroundImage: poster
                  ? `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(https://image.tmdb.org/t/p/w500${poster})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                className="text-xl font-semibold text-white text-center px-2"
                style={{
                  color: 'var(--color-hover-text)',
                  textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                }}
              >
                {lang.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default LanguageSelector;
