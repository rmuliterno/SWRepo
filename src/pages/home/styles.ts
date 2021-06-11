import styled from 'styled-components';
import { fadeIn } from '../../components/AnimationContainer/styles';

export const Container = styled.div`
  height: 100%;
`;

export const LoadingContainer = styled.div`
  height: 100%;
  margin-top: 32px;
`;

export const Title = styled.h1`
  color: var(--textColor);
  margin-bottom: 32px;
`;

export const Info = styled.h3`
  color: var(--textColor);
  margin-bottom: 16px;
  font-weight: 400;
`;

export const MoviesGrid = styled.div`
  animation: ${fadeIn} 1s;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const MovieContainer = styled.div`
  margin: 14px 0;
`;

export const MovieTitle = styled.h3`
  color: var(--textColor);
  font-weight: 400;
`;

export const Button = styled.button`
  background-color: #0368b9;
  border: none;
  color: #eee;
  padding: 8px 20px;
  text-align: center;
  margin: 4px 0;
  font-size: 16px;
`;
