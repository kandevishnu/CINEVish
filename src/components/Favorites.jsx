import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { remove } from '../Store/FavoritesSlice';
import Footer from './Footer';

const IMAGE_SMALL = 'https://image.tmdb.org/t/p/w500';

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.value);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg)]">

      <main className="px-4 py-6 flex-1">
        {favorites.length > 0 ? (
          <>
            <h1
              className="text-3xl font-bold mb-6 text-center"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Your favorites
            </h1>

            <div className="space-y-6 max-w-4xl mx-auto">
              {favorites.map((movie) => (
                <div
                  key={movie.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl shadow transition-transform duration-300 hover:scale-[1.01] border"
                  style={{
                    backgroundColor: 'var(--color-card-bg)',
                    boxShadow: '0 4px 8px var(--color-shadow)',
                    border: '1px solid var(--color-card-border)',
                  }}
                >
                  <div
                    className="flex gap-4 cursor-pointer"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    <img
                      src={IMAGE_SMALL + movie.poster_path}
                      alt={movie.title}
                      className="w-24 h-36 object-cover rounded"
                    />
                    <div className="space-y-1 max-w-md">
                      <h2
                        className="text-xl font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {movie.title || movie.original_title}
                      </h2>
                      <p
                        className="text-sm font-medium"
                        style={{ color: 'var(--color-rating-star)' }}
                      >
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </p>
                      <p
                        className="text-sm line-clamp-3"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {movie.overview}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      dispatch(remove(movie.id));
                      const updated = favorites.filter((m) => m.id !== movie.id);
                      localStorage.setItem('favorites', JSON.stringify(updated));
                    }}
                    className="self-end sm:self-center px-4 py-2 rounded text-white transition shadow"
                    style={{
                      backgroundColor: 'red',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 text-lg gap-4" style={{ color: 'var(--color-text-secondary)' }}>
            <p>No movies in Favorites.</p>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded font-medium transition"
              style={{
                backgroundColor: 'var(--color-primary-btn)',
                color: 'var(--color-hover-text)',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--color-primary-btn-hover)')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--color-primary-btn)')
              }
            >
              Browse Movies
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
