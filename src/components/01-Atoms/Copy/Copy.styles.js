import styled, { css } from 'styled-components';

const Copy = styled.span`
  display: inline-block;
  max-width: 575px;

  ${props => props.normal && css`
    font-size: 1em;
  `}

  ${props => props.large && css`
    font-size: 14pt;
  `}
`;

export default Copy;
