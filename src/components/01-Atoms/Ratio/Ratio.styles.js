import styled, { css } from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Ratio = styled.span`
  display: inline-block;
  margin-right: ${spacing.margin}px;
  margin-left: ${spacing.margin}px;
  color: inherit;
  font-size: ${typography.heading.size.medium};
  font-weight: ${typography.weight.medium};

  ${minWidth('768', () => css`
    margin-right: ${spacing.margin * 2}px;
    margin-left: ${spacing.margin * 2}px;
    font-size: ${typography.heading.size.big};
  `)}
`;

export default Ratio;
