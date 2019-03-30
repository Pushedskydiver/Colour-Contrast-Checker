import styled, { css } from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

export const Heading1 = styled.h1`
  font-family: var(--font);

  ${props => !props.grade && css`
    font-variation-settings: "wght" ${typography.weight.bold};
    line-height: ${typography.lineHeight.heading};
  `}

  ${props => !props.noMargin && css`
    margin: 0 0 ${(spacing.margin * 1.5)}px 0;
  `}

  ${props => props.noMargin && css`
    margin: 0;
  `}

  ${props => props.tiny && css`
    font-size: ${typography.heading.size.tiny};
  `}

  ${props => props.small && css`
    font-size: ${typography.heading.size.small};
  `}

  ${props => props.regular && css`
    font-size: ${typography.heading.size.regular};
  `}

  ${props => props.medium && css`
    font-size: ${typography.heading.size.medium};
  `}

  ${props => props.big && css`
    font-size: ${typography.heading.size.big};
  `}

  ${props => props.large && css`
    font-size: ${typography.heading.size.large};
  `}

  ${props => props.xl && css`
    font-size: ${typography.heading.size.xl};
  `}

  ${props => props.grade && css`
    color: var(--foreground);
    font-size: ${typography.heading.size.large};
    font-variation-settings: "wght" ${typography.weight.thick};
    line-height: 0.85;

    ${minWidth('992', () => css`
      font-size: ${typography.heading.size.xl};
    `)}
  `}
`;

export const Heading2 = Heading1.withComponent('h2');
export const Heading3 = Heading1.withComponent('h3');
export const Heading4 = Heading1.withComponent('h4');
export const Heading5 = Heading1.withComponent('h5');
export const Span = Heading1.withComponent('span');
