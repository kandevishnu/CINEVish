import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

const IMAGE_SMALL = 'https://image.tmdb.org/t/p/w500';

const languageMap = {
    en: 'English', te: 'Telugu', hi: 'Hindi', ta: 'Tamil', ml: 'Malayalam',
    kn: 'Kannada', fr: 'French', ja: 'Japanese', ko: 'Korean', es: 'Spanish',
    de: 'German', nl: 'Dutch', bn: 'Bengali', mr: 'Marathi',
};

const fetchMovies = async ({ pageParam = 1, queryKey }) => {
    const [_key, { movie, lang }] = queryKey;
    let path = '';

    if (movie) {
        path = `movie/${movie}?language=en-US&region=IN&page=${pageParam}`;
    } else if (lang) {
        path = `discover/movie?with_original_language=${lang}&sort_by=popularity.desc&include_adult=false&vote_count.gte=20&region=IN&page=${pageParam}`;
    }

    const url = `https://server-tmdb.vercel.app/api/tmdb?path=${encodeURIComponent(path)}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
        results: data.results || [],
        nextPage: pageParam < data.total_pages ? pageParam + 1 : undefined,
    };
};

const ShowMovies = () => {




    useEffect(() => {
        window.scrollTo(0, 0); // Instant scroll, no animation
    }, []);


    const navigate = useNavigate();
    const { movie, lang } = useParams();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ['movies', { movie, lang }],
        queryFn: fetchMovies,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: 1000 * 60 * 10,
    });

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 200 && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const renderSkeletons = () => (
        Array.from({ length: 10 }).map((_, i) => (
            <div
                key={i}
                className="rounded-xl overflow-hidden animate-pulse"
                style={{
                    backgroundColor: 'var(--color-card-bg)',
                    boxShadow: '0 4px 8px var(--color-shadow)',
                    border: '1px solid var(--color-card-border)',
                }}
            >
                <div className="w-full aspect-[3/4] bg-gray-300" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                <div className="p-3 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-400 rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                    <div className="h-3 w-1/2 bg-gray-400 rounded" style={{ backgroundColor: 'var(--color-card-border)' }}></div>
                </div>
            </div>
        ))
    );

    const uniqueMovies = Array.from(
        new Map(
            (data?.pages.flatMap((page) => page.results) || [])
                .map((movie) => [movie.id, movie])
        ).values()
    );

    return (
        <div
            className="w-full px-4 py-8 sm:px-8 mdown"
            style={{ color: 'var(--color-text-primary)', backgroundColor: 'var(--color-bg)' }}
        >
            <div className="mb-6 text-center">
                <h1
                    className="text-2xl sm:text-3xl font-bold inline-block px-4 py-2 rounded-lg"
                    style={{
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-text-primary)',
                        boxShadow: '0 2px 6px var(--color-shadow)',
                        border: '1px solid var(--color-card-border)',
                    }}
                >
                    🎬 {movie ? movie.replace('_', ' ').toUpperCase() : `${languageMap[lang]?.toUpperCase()} MOVIES`}
                </h1>
            </div>
            <button
                onClick={() => navigate(-1)}
                className="fixed bottom-4 left-10 z-50 text-[var(--color-bg)] bg-[var(--color-primary-back-btn)] hover:scale-105 hover:bg-[var(--color-primary-btn-hover)] transition px-4 py-2 rounded shadow-lg"
            >
                ⬅ Back
            </button>



            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {uniqueMovies.map((movie) => (
                    <div
                        key={movie.id}
                        className="rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                        style={{
                            backgroundColor: 'var(--color-card-bg)',
                            boxShadow: '0 4px 8px var(--color-shadow)',
                            border: '1px solid var(--color-card-border)',
                        }}
                    >
                        <img
                            src={IMAGE_SMALL + movie.poster_path}
                            alt={movie.title}
                            className="w-full aspect-[3/4] object-cover"
                        />
                        <div className="p-3 space-y-1">
                            <h2
                                className="text-sm sm:text-base font-semibold line-clamp-2"
                                style={{ color: 'var(--color-text-primary)' }}
                            >
                                {movie.title || movie.original_title}
                            </h2>
                            <p
                                className="text-xs sm:text-sm font-bold"
                                style={{ color: 'var(--color-rating-star)' }}
                            >
                                ⭐ <span>{movie.vote_average?.toFixed(1)}</span>
                            </p>
                        </div>
                    </div>
                ))}
                {(isLoading || isFetchingNextPage) && renderSkeletons()}
            </div>

            {!hasNextPage && !isLoading && (
                <p className="text-center mt-6 text-sm italic" style={{ color: 'var(--color-text-secondary)' }}>
                    🎉 You've reached the end.
                </p>
            )}
        </div>
    );
};

export default ShowMovies;
