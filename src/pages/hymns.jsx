import React, {Component} from 'react';
import emotion, {css} from 'react-emotion';
import Play from 'react-icons/lib/io/play';
import Stop from 'react-icons/lib/io/stop';
import {Card, Title} from '../components/Bits';
import hymns from '../data/hymns';

const OuterWrapper = emotion.div({
  display: 'flex',
  flexDirection: 'column',
});

const HymnWrapper = emotion.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottom: '1px solid #ececec',
});

const HymnLink = emotion.a(({theme, disabled}) => ({
  color: disabled ? theme.colors.text.secondary : theme.colors.text.primary,
  padding: '8px 4px',
  textDecoration: 'none',
}));

const Audio = emotion.audio({
  margin: 'auto',
  padding: 3,
});

const Player = ({url}) => (
  <Audio controls autoPlay>
    <source src={url} type="audio/mpeg" />
    Your browser does not support the audio element.
  </Audio>
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
    const {url, title, number, contentUrl} = this.props;

    let PlayButton = <Play className={unavailableClassName} size={14} />;

    const ActionButton = this.state.playing ? Stop : Play;

    if (url) {
      PlayButton = (
        <ActionButton
          className={playClassName}
          size={14}
          onClick={() => {
            this.setState({playing: !this.state.playing});
          }}
        />
      );
    }

    return (
      <OuterWrapper>
        <HymnWrapper>
          {PlayButton}
          <HymnLink href={contentUrl} target="_blank" disabled={!url}>
            {number} - {title}
          </HymnLink>
        </HymnWrapper>
        {this.state.playing ? <Player url={url} /> : null}
      </OuterWrapper>
    );
  }
}

class Hymns extends Component {
  render() {
    return (
      <React.Fragment>
        <Title>Hymns</Title>
        <Card style={{marginBottom: 70}}>
          {hymns.map(hymn => <Hymn key={hymn.number} {...hymn} />)}
        </Card>
      </React.Fragment>
    );
  }
}

export default Hymns;
