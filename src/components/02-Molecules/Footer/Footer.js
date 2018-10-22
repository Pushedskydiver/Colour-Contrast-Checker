import React from 'react';
import Link from '../../01-Atoms/Link/Link.styles';
import { GitHub, Twitter } from '../../01-Atoms/Icon/Icon';
import FooterStyles from './Footer.styles';

const Footer = props => (
  <FooterStyles>
    <Link
      href="https://github.com/Pushedskydiver/Colour-Contrast-Checker"
      title="Go to GitHub project"
      iconLink
    >
      <GitHub fill={props.colorState} />
    </Link>

    <Link
      href="https://twitter.com/alexmclapperton"
      title="Go to Alex's Twitter profile"
      iconLink
    >
      <Twitter fill={props.colorState} />
    </Link>
  </FooterStyles>
);

export default Footer;
