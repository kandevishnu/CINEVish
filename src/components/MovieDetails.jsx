import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../Store/FavoritesSlice';
import {addWatchLater, removeWatchLater} from '../Store/WatchLaterSlice';
import './moviedetails.css';
import Footer from './Footer';

const API_KEY = 'e12c7b410930958ebb268917c3968cb4';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/original';
const IMAGE_SMALL = 'https://image.tmdb.org/t/p/w500';
const PROFILE_IMAGE = 'https://image.tmdb.org/t/p/w185';

const langMap = {
    en: 'English', te: 'Telugu', hi: 'Hindi', ta: 'Tamil', ml: 'Malayalam',
    kn: 'Kannada', fr: 'French', ja: 'Japanese', ko: 'Korean', es: 'Spanish',
    de: 'German', nl: 'Dutch', bn: 'Bengali', mr: 'Marathi'
};

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const movies = useSelector((state) => state.favorites.value); // this will now work
    const watchLaterMovies = useSelector((state) => state.watchlater.value);
    const dispatch = useDispatch();

    const handleAddToFavorites = (movie) => {
        dispatch(add(movie));
    };

    const handleAddToWatchLater = (movie) => {
        dispatch(addWatchLater(movie));
    };

    useEffect(() => {
        fetch(`https://server-tmdb.vercel.app/api/tmdb?path=${encodeURIComponent(`movie/${id}?language=en-US&append_to_response=videos`)}`)
            .then((res) => res.json())
            .then(data => {
                setMovie(data);
                setLoading(false);
            })
            .catch((err) => console.error('Error fetching movie:', err));

        fetch(`https://server-tmdb.vercel.app/api/tmdb?path=${encodeURIComponent(`movie/${id}/credits`)}`)
            .then((res) => res.json())
            .then(setCredits)
            .catch((err) => console.error('Error fetching credits:', err));
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0); // Reset scroll on load
    }, [id]);


    useEffect(() => {
        const results = movie?.videos?.results || [];

        const trailer = results.find(
            (vid) => vid.type === 'Trailer' && vid.site === 'YouTube' && vid.official
        ) || results.find(
            (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );

        setVideo(trailer || null);
    }, [movie]);

    const topCast = credits?.cast?.slice(0, 5) || [];

    if (loading || !movie || !credits) {
        return (
            <div className="text-white" style={{ backgroundColor: 'var(--color-bg)' }}>
                {/* Backdrop Skeleton */}
                <div className="relative w-full h-[400px] md:h-[500px] animate-pulse">
                    <div className="absolute inset-0 z-0" style={{ backgroundColor: 'var(--color-card-border)' }} />
                    <div className="absolute inset-0 backshadow z-10" />
                    <div className="relative z-20 flex items-end h-full p-6">
                        <div
                            className="h-10 w-24 rounded"
                            style={{ backgroundColor: 'var(--color-card-border)' }}
                        />
                    </div>
                </div>

                {/* Main Skeleton (Flex Layout) */}
                <div className="max-w-6xl mx-auto p-6 flex items-center gap-6 md:gap-12 md:flex-row flex-col-reverse animate-pulse">
                    <div className="h-[300px] w-full md:w-[200px] rounded-lg" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                    <div className="flex-1 space-y-4">
                        <div className="h-8 w-3/4 rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                        <div className="h-4 w-1/2 rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                        <div className="h-16 w-full rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                        <div className="h-4 w-1/2 rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                        <div className="h-4 w-1/3 rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                        <div className="h-4 w-2/3 rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                        <div className="flex gap-3 pt-2">
                            <div className="h-10 w-36 rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                            <div className="h-10 w-44 rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                        </div>
                    </div>
                </div>

                {/* Trailer Box Skeleton */}
                <div className="max-w-6xl h-96 mx-auto px-6 pt-8 animate-pulse">
                    <div className="h-6 w-24 rounded mb-2" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                    <div className="w-full h-[300px] rounded-lg" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                </div>

                {/* Cast Skeleton */}
                <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
                    <div className="h-6 w-32 rounded mb-4" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {[...Array(5)].map((_, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="w-full h-[200px] rounded-lg" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                                <div className="h-4 w-3/4 mx-auto rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                                <div className="h-3 w-2/3 mx-auto rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="text-white" style={{ backgroundColor: 'var(--color-bg)' }}>
            {/* Backdrop */}
            <div className="relative w-full h-[400px] md:h-[500px]">
                <img
                    src={`${IMAGE_BASE + movie.backdrop_path}`}
                    alt="Backdrop"
                    className="absolute inset-0 w-full h-full object-cover object-center z-0"
                />
                <div className="absolute inset-0 backshadow z-10" />
                <div className="relative z-20 flex items-end h-full p-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white cursor-pointer bg-[var(--color-primary-btn)] hover:bg-[var(--color-primary-btn-hover)] transition px-4 py-2 rounded shadow"
                    >
                        ⬅ Back
                    </button>
                </div>
            </div>

            {/* Main Content */}
            {/* <div className="max-w-6xl mx-auto p-6 grid gap-6 md:grid-cols-[200px_1fr]"> */}
            <div className="max-w-6xl mx-auto p-6 flex items-center gap-6 md:gap-12 md:flex-row flex-col-reverse">
                <div>
                    {movie.poster_path && (
                        <img
                            src={IMAGE_SMALL + movie.poster_path}
                            alt={movie.title}
                            className="w-full rounded-lg shadow-xl"
                        />
                    )}

                </div>

                <div className="space-y-4 text-[var(--color-text-primary)]">
                    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{movie.title}</h1>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                        {movie.original_language ? (langMap[movie.original_language] || movie.original_language.toUpperCase()) : 'N/A'} | ⭐{' '}
                        {movie.vote_average?.toFixed(1)} | {movie.runtime} min
                    </p>



                    <p className="text-base leading-relaxed">{movie.overview}</p>
                    <p><strong>Genres:</strong> {(movie.genres?.slice(0, 3).map((g) => g.name).join(', ')) || 'N/A'}</p>
                    <p><strong>Production:</strong> {(movie.production_companies?.slice(0, 3).map((p) => p.name).join(', ')) || 'N/A'}</p>
                    <p><strong>Cast:</strong> {topCast.length > 0 ? topCast.map((c) => c.name).join(', ') : 'N/A'}</p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                        {!movies.find((m) => m.id === movie.id) ? (
                            <button
                                className="px-4 cursor-pointer py-2 rounded bg-[var(--color-primary-button)] hover:bg-[var(--color-primary-button-hover)] hover:scale-105 text-white transition shadow"
                                onClick={() => handleAddToFavorites(movie)}
                            >
                                ❤️ Add to favorites
                            </button>
                        ) : (
                            <button
                                className="px-4 cursor-pointer py-2 rounded bg-[var(--color-primary-button)] hover:bg-[var(--color-primary-button-hover)] hover:scale-105 text-white transition shadow"
                                
                            >
                                ✔️ Added to favorites
                            </button>
                        )}

                        {!watchLaterMovies.find((m) => m.id === movie.id) ? (
                            <button
                                className="px-4 cursor-pointer py-2 rounded bg-[var(--color-secondary-btn)] hover:bg-[var(--color-secondary-btn-hover)] hover:scale-105 text-white transition shadow"
                                onClick={() => handleAddToWatchLater(movie)}
                            >
                                ⏰ Add to Watch Later
                            </button>
                        ) : (
                            <button
                                className="px-4 cursor-pointer py-2 rounded bg-[var(--color-secondary-btn)] hover:bg-[var(--color-secondary-btn-hover)] hover:scale-105 text-white transition shadow"
                                
                            >
                                ✔️ Added to Watch Later
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Trailer */}
            <div className="max-w-6xl mx-auto px-6 pt-8">
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Trailer</h2>
                {video ? (
                    <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title="Movie Trailer"
                        allowFullScreen
                        className="rounded-lg shadow-md"
                    ></iframe>
                ) : (
                    <p className="text-sm text-[var(--color-text-secondary)]">No trailer available.</p>
                )}
            </div>

            {/* Cast Thumbnails */}
            {topCast.length > 0 && (
                <div className="max-w-6xl mx-auto px-6 pb-12 pt-10">
                    <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Top Cast</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {topCast.map((actor) => (
                            <div key={actor.id} className="text-center group">
                                <img
                                    src={actor.profile_path ? PROFILE_IMAGE + actor.profile_path : '/fallback-profile.png'}
                                    alt={actor.name}
                                    className="w-full h-[200px] object-cover rounded-lg group-hover:scale-105 transition-transform shadow"
                                />
                                <p className="mt-2 text-sm text-[var(--color-text-primary)] font-semibold">{actor.name}</p>
                                <p className="text-xs text-[var(--color-text-secondary)] italic">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
    <Footer />
        </div>
    );
};

export default MovieDetails;
