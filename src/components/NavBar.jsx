import React, {Component} from 'react';
import emotion, {css} from 'react-emotion';
import Bookmark from 'react-icons/lib/io/android-bookmark';
import Music from 'react-icons/lib/io/music-note';
import Links from 'react-icons/lib/io/link';
import Calendar from 'react-icons/lib/io/android-calendar';
import {withRouter} from 'react-router-dom';

const Container = emotion.div({
  borderTop: '1px solid #e6e6e6',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const iconClassName = active =>
  css({
    color: active ? '#65748a' : '#c2c7c8',
    padding: 20,
  });

const icons = [
  {
    Icon: Bookmark,
    path: '/',
  },
  {
    Icon: Music,
    path: '/music',
  },
  {
    Icon: Links,
    path: '/links',
  },
  {
    Icon: Calendar,
    path: '/schedule',
  },
];

class NavBar extends Component {
  render() {
    const {pathname} = this.props.history.location;

    return (
      <Container>
        {icons.map(({Icon, path}) => (
          <Icon
            key={path}
            onClick={() => {
              this.props.history.push(path);
            }}
            size={24}
            className={iconClassName(pathname === path)}
          />
        ))}
      </Container>
    );
  }
}

export default withRouter(NavBar);
