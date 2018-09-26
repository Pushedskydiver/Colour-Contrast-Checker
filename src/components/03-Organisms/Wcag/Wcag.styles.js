import styled, { css } from 'styled-components';
import { minWidth, maxWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Wcag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;

  ${maxWidth('992', () => css`
    margin-top: ${spacing.margin * 2.5}px;
  `)}

  ${minWidth('992', () => css`
    text-align: right;
    justify-content: flex-end;
  `)}
`;

export default Wcag;