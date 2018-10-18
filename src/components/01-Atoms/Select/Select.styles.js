import styled from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Select = styled.select`
  display: block;
  width: 100%;
  margin-top: ${spacing.margin / 2}px;
  padding-top: ${spacing.padding}px;
  padding-right: ${spacing.padding}px;
  padding-bottom: ${spacing.padding}px;
  padding-left: 0;
  border-bottom: 2px solid currentColor;
  color: inherit;
  font-size: ${typography.heading.size.small};
  font-variation-settings: "wght" ${typography.weight.medium};
  line-height: normal;
  cursor: pointer;
`;

export default Select;
