import styled from 'react-emotion';

export const Title = styled.h1(({theme, type = 'primary'}) => ({
  color: theme.colors.text[type],
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 300,
  fontSize: '1.8em',
}));

export const Card = styled.div(({theme}) => ({
  borderRadius: 5,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  opacity: 0.99,
  boxShadow: `0px 40px 160px ${theme.colors.background.shadow}`,
}));
