import { memo } from 'react';
import { Heading1 } from '../../01-Atoms/Heading/Heading.styles';
import SkipLink from '../../01-Atoms/SkipLink/SkipLink.styles';
import Link from '../../01-Atoms/Link/Link.styles';
import Flex, { JustifyContentProps } from '../../03-Organisms/Flex/Flex.styles';
import HeaderStyles from './Header.styles';

function Header() {
  return (
    <HeaderStyles>
      <SkipLink href="#ratio">Skip to colour contrast ratio</SkipLink>
      <SkipLink href="#grades">Skip to colour contrast grades</SkipLink>
      <SkipLink href="#background">Skip to background colour input</SkipLink>
      <SkipLink href="#foreground">Skip to foreground colour input</SkipLink>
      <SkipLink href="#largeCopy">Skip to large text example copy</SkipLink>
      <SkipLink href="#normalCopy">Skip to normal text example copy</SkipLink>

      <Heading1 medium noMargin>Colour Contrast Checker</Heading1>

      <Flex
        justify={JustifyContentProps['between']}
        noMargin
      >
        <Link
          href="https://buymeacoffee.com/alexclapperton"
          coffeeLink
        >
          ☕️ Buy me a coffee.
        </Link>

        <Link
          href="https://chrome.google.com/webstore/detail/colour-contrast-checker/nmmjeclfkgjdomacpcflgdkgpphpmnfe"
          title="Go to the chrome webstore to download the colour contrast checker as a chrome extension"
          chromeBadgeLink
        >
          <img src="/images/chrome-webstore-badge.jpg" alt="Chrome webstore badge" />
        </Link>
      </Flex>
    </HeaderStyles>
  );
}

export default memo(Header);
