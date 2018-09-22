import styled from 'styled-components';
import { colors } from '../../../styles/settings.colors.styles';
import { typography } from '../../../styles/settings.typography.styles';

const Input = styled.input`
  width: 100%;
  color: ${colors.dark};
  font-size: ${typography.heading.size.large};
`;

export default Input;
