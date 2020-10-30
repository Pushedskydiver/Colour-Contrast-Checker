import styled, { css } from 'styled-components';
import spacing from '../../../styles/settings.spacing.styles';

export interface ControlsProps {
  color: string
}

const ControlStyles = styled.div<ControlsProps>`
  margin-top: ${spacing.margin * 3}px;

  ${props => props.color && css`
    color: ${props.color};
  `}
`;

export default ControlStyles;
