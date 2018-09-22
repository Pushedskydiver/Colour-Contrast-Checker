import styled, { css } from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';
import { minWidth } from '../../../styles/settings.breakpoints.styles';

const Grade = styled.span`
  display: inline-block;
  color: inherit;
  font-size: ${typography.heading.size.regular};
  font-weight: ${typography.weight.medium};

  ${minWidth('768', () => css`
    font-size: ${typography.heading.size.medium};
  `)}
`;

export default Grade;
