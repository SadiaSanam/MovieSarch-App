import React, { useState } from 'react';

import MovieInfo from './MovieInfo';

const Searchmovie = () => {
  const[ query, setQuery ] = useState('');
  const [ movies, setMovies ] = useState( [] ); 

  const url = `https://api.themoviedb.org/3/search/movie?api_key=84ba351b547c6ffd4b9391b0eea2a0cf&language=en-US&query=${query}&page=1&include_adult=false`;

  const getMovies = async (e) => {
   try {
    e.preventDefault();
    const result = await fetch (url);
    const data = await result.json();

    setMovies(data.results );

    console.log('my states', query, movies)
   } catch (error) {
     console.log('fetch error', error.message)
    }  
  }


  return (
    <div id= 'content' className='section' onSubmit= {getMovies} >
      <form className='form-control'>
        <label className='form-label'> Movie Name </label>
        <input className='form-input' type= 'text' name='query' required 
          onChange={ e => setQuery(e.target.value)}/>
        <button className='form-button' type='submit'> Search </button>
      </form>

      <div className='card-list'>

      </div>
      {
        movies.filter(movie => movie.poster_path ).map( movie => 
        <MovieInfo movie={movie} key={movie.id}/>
          )
      }

    </div>
  )
}

export default Searchmovie
