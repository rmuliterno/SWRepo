import React, { useState } from 'react';

import AnimationContainer from '../../components/AnimationContainer';
import api from '../../services/api';

import { Container, Title, MoviesGrid, MovieTitle, Button } from './styles';

const Luke: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState<string[]>([]);

  const getFilms = async () => {
    try {
      setLoading(true);
      const response = await api.get('/people/1');

      const titlesArray: string[] = [];

      await Promise.all(response.data.films.map(async (movie: string) => {
        const titleResponse = await api.get(movie);

        titlesArray.push(titleResponse.data.title);
      }));

      setFilms(titlesArray);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      // console.log(err);
    }
  }

  return (
    <Container>
      <Title>Luke</Title>
      <Button onClick={getFilms}>Buscar filmes do luke</Button>
      {!loading && films.length > 0 && 
        (
          <AnimationContainer>
            <MoviesGrid>
              {films &&
                films.map(film => (
                    <MovieTitle key={film}>{film}</MovieTitle>
              ))}
            </MoviesGrid>
          </AnimationContainer>
        )
      }
    </Container>
  )
}

export default Luke;
