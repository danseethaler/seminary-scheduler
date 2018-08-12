import React from 'react';
import {Link} from 'react-router-dom';
import bases from '../config/bases';
import TopNav from './TopNav';
import {css} from 'emotion';
import theme from '../config/theme';

const linkClass = css({
  textDecoration: 'none',
  margin: '1em 0',
  display: 'block',
  color: theme.colors.text.link,
  opacity: 0.7,
  ':hover': {
    opacity: 1,
  },
});

export const SelectBase = () => (
  <div>
    <TopNav />
    {Object.keys(bases).map(base => {
      const {baseKey, title} = bases[base];

      return (
        <Link key={baseKey} className={linkClass} to={`/${base}`}>
          {title}
        </Link>
      );
    })}
  </div>
);
