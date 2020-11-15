import styled, { css } from 'styled-components';
import { minWidth, maxWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Result = styled.span`
  ${maxWidth(640, () => css`
    flex: 1;
  `)}

  ${minWidth(992, () => css`
    margin-left: ${spacing.margin * 2.5}px;
    text-align: center;

    &:first-child {
      margin-left: 0;
    }
  `)}
`;

export default Result;
