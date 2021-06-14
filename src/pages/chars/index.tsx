import React, { useState } from 'react';

import AnimationContainer from '../../components/AnimationContainer';
import api from '../../services/api';

import { Container, Title, MoviesGrid, MovieTitle, Button } from './styles';

interface CharacterProps {
  name: string,
  url: string,
  films: string[],
};

const Chars: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<CharacterProps[]>([]);

  const getChars = async () => {
    try {
      setLoading(true);
      const response = await api.get('/people');

      const charsArray = response.data.results;

      const sorted = charsArray.sort((a: any, b: any) => (a.films.length < b.films.length) ? 1 : -1);

      const mostMovies = () => {
        const highestNumber = sorted[0].films.length;
        const checkNumber = (person: any) => {
          if (person.films.length === highestNumber) return person; 
        }
        const mostMoviesIn = sorted.filter(checkNumber);

        return mostMoviesIn;
      };

      const charactersWithMostMovies = mostMovies();

      setCharacters(charactersWithMostMovies);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      // console.log(err);
    }
  }

  return (
    <Container>
      <Title>Buscar Personagens que mais apareceram</Title>
      <Button onClick={getChars}>Buscar</Button>
      {!loading && characters.length > 0 && 
        (
          <AnimationContainer>
            <MoviesGrid>
              {characters &&
                characters.map(character => (
                  <div key={character.name}>
                    <MovieTitle>{character.name}</MovieTitle>
                    <MovieTitle>{character.url}</MovieTitle>
                  </div>
              ))}
            </MoviesGrid>
          </AnimationContainer>
        )
      }
    </Container>
  )
}

export default Chars;
