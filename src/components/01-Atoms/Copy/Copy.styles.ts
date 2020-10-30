import styled, { css } from 'styled-components';
import spacing from '../../../styles/settings.spacing.styles';

export interface CopyProps {
  normal?: boolean,
  large?: boolean
}

const Copy = styled.textarea<CopyProps>`
  display: block;
  width: 100%;
  max-width: 575px;
  height: auto;
  margin-top: ${spacing.margin * 1.5}px;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: ${spacing.padding / 2}px;
  padding-left: 0;
  border: none;
  background-color: transparent;
  font-family: var(--copy);
  line-height: inherit;
  resize: none;

  ${props => props.normal && css`
    font-size: 1em;
  `}

  ${props => props.large && css`
    font-size: 14pt;
  `}
`;

export default Copy;
