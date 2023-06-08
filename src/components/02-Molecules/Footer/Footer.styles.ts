import styled, { css } from 'styled-components';
import { minWidth, maxWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const FooterStyles = styled.footer`
  position: relative;
  padding-top: ${spacing.padding * 2.5}px;
  padding-bottom: ${spacing.padding * 2.5}px;

  & > span {
    margin-bottom: 0;
  }

  ${maxWidth(640, () => css`
    & > div {
      margin-bottom: ${spacing.margin}px;
    }
  `)}

  ${minWidth(640, () => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `)}

  ${minWidth(768, () => css`
    padding-top: ${spacing.padding * 3}px;
    padding-bottom: ${spacing.padding * 3}px;
  `)}
`;

export default FooterStyles;
