import React from 'react';
import {Title} from '../components/Bits';
import {getInfoConfig} from '../services/schedule';
import styled from 'react-emotion';

const ErrorMessage = styled.h4({
  color: '#da0612',
});

export default () => {
  const infoConfig = getInfoConfig();
  console.log('infoConfig', infoConfig);

  return (
    <React.Fragment>
      <Title>Info</Title>
      {infoConfig.errorMessages.map(message => (
        <ErrorMessage key={message}>{message}</ErrorMessage>
      ))}
    </React.Fragment>
  );
};
