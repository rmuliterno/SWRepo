import React from 'react';

import { Container, Content, Main } from './styles';

const DefaultLayout: React.FC = ({ children }) => (
  <Container>
    {/* <Header />  Adicionar um header na página e talvez um footer*/}
    <Content>
      <Main>{children}</Main>
    </Content>
  </Container>
);

export default DefaultLayout;
