import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import { Container } from './styles';

interface FilmProps {
  title: string,
  release_date: string,
}

const Home: React.FC = () => {
  const [films, setFilms] = useState<FilmProps[]>([]);

  useEffect(() => {
    const getFilms = async () => {
      const response = await api.get('/films');

      console.log(response.data);
      setFilms(response.data.results);
    }

    getFilms();
  }, []);

  return (
    <Container>
      <h1>Home</h1>
      <div>
        {films &&
          films.map(film => (
            <>
              <p>{film.title}</p>
              <button onClick={() => alert(film.release_date)}>{'Ver lan\u00e7amento'}</button>
            </>
        ))}
      </div>
    </Container>
  )
}

export default Home;
