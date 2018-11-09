import React from 'react';
import SelectStyles, { SelectWrapper } from './Select.styles';
import { Chevron } from '../Icon/Icon';

const Select = props => (
  <SelectWrapper>
    <SelectStyles
      defaultValue="Select font"
      id="font"
      onChange={props.onChange}
    >
      <option disabled>Select font</option>
      {props.fonts.map((font, index) => props.renderFontOptions(font, index))}
    </SelectStyles>
    <Chevron fill="currentColor" />
  </SelectWrapper>
);

export default Select;
