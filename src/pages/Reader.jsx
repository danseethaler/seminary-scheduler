import React, {Component} from 'react';
import emotion from 'react-emotion';

const OuterWrapper = emotion.div({
  padding: 80,
  fontSize: '4em',
  color: '#4e545e',
});

const Img = emotion.img({
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  maxWidth: '100%',
  maxHeight: '100%',
  margin: 'auto',
  overflow: 'auto',
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

    var urlExpression = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
    var urlRegex = new RegExp(urlExpression);

    if (pastedQuote) {
      const isImage = pastedQuote.match(urlRegex);
      const type = isImage ? 'image' : 'text';
      const text = isImage
        ? pastedQuote
        : pastedQuote.replace(/\n/g, '<div style="margin-top: 0.5em;" />');
      const lastQuoteIndexAfterPaste = this.state.quotes.length;

      const newQuote = {type, text};

      this.setState({
        quoteIndex: lastQuoteIndexAfterPaste,
        quotes: [...this.state.quotes, newQuote],
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
    const {type, text} = this.state.quotes[this.state.quoteIndex] || '';

    if (!text) {
      return (
        <OuterWrapper id="reader_container" style={{color: 'gray'}}>
          Paste to begin
        </OuterWrapper>
      );
    }

    if (type === 'image') {
      return (
        <OuterWrapper id="reader_container" style={{color: 'gray'}}>
          <Img src={text} />
        </OuterWrapper>
      );
    }

    return (
      <OuterWrapper
        id="reader_container"
        dangerouslySetInnerHTML={{__html: text}}
      />
    );
  }
}

export default Reader;
