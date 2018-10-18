import styled, { css } from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';

const Label = styled.label`
  display: inline-block;
  color: inherit;
  cursor: pointer;

  ${props => props.medium && css`
    font-variation-settings: "wght" ${typography.weight.medium};
  `}

  ${props => props.bold && css`
    font-variation-settings: "wght" ${typography.weight.bold};
  `}

  ${props => props.heading && css`
    font-size: ${typography.heading.size.regular};
  `}

  ${props => props.select && css`
    font-size: ${typography.heading.size.small};
  `}
`;

export default Label;
