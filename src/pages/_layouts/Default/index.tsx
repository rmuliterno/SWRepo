import React from 'react';

import { Container } from './styles';
import AnimationContainer from '../../../components/AnimationContainer';

const DefaultLayout: React.FC = ({ children }) => (
  <Container>
    {/* <Header />  Adicionar um header na página e talvez um footer*/}
    <AnimationContainer>
      {children}
    </AnimationContainer>
  </Container>
);

export default DefaultLayout;
