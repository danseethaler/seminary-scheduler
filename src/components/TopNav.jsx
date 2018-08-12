import React from 'react';
import styled from 'react-emotion';

const Nav = styled.nav({
  margin: '1em 0',
});

export default () => (
  <Nav>
    <img
      alt="logo"
      src={require('../assets/logo.png')}
      style={{
        height: 40,
      }}
    />
  </Nav>
);
