import React, {Component} from 'react';
import emotion, {css} from 'react-emotion';
import Bookmark from 'react-icons/lib/io/android-bookmark';
import Calendar from 'react-icons/lib/io/android-calendar';
import Info from 'react-icons/lib/io/informatcircled';
import Music from 'react-icons/lib/io/music-note';
import {withRouter} from 'react-router-dom';

const Container = emotion.div({
  borderTop: '1px solid #e6e6e6',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
});

const Spacer = emotion.div({
  margin: 'auto',
  maxWidth: 600,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const iconClassName = active =>
  css({
    color: active ? '#65748a' : '#c2c7c8',
    padding: 20,
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
    flexGrow: 1,
  });

const icons = [
  {
    Icon: Bookmark,
    path: '',
  },
  {
    Icon: Music,
    path: '/hymns',
  },
  {
    Icon: Calendar,
    path: '/schedule',
  },
  {
    Icon: Info,
    path: '/info',
  },
];

class NavBar extends Component {
  render() {
    const {pathname} = this.props.history.location;
    const location = pathname.split('/')[1];

    return (
      <Container>
        <Spacer>
          {icons.map(({Icon, path}) => {
            const fullPath = `/${location}${path}`;

            return (
              <Icon
                key={path}
                onClick={() => {
                  this.props.history.push(fullPath);
                }}
                size={24}
                className={iconClassName(pathname === fullPath)}
              />
            );
          })}
        </Spacer>
      </Container>
    );
  }
}

export default withRouter(NavBar);
