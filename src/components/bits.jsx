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
  '@media screen': {
    boxShadow: `0px 40px 160px ${theme.colors.background.shadow}`,
  },
  '@media print': {
    border: '1px solid gray',
  },
}));

export const CardButton = styled.button(({theme}) => ({
  position: 'relative',
  bottom: 0,
  backgroundColor: '#f7fbfc',
  margin: 0,
  padding: 20,
  width: '100%',
  border: 'none',
  borderRadius: '0 0 5px 5px',
  cursor: 'pointer',
  outline: 'none',
  transition: 'all .3s',
  ':hover': {
    backgroundColor: '#f1f1f1',
  },
}));
