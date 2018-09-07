import React, {Component} from 'react';
import emotion from 'react-emotion';

const OuterWrapper = emotion.div({
  display: 'flex',
  flexDirection: 'column',
  padding: 80,
  fontSize: '4em',
  color: '#4e545e',
});

class Reader extends Component {
  state = {
    quoteIndex: -1,
    quotes: [],
  };

  componentDidMount() {
    document.addEventListener('paste', this.handlePaste);
    document.addEventListener('keydown', this.handleArrow);
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.handlePaste);
    document.removeEventListener('keydown', this.handleArrow);
  }

  handlePaste = e => {
    e.stopPropagation();
    e.preventDefault();

    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedQuote = clipboardData.getData('Text');

    if (pastedQuote) {
      const lastQuoteIndexAfterPaste = this.state.quotes.length;

      this.setState({
        quoteIndex: lastQuoteIndexAfterPaste,
        quotes: [
          ...this.state.quotes,
          pastedQuote.replace(/\n/g, '<div style="margin-top: 0.5em;" />'),
        ],
      });
    }
  };

  handleArrow = e => {
    // Left arrow
    if (e.keyCode === 37) {
      if (this.state.quoteIndex > 0) {
        this.setState({quoteIndex: this.state.quoteIndex - 1});

        e.stopPropagation();
        e.preventDefault();
      }
    }

    // Right arrow
    if (e.keyCode === 39) {
      if (this.state.quoteIndex < this.state.quotes.length - 1) {
        this.setState({quoteIndex: this.state.quoteIndex + 1});

        e.stopPropagation();
        e.preventDefault();
      }
    }

    // Up/down arrow
    if (e.keyCode === 38 || e.keyCode === 40) {
      this.setState({quoteIndex: this.state.quotes.length - 1});

      e.stopPropagation();
      e.preventDefault();
    }
  };

  render() {
    const quote = this.state.quotes[this.state.quoteIndex] || '';

    if (!quote) {
      return (
        <OuterWrapper id="reader_container" style={{color: 'gray'}}>
          Paste to begin
        </OuterWrapper>
      );
    }

    return (
      <OuterWrapper
        id="reader_container"
        dangerouslySetInnerHTML={{__html: quote}}
      />
    );
  }
}

export default Reader;
