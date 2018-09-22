import styled, { css } from 'styled-components';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Example = styled.div`
  margin-bottom: ${spacing.margin * 2.5}px;

  &:last-child {
    margin-bottom: 0;
  }

  ${minWidth('992', () => css`
    width: 48%;
    margin-bottom: 0;
  `)}
`;

export default Example;