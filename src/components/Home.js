import React from 'react';
import MovieList from './Movie/MovieList';
import Menu from './Menu';

function Home() {
  return (
    <div>
      <Menu />
      
      <MovieList />
    </div>
  )
}

export default Home;