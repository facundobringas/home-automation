import React from 'react';
import { DropDownButton, Container } from 'rendition';
import styled from 'styled-components';
import { color } from 'styled-system';
import moment from 'moment';

const MyNavbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${color};
  height: 3.5em;
`;

const CenterContainer = styled(Container)`
  flex-grow: 2;
  text-align: center;
`;

const DropDownButtonItem = styled.div`
  color: black;
`;

const MyNavbar = () => (
  <MyNavbarContainer color="white" bg="black">
    <Container>{moment().format('dddd DD MMMM, YYYY')}</Container>
    <CenterContainer>{moment().format('hh:mm a')}</CenterContainer>
    <Container>
      <DropDownButton mx={2} bg="black" alignRight label={<div>Name Surname</div>}>
        <DropDownButtonItem>Profile</DropDownButtonItem>
        <DropDownButtonItem>Account</DropDownButtonItem>
        <DropDownButtonItem>Settings</DropDownButtonItem>
        <DropDownButtonItem>Log out</DropDownButtonItem>
      </DropDownButton>
    </Container>
  </MyNavbarContainer>
);

export default MyNavbar;
