import styled, { css } from 'styled-components';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Flex = styled.section`
  margin-bottom: ${spacing.margin * 3}px;

  ${minWidth('992', () => css`
    display: flex;
    flex-wrap: wrap;
  `)}

  ${props => props.justify === 'between' && css`
    ${minWidth('992', () => css`
      justify-content: space-between;
    `)}
  `}

  ${props => props.align === 'center' && css`
    ${minWidth('992', () => css`
      align-items: center;
    `)}
  `}
`;

export default Flex;