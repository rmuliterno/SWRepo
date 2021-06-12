import React, { useEffect, useState, useCallback } from 'react';
import { ClipLoader } from 'react-spinners';

import AnimationContainer from '../../components/AnimationContainer';
import api from '../../services/api';

import { Container, Title, Info, LoadingContainer, MoviesGrid, MovieContainer, MovieTitle, Button } from './styles';
import { FilmProps } from '../../helpers/types/film';
import { handleInfo } from '../../helpers/methods/handleInfo';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [films, setFilms] = useState<FilmProps[]>([]);

  const getFilms = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await api.get('/films');

      setFilms(response.data.results);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      setError(true);
      // console.log(err);
    }
  }

  useEffect(() => {
    getFilms();
  }, []);

  const renderMovies = useCallback(() => {
    if (loading) {
      return (
        <LoadingContainer>
          <ClipLoader />
        </LoadingContainer>
      )
    }

    if (error) {
      return (
        <AnimationContainer>
          <Info>An error occurred :(</Info>
          <Button onClick={getFilms}>Try again!</Button>
        </AnimationContainer>
      )
    }

    if (films.length <= 0 && !loading) {
      return <Info>I find this lack of movies disturbing :(</Info>
    }

    return (
      <AnimationContainer>
        <MoviesGrid>
          {films &&
            films.map(film => (
              <MovieContainer key={film.episode_id}>
                <MovieTitle>{film.title}</MovieTitle>
                <Button onClick={() => handleInfo(film)}>More info</Button>
              </MovieContainer>
          ))}
        </MoviesGrid>
      </AnimationContainer>
    )
  }, [error, films, loading]);

  return (
    <Container>
      <Title>Star Wars Movies</Title>
      {renderMovies()}
    </Container>
  )
}

export default Home;
