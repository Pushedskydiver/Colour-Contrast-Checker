import React, { memo } from 'react';
import { Heading1 } from '../../01-Atoms/Heading/Heading.styles';
import SkipLink from '../../01-Atoms/SkipLink/SkipLink.styles';
import Link from '../../01-Atoms/Link/Link.styles';
import HeaderStyles from './Header.styles';

const Header = props => (
  <HeaderStyles>
    <SkipLink href="#ratio" color={props.colorState}>Skip to colour contrast ratio</SkipLink>
    <SkipLink href="#grades" color={props.colorState}>Skip to colour contrast grades</SkipLink>
    <SkipLink href="#background" color={props.colorState}>Skip to background colour input</SkipLink>
    <SkipLink href="#foreground" color={props.colorState}>Skip to foreground colour input</SkipLink>
    <SkipLink href="#largeCopy" color={props.colorState}>Skip to large text example copy</SkipLink>
    <SkipLink href="#normalCopy" color={props.colorState}>Skip to normal text example copy</SkipLink>

    <Heading1 medium noMargin>Colour Contrast Checker</Heading1>

    <Link
      href="https://chrome.google.com/webstore/detail/colour-contrast-checker/nmmjeclfkgjdomacpcflgdkgpphpmnfe"
      title="Go to the chrome webstore to download the colour contrast checker as a chrome extension"
      chromeBadgeLink
    >
      <img src="/images/chrome-webstore-badge.jpg" alt="Chrome webstore badge" />
    </Link>
  </HeaderStyles>
);

export default memo(Header);
