import styled, { css } from 'styled-components';
import { colors } from '../../../styles/settings.colors.styles';
import { typography } from '../../../styles/settings.typography.styles';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Button = styled.button`
  display: block;
  width: 100%;
  margin-bottom: ${spacing.margin * 1.5}px;
  padding: ${spacing.padding * 1.5}px;
  border: none;
  border-radius: 4px;
  font-size: ${typography.body.size.small};
  font-variation-settings: "wght" ${typography.weight.medium};
  cursor: pointer;
  appearance: none;

  ${minWidth('768', () => css`
    display: inline-block;
    width: auto;
    margin-bottom: 0;
    vertical-align: middle;
  `)}

  ${props => props.color === '#222222' && css`
    background-color: ${props.color};
    color: ${colors.light}
  `}

  ${props => props.color === '#ffffff' && css`
    background-color: ${props.color};
    color: ${colors.dark}
  `}

  ${props => props.color !== '#222222' && props.color !== '#ffffff' && css`
    background-color: ${props.color};
    color: var(--background);
  `}
`;

export default Button;
