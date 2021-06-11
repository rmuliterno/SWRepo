import React, { useEffect, useState, useCallback } from 'react';
import { ClipLoader } from 'react-spinners';

import AnimationContainer from '../../components/AnimationContainer';
import api from '../../services/api';

import { Container, Title, Info, LoadingContainer, MoviesGrid, MovieContainer, MovieTitle, Button } from './styles';

interface FilmProps {
  title: string,
  release_date: string,
  episode_id: number,
}

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
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    getFilms();
  }, []);

  const handleClick = useCallback((film: FilmProps) => {
    alert(`${film.title} was released in ${film.release_date}`)
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
          <Info>No movie found :(</Info>
          <Button onClick={getFilms}>Try again!</Button>
        </AnimationContainer>
      )
    }

    if (films.length <= 0 && !loading) {
      return <Info>No movie found :(</Info>
    }

    return (
      <MoviesGrid>
        {films &&
          films.map(film => (
            <MovieContainer key={film.episode_id}>
              <MovieTitle>{film.title}</MovieTitle>
              <Button onClick={() => handleClick(film)}>More info</Button>
            </MovieContainer>
        ))}
      </MoviesGrid>
    )
  }, [error, films, handleClick, loading]);

  return (
    <Container>
      <Title>Star Wars Movies</Title>
      <AnimationContainer>
        {renderMovies()}
      </AnimationContainer>
    </Container>
  )
}

export default Home;
