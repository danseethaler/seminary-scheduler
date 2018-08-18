import {uniqueId} from 'lodash';
import React from 'react';
import styled from 'react-emotion';

const AccordionContent = styled.div(({expanded, maxHeight}) => ({
  maxHeight: expanded ? maxHeight : 0,
  overflow: 'auto',
  transition: `max-height 200ms ease`,
}));

export default class extends React.Component {
  state = {
    initialHeight: 0,
    id: uniqueId(),
  };

  componentDidUpdate() {
    const currentHeight = document.getElementById(this.state.id).scrollHeight;
    if (currentHeight !== this.state.initialHeight) {
      this.setState({initialHeight: currentHeight});
    }
  }

  render() {
    return (
      <AccordionContent
        id={this.state.id}
        expanded={this.props.expanded}
        maxHeight={this.props.maxHeight || this.state.initialHeight}
      >
        {this.props.children}
      </AccordionContent>
    );
  }
}
