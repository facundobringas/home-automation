import React from 'react';
import { Container } from 'rendition';
import styled from 'styled-components';
import Lighting from '../Lighting';

const MainContainer = styled(Container)`
  padding: 0;
`;

const Main = () => (
  <MainContainer>
    <Lighting />
  </MainContainer>
);

export default Main;
