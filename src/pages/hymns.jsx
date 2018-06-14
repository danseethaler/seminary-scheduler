import React, {Component} from 'react';
import hymns from '../data/hymns';
import Play from 'react-icons/lib/io/play';
import emotion, {css} from 'react-emotion';

const Wrapper = emotion.div({
  marginBottom: 40,
  backgroundColor: '#f3f3f3',
  borderRadius: 5,
});

const HymnWrapper = emotion.div({
  display: 'flex',
  flexDirection: 'row',
  // padding: '8px 0',
  borderBottom: '1px solid #ffffff',
});

const HymnTitle = emotion.div(({theme}) => ({
  color: theme.colors.text.primary,
  borderLeft: '2px solid #fff',
  padding: '5px 4px',
}));

const Player = ({url}) => (
  <audio controls autoPlay>
    <source src={url} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
);

const unavailableClassName = css({
  opacity: 0,
  padding: '3px 6px',
});

const playClassName = css({
  color: '#cacaca',
  padding: '3px 6px',
});

class Hymn extends Component {
  state = {
    playing: false,
  };

  render() {
    let PlayButton = <Play className={unavailableClassName} size={14} />;

    if (this.props.url) {
      PlayButton = (
        <Play
          className={playClassName}
          size={14}
          onClick={() => {
            this.setState({playing: !this.state.playing});
          }}
        />
      );
    }

    return (
      <React.Fragment>
        <HymnWrapper>
          {PlayButton}
          <HymnTitle>
            {this.props.number} - {this.props.title}
          </HymnTitle>
        </HymnWrapper>
        {this.state.playing ? <Player url={this.props.url} /> : null}
      </React.Fragment>
    );
  }
}

class Hymns extends Component {
  render() {
    return (
      <Wrapper>
        {hymns.map(hymn => <Hymn key={hymn.number} {...hymn} />)}
      </Wrapper>
    );
  }
}

export default Hymns;
