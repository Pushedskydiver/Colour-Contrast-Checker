import styled, { css } from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';
import { minWidth, maxWidth } from '../../../styles/settings.breakpoints.styles';

const Grade = styled.span`
  display: block;
  color: inherit;
  font-size: ${typography.heading.size.small};
  font-variation-settings: "wght" ${typography.weight.medium};
  line-height: 1;

  ${maxWidth('640', () => css`
    width: 85%;
  `)}

  ${minWidth('640', () => css`
    font-size: ${typography.heading.size.regular};
  `)}
`;

export default Grade;
