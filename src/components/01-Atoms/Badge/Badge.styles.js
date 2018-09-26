import styled, { css } from 'styled-components';
import { colors } from '../../../styles/settings.colors.styles';
import { typography } from '../../../styles/settings.typography.styles';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Badge = styled.span`
  display: inline-block;
  margin-bottom: ${spacing.margin}px;
  padding: ${spacing.padding / 3}px ${spacing.padding}px;
  border-radius: 4px;
  font-variation-settings: "wght" ${typography.weight.medium};
  line-height: normal;

  ${minWidth('992', () => css`
    padding-top: ${spacing.padding / 2}px;
    padding-bottom: ${spacing.padding / 2}px;
    font-size: ${typography.heading.size.small};
  `)}

  ${props => props.color === '#222222' && css`
    background-color: ${props.color};
    color: ${colors.light}
  `}

  ${props => props.color === '#ffffff' && css`
    background-color: ${props.color};
   color: ${colors.dark}
  `}
`;

export default Badge;
