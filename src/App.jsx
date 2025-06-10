import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import MovieDetails from './components/MovieDetails';
import ShowMovies from './components/ShowMovies';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Favorites from './components/Favorites';
import WatchLater from './components/WatchLater';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/movies/:movie' element={<ShowMovies />} />
        <Route path='/language/:lang' element={<ShowMovies />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/watchlater' element={<WatchLater />} />

        <Route
          path="*"
          element={
            <h1 className="text-2xl m-4 text-center h-screen flex items-center justify-center">
              Error: 404. Page not Found
            </h1>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
