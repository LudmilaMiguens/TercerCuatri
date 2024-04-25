import { useEffect, useState } from 'react'
import { getMovies } from '../api/getMovies';
import { MovieCard } from './card';
import { Modal } from './modal';
import './modal.css';
import './App.css';
import './card.css';


function App() {
  const [movies, setMovies] = useState([]);
  const [selecMovie, setSelecMovie] = useState(null);

  useEffect(() =>{
    getMovies()
    .then((res) => res.json())
    .then((data) => setMovies(data));
  }, []);

  const openModal = (movie) => {
    setSelecMovie(movie)
  }

  const closeModal = () => {
    setSelecMovie(null)
  }

  return (
    <>
       <div>
        <h1>MOVIES</h1>
         <div className='card-container'>
          {movies.map((movie) => (
          <MovieCard 
          movie={movie} 
          key={movie.id}
          openModal={() => openModal(movie)}
          />
          ))} 
         </div>
          {selecMovie && <Modal movie={selecMovie} closeModal={closeModal} />
          }
       </div>
      
    </>
  )
}

export default App
