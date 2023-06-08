import { memo } from 'react';
import Link from '../../01-Atoms/Link/Link.styles';
import { GitHub, Twitter } from '../../01-Atoms/Icon/Icon';
import { Span } from '../../01-Atoms/Heading/Heading.styles';
import { useColourContrast } from '../../Context';
import FooterStyles from './Footer.styles';

function Footer() {
  const { colorState } = useColourContrast();

  return (
    <FooterStyles>
      <div>
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
      </div>

      <Span color={colorState}>
        UI created by <Link href="https://www.willtarpey.com/" rel="external">Will Tarpey</Link>. Thank you Will ❤️
      </Span>
    </FooterStyles>
  );
}

export default memo(Footer);
