import styled, { css } from 'styled-components';

export interface IconProps {
  select?: boolean
}

const IconStyles = styled.svg<IconProps>`
  display: inline-block;
  vertical-align: middle;

  ${props => !props.select && css`
    width: 100%;
    height: 100%;
  `}

  ${props => props.select && css`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    z-index: -1;
  `}
`;

export default IconStyles;
