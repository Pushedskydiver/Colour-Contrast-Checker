import styled, { css } from 'styled-components';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Block = styled.section`
  margin-bottom: ${spacing.margin * 3}px;

  ${props => props.inputs && css`
    ${minWidth('992', () => css`
      width: 48%;
      margin-bottom: 0;
  `)}
  `}
`;

export default Block;