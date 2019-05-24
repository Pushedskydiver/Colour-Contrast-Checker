import styled, { css } from 'styled-components';
import spacing from '../../../styles/settings.spacing.styles';

const Link = styled.a`
  display: inline-block;

  ${props => props.iconLink && css`
    width: 30px;
    height: 30px;
    margin-right: ${spacing.margin * 1.5}px;
    text-decoration: none;
  `}

  ${props => props.chromeBadgeLink && css`
    display: none;

    @media (hover: hover) {
      display: block;
      width: 200px;
    }
  `}
`;

export default Link;
