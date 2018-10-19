import styled, { css, keyframes } from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';
import { colors } from '../../../styles/settings.colors.styles';
import spacing from '../../../styles/settings.spacing.styles';

const FadeInOut = keyframes`
  0,100%% {
    opacity: 0;
  }

  5%,95% {
    opacity: 1;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  top: -40px;
  left: 50%;
  padding: ${spacing.padding / 2}px ${spacing.padding}px;
  font-size: ${typography.body.size.regular};
  font-variation-settings: "wght" ${typography.weight.medium};
  opacity: 0;
  transform: translateX(-50%);

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -5px;
    border: 5px solid transparent;
    pointer-events: none;
  }

  ${props => props.color === '#222222' && css`
    background-color: ${props.color};
    color: ${colors.light};

    &:after {
      border-top-color: ${props.color};
    }
  `}

  ${props => props.color === '#ffffff' && css`
    background-color: ${props.color};
    color: ${colors.dark};

    &:after {
      border-top-color: ${props.color};
    }
  `}

  ${props => props.color !== '#222222' && props.color !== '#ffffff' && css`
    background-color: ${props.color};
    color: var(--background);

    &:after {
      border-top-color: ${props.color};
    }
  `}

  ${props => props.visible && css`
    animation: ${FadeInOut} 2s ease-in-out;
  `}
`;

export default Tooltip;
