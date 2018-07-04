import React from 'react';
import emotion from 'react-emotion';
import theme from '../config/theme';

const ModalOverlay = emotion.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,.3)',
});

const Header = emotion.h2({
  color: theme.colors.text.primary,
  marginTop: 0,
});

const Modal = emotion.div({
  position: 'fixed',
  top: 50,
  left: 'calc(50% - 165px)',
  margin: 'auto',
  width: 280,
  backgroundColor: '#fff',
  padding: 30,
  opacity: 1,
  borderRadius: 5,
});

const Ul = emotion.ul({
  margin: 0,
  paddingLeft: 13,
});

export default ({dismiss, errors}) => (
  <ModalOverlay onClick={dismiss}>
    <Modal>
      <Header>Oops...</Header>
      <Ul>{errors.map(message => <li key={message}>{message}</li>)}</Ul>
    </Modal>
  </ModalOverlay>
);
