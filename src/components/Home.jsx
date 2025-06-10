import React, { useState } from 'react';
import './navbar.css';
import HeroSection from './Hero';
import Movies from './Movies';
import LanguageSelector from './LanguageSelector';
import { useQuery } from '@tanstack/react-query';
import Footer from './Footer';

const fetchMovies = async (category) => {
  const response = await fetch(
    `https://server-tmdb.vercel.app/api/tmdb?path=movie/${category}&language=en-US&region=IN&page=1`
  );
  const data = await response.json();
  return data.results;
};

const Home = () => {
  const [search, setSearch] = useState('');

  const { data: nowPlaying = [], isLoading: loadingNow } = useQuery({
    queryKey: ['movies', 'now_playing'],
    queryFn: () => fetchMovies('now_playing'),
  });

  const { data: popular = [], isLoading: loadingPopular } = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => fetchMovies('popular'),
  });

  const { data: topRated = [], isLoading: loadingTopRated } = useQuery({
    queryKey: ['movies', 'top_rated'],
    queryFn: () => fetchMovies('top_rated'),
  });

  const { data: upcoming = [], isLoading: loadingUpcoming } = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: () => fetchMovies('upcoming'),
  });

  const loading = loadingNow || loadingPopular || loadingTopRated || loadingUpcoming;

  return (
    <div className="bg txt">
      <HeroSection search={search} setSearch={setSearch} />
      <Movies name="Now Playing in Theaters!" movies={nowPlaying} loading={loading} page="now_playing" />
      <Movies name="Popular Movies!" movies={popular} loading={loading} page="popular" />
      <Movies name="Top Rated Films!" movies={topRated} loading={loading} page="top_rated" />
      <Movies name="Upcoming Releases!" movies={upcoming} loading={loading} page="upcoming" />
      <LanguageSelector />
      <Footer />
    </div>
  );
};


export default Home;
