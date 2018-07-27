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
  height: 4em;
  @media (max-width: 52em) {
    display: none;
  }
`;

const LeftContainer = styled(Container)`
  @media (max-width: 52em) {
    display: none;
  }
`;

const CenterContainer = styled(Container)`
  flex-grow: 2;
  text-align: center;
`;

const RightContainer = styled(Container)`
  margin-right: 0;
`;

const DropDownButtonItem = styled.div`
  color: black;
`;

const MyNavbar = () => (
  <MyNavbarContainer color="white" bg="black" width={[0, 1, 1]}>
    <LeftContainer>{moment().format('dddd DD MMMM, YYYY')}</LeftContainer>
    <CenterContainer>{moment().format('hh:mm a')}</CenterContainer>
    <RightContainer>
      <DropDownButton bg="black" alignRight label="Name Surname" p={0}>
        <DropDownButtonItem>Profile</DropDownButtonItem>
        <DropDownButtonItem>Account</DropDownButtonItem>
        <DropDownButtonItem>Settings</DropDownButtonItem>
        <DropDownButtonItem>Log out</DropDownButtonItem>
      </DropDownButton>
    </RightContainer>
  </MyNavbarContainer>
);

export default MyNavbar;
