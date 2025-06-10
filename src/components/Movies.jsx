import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Utility: Language map
const languageMap = {
    en: 'English',
    te: 'Telugu',
    hi: 'Hindi',
    ta: 'Tamil',
    ml: 'Malayalam',
    kn: 'Kannada',
    fr: 'French',
    ja: 'Japanese',
    ko: 'Korean',
    es: 'Spanish',
    de: 'German',
    nl: 'Dutch',
};

// Utility: Format date
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const Movies = ({ name, movies = [], loading, page }) => {
    const navigate = useNavigate();
    const renderSkeletons = () => {
        return Array.from({ length: 20 }).map((_, index) => (
            <div
                key={index}
                className="min-w-[160px] max-w-[160px] rounded-lg overflow-hidden animate-pulse"
                style={{
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-card-border)',
                    boxShadow: '0 4px 8px var(--color-shadow)',
                }}
            >
                <div className="w-full h-60 bg-gray-300" />
                <div className="p-2 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>
            </div>
        ));
    };


        return (
            <section className="px-6 py-4" style={{ backgroundColor: 'var(--color-bg)' }}>
                <h2
                    className="text-2xl font-semibold mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                >
                    {name}
                </h2>

                <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
                    {loading ? (renderSkeletons()) : (movies.map((movie) => (
                        <Link to={`/movie/${movie.id}`} key={movie.id}
                            className="group min-w-[160px] max-w-[160px] rounded-lg overflow-hidden relative hover:scale-105 transition-transform duration-300"
                            style={{
                                backgroundColor: 'var(--color-card-bg)',
                                border: '1px solid var(--color-card-border)',
                                boxShadow: `0 4px 8px var(--color-shadow)`,
                            }}
                        >
                            <div>
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-60 object-cover"
                                />

                                <div className="p-2">
                                    <h3
                                        className="text-sm font-medium text-center flex items-center justify-center"
                                        style={{ color: 'var(--color-text-primary)' }}
                                    >
                                        {movie.original_title}
                                    </h3>
                                </div>

                                {/* Bottom Hover Info */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-2"
                                    style={{
                                        backgroundColor: 'var(--color-hover-bg)',
                                        borderBottomLeftRadius: '0.5rem',
                                        borderBottomRightRadius: '0.5rem',
                                        minHeight: '70px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        gap: '2px',
                                    }}
                                >
                                    <p style={{ color: 'var(--color-hover-text)', fontSize: '0.75rem', fontWeight: '500' }}>
                                        Title: {movie.title}
                                    </p>
                                    <p style={{ color: 'var(--color-hover-text)', fontSize: '0.75rem' }}>
                                        Language: {languageMap[movie.original_language] || movie.original_language.toUpperCase()}
                                    </p>
                                    <p style={{ color: 'var(--color-hover-text)', fontSize: '0.75rem' }}>
                                        Release: {formatDate(movie.release_date)}
                                    </p>
                                </div>





                            </div>
                        </Link>
                    )))}

                    {/* Show All Card */}

                    <div
                        className="min-w-[160px] max-w-[160px] flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        style={{
                            borderColor: 'var(--color-card-border)',
                            color: 'var(--color-text-primary)',
                            backgroundColor: 'var(--color-card-bg)',
                            boxShadow: `0 4px 8px var(--color-shadow)`,
                        }}
                        onClick={() => navigate(`/movies/${page}`)}
                    >
                        <span className="text-sm font-semibold">Show All →</span>
                    </div>
                </div>
            </section>
        );
    };

    export default Movies;
