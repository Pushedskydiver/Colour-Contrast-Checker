import styled, { css } from 'styled-components';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

export const BlockSection = styled.section`
  position: relative;

  ${props => !props.noMargin && css`
    margin-bottom: ${spacing.margin * 3.5}px;
  `}

  ${props => props.flex && css`
    ${minWidth('992', () => css`
      display: flex;
      align-items: flex-end;
    `)}
  `}

  ${props => props.inputs && css`
    ${minWidth('992', () => css`
      width: 48%;
      margin-bottom: 0;
    `)}
  `}

  ${props => props.color && css`
    color: ${props.color};
  `}

  ${props => props.select && css`
    max-width: 400px;
  `}
`;

export const BlockDiv = BlockSection.withComponent('div');
