import React from 'react';
import { Heading1 } from '../../01-Atoms/Heading/Heading.styles';
import SkipLink from '../../01-Atoms/SkipLink/SkipLink.styles';
import HeaderStyles from './Header.styles';

const Header = props => (
  <HeaderStyles>
    <Heading1 medium noMargin>Colour Contrast Checker</Heading1>

    <SkipLink href="#ratio" color={props.colorState}>Skip to colour contrast ratio</SkipLink>
    <SkipLink href="#grades" color={props.colorState}>Skip to colour contrast grades</SkipLink>
    <SkipLink href="#background" color={props.colorState}>Skip to background colour input</SkipLink>
    <SkipLink href="#foreground" color={props.colorState}>Skip to foreground colour input</SkipLink>
    <SkipLink href="#largeCopy" color={props.colorState}>Skip to large text example copy</SkipLink>
    <SkipLink href="#normalCopy" color={props.colorState}>Skip to normal text example copy</SkipLink>
  </HeaderStyles>
);

export default Header;
