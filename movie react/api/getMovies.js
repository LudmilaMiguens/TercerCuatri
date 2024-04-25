const API = 'http://localhost:3010';

export const getMovies = () => fetch(`${API}/movies`);