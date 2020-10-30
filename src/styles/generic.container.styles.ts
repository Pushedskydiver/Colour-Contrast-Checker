import styled, { css } from 'styled-components';
import { minWidth } from './settings.breakpoints.styles';

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div`
  position: relative;
  padding-right: 5vw;
  padding-left: 5vw;

  ${minWidth(992, () => css`
    max-width: 1400px;
    margin: 0 auto;
    padding-right: 25px;
    padding-left: 25px;
  `)}
`;
