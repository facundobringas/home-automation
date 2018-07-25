import React from 'react';
import { Container, Heading } from 'rendition';
import Lighting from '../Lighting';

const Main = () => (
  <Container mx={10}>
    <Container width="90%" height="25px" m={20}>
      <Heading.h3>Lighting</Heading.h3>
    </Container>
    <Lighting />
  </Container>
);

export default Main;
