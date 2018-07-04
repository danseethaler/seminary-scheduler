import React from 'react';
import emotion from 'react-emotion';
import {Card, Title} from '../components/Bits';
import theme from '../config/theme';
import {getInfoConfig} from '../services/schedule';

const Table = emotion.table({
  width: '100%',
});

const Tr = emotion.tr({});

const Th = emotion.th({
  textAlign: 'left',
  padding: 10,
  border: '0 0 1px 0',
  borderBottom: '1px solid #e6e6e6',
  color: theme.colors.text.primary,
  fontWeight: 400,
});

const HeaderCell = emotion.td({
  textAlign: 'left',
  padding: 10,
  border: '0 0 1px 0',
  borderBottom: '1px solid #e6e6e6',
  color: theme.colors.text.primary,
  fontWeight: 600,
});

const Td = emotion.td({
  textAlign: 'center',
  padding: 10,
  border: '0 0 1px 0',
  borderBottom: '1px solid #e6e6e6',
  color: theme.colors.text.primary,
});

const InfoTable = ({config}) => (
  <React.Fragment>
    <Table cellSpacing={0} cellPadding={0}>
      <tbody>
        {config.errorMessages.length ? (
          <Tr>
            <HeaderCell colSpan={2}>Errors</HeaderCell>
          </Tr>
        ) : null}
        {config.errorMessages.map(message => (
          <Tr key={message}>
            <Th style={{color: theme.colors.text.danger}} colSpan={2}>
              {message}
            </Th>
          </Tr>
        ))}

        <Tr>
          <HeaderCell colSpan={2}>Class Breakdown</HeaderCell>
        </Tr>
        {Object.keys(config.lessonCount).map(key => (
          <Tr key={key}>
            <Th>{key.charAt(0).toUpperCase() + key.slice(1)}</Th>
            <Td>{config.lessonCount[key] || 0}</Td>
          </Tr>
        ))}

        <Tr>
          <HeaderCell colSpan={2}>Teacher Breakdown</HeaderCell>
        </Tr>
        {Object.keys(config.teacherConfig).map(teacher => (
          <Tr key={teacher}>
            <Th>{teacher}</Th>
            <Td>{config.teacherConfig[teacher].classCount || 0}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  </React.Fragment>
);

export default () => (
  <React.Fragment>
    <Title>Info</Title>
    <Card>
      <InfoTable config={getInfoConfig()} />
    </Card>
  </React.Fragment>
);
