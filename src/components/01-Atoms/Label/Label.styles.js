import styled, { css } from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';

const Label = styled.label`
  display: block;
  color: inherit;
  cursor: pointer;

  ${props => props.bold && css`
    font-variation-settings: "wght" ${typography.weight.medium};
  `}
`;

export default Label;
