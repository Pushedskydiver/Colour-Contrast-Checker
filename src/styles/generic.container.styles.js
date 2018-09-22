import styled, { css } from 'styled-components';
import { minWidth } from './settings.breakpoints.styles';

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div`
  position: relative;
  padding-right: 5vw;
  padding-left: 5vw;

  ${props => props.fullHeight && css`
    min-height: 100vh;
  `}

  ${minWidth('992', () => css`
    max-width: 1400px;
    margin: 0 auto;
    padding-right: 15px;
    padding-left: 15px;
  `)}
`;