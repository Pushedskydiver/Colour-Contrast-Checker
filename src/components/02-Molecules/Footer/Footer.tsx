import { memo } from 'react';
import Link from '../../01-Atoms/Link/Link.styles';
import { GitHub, Twitter } from '../../01-Atoms/Icon/Icon';
import FooterStyles from './Footer.styles';

function Footer() {
  return (
    <FooterStyles>
      <Link
        href="https://github.com/Pushedskydiver/Colour-Contrast-Checker"
        title="Go to GitHub project"
        iconLink
      >
        <GitHub />
      </Link>

      <Link
        href="https://twitter.com/alexmclapperton"
        title="Go to Alex's Twitter profile"
        iconLink
      >
        <Twitter />
      </Link>
    </FooterStyles>
  );
}

export default memo(Footer);
