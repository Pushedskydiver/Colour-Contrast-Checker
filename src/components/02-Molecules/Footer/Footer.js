import React, { memo, useContext } from 'react';
import Link from '../../01-Atoms/Link/Link.styles';
import { GitHub, Twitter } from '../../01-Atoms/Icon/Icon';
import FooterStyles from './Footer.styles';
import Context from '../../Context';

function Footer() {
  const { colorState } = useContext(Context);

  return (
    <FooterStyles>
      <Link
        href="https://github.com/Pushedskydiver/Colour-Contrast-Checker"
        title="Go to GitHub project"
        iconLink
      >
        <GitHub fill={colorState} />
      </Link>

      <Link
        href="https://twitter.com/alexmclapperton"
        title="Go to Alex's Twitter profile"
        iconLink
      >
        <Twitter fill={colorState} />
      </Link>
    </FooterStyles>
  );
}

export default memo(Footer);
