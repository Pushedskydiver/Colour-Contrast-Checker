import styled, { css } from 'styled-components';
import spacing from '../../../styles/settings.spacing.styles';

const Divider = styled.hr`
  display: block;
  margin-top: 0;
  margin-bottom: ${spacing.margin * 4}px;
  padding-top: ${spacing.padding * 1.5}px;
  background-color: transparent;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom-width: 2px;
  opacity: 0.25;

  ${props => props.color && css`
    border-color: ${props.color};
  `}
`;

export default Divider;
