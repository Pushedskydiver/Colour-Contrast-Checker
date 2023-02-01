import styled, { css } from 'styled-components';
import { colors } from '../../../styles/settings.colors.styles';
import spacing from '../../../styles/settings.spacing.styles';

export interface LinkProps {
  iconLink?: boolean,
  chromeBadgeLink?: boolean,
  coffeeLink?: boolean,
}

const Link = styled.a<LinkProps>`
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
      margin-left: ${spacing.margin}px;
    }
  `}

  ${props => props.coffeeLink && css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: ${spacing.padding}px;
    background-color: ${colors.light};
    color: ${colors.dark};
  `}
`;

export default Link;
