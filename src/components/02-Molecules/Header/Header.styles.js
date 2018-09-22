import styled, { css } from 'styled-components';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Header = styled.header`
  position: relative;
  padding-top: ${spacing.padding * 2.5}px;
  padding-bottom: ${spacing.padding * 1.5}px;

  ${minWidth('768', () => css`
    padding-top: ${spacing.padding * 4}px;
  `)}
`;

export default Header;