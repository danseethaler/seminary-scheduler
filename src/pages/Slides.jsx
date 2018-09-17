import {IoMdArrowDown} from 'react-icons/io';
import React, {Component} from 'react';
import emotion from 'react-emotion';
import theme from '../config/theme';

const OuterWrapper = emotion.div({
  padding: 80,
  fontSize: '4em',
  color: '#4e545e',
});

const AppendModeContainer = emotion.span({
  position: 'fixed',
  right: 12,
  bottom: 12,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  padding: 10,
  backgroundColor: theme.colors.background.shadow,
  borderRadius: 30,
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

const AppendModeIndicator = () => (
  <AppendModeContainer>
    <IoMdArrowDown size={32} color="#FFFFFF" />
  </AppendModeContainer>
);

class Slides extends Component {
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
      const text = pastedQuote;
      const lastQuoteIndexAfterPaste = this.state.quotes.length;
      const currentQuote = this.state.quotes[this.state.quoteIndex];

      const newQuote = {type, text};

      if (
        type === 'text' &&
        this.state.appendMode &&
        currentQuote &&
        currentQuote.type === 'text'
      ) {
        this.setState({
          quotes: this.state.quotes.map((quote, index) => {
            if (index === this.state.quoteIndex) {
              return {
                type: 'text',
                text: quote.text + '\n\n' + text,
              };
            }
            return quote;
          }),
        });
      } else {
        this.setState({
          quoteIndex: lastQuoteIndexAfterPaste,
          quotes: [...this.state.quotes, newQuote],
        });
      }
    }
  };

  handleArrow = e => {
    if ([37, 38, 39, 40, 68].indexOf(e.keyCode) === -1) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    switch (e.keyCode) {
      case 68: // d key -> delete current slide
        if (this.state.quotes.length) {
          const quotes = this.state.quotes.filter(
            (quote, index) => index !== this.state.quoteIndex
          );
          let {quoteIndex} = this.state;
          if (!quotes[this.state.quoteIndex]) {
            quoteIndex = this.state.quoteIndex - 1;
          }

          this.setState({quotes, quoteIndex});
        }
        break;

      case 37: // Left arrow
        if (this.state.quoteIndex > 0) {
          this.setState({quoteIndex: this.state.quoteIndex - 1});
        }
        break;

      case 39: // Right arrow
        if (this.state.quoteIndex < this.state.quotes.length - 1) {
          this.setState({quoteIndex: this.state.quoteIndex + 1});
        }
        break;

      case 38: // Up arrow
        this.setState({quoteIndex: this.state.quotes.length - 1});
        break;

      case 40: // Down arrow
        const currentQuote = this.state.quotes[this.state.quoteIndex];
        if (currentQuote && currentQuote.type === 'text') {
          this.setState({appendMode: !this.state.appendMode});
        }
        break;
    }
  };

  render() {
    const {type, text} = this.state.quotes[this.state.quoteIndex] || '';

    if (!text) {
      return (
        <OuterWrapper id="slides_container" style={{color: 'gray'}}>
          Paste to begin
        </OuterWrapper>
      );
    }

    if (type === 'image') {
      return (
        <OuterWrapper id="slides_container" style={{color: 'gray'}}>
          <Img src={text} />
        </OuterWrapper>
      );
    }

    return (
      <React.Fragment>
        <OuterWrapper
          id="slides_container"
          dangerouslySetInnerHTML={{
            __html: text.replace(
              /\n/g,
              '<div style="margin-top: 0.5em;"></div>'
            ),
          }}
        />
        {this.state.appendMode && <AppendModeIndicator />}
      </React.Fragment>
    );
  }
}

export default Slides;
