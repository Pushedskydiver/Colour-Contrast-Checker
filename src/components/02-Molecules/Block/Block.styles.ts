import styled, { css } from 'styled-components';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

export interface BlockProps {
  noMargin?: boolean,
  color?: string,
  flex?: boolean,
  inputs?: boolean,
  select?: boolean,
  spaceBetween?: boolean,
}

export const BlockSection = styled.section<BlockProps>`
  position: relative;

  ${props => !props.noMargin && css`
    margin-bottom: ${spacing.margin * 3.5}px;
  `}

  ${props => props.color && css`
    color: ${props.color};
  `}

  ${props => props.flex && css`
    ${minWidth(992, () => css`
      display: flex;
      align-items: flex-end;
    `)}
  `}

  ${props => props.spaceBetween && css`
    ${minWidth(992, () => css`
      justify-content: space-between;
    `)}
  `}

  ${props => props.inputs && css`
    ${minWidth(992, () => css`
      width: 48%;
      margin-bottom: 0;
    `)}
  `}

  ${props => props.select && css`
    padding-bottom: ${spacing.padding / 2}px;
    border-bottom: 1px solid currentColor;

    ${minWidth(768, () => css`
      display: inline-flex;
      align-items: baseline;
    `)}
  `}
`;

export const BlockDiv = BlockSection.withComponent('div');
