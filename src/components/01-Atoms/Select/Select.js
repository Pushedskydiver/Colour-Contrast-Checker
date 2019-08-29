import React, { memo, useContext } from 'react';
import WebFont from 'webfontloader';
import SelectStyles, { SelectWrapper } from './Select.styles';
import { Chevron } from '../Icon/Icon';
import Context from '../../Context';

function Select() {
  const { fonts } = useContext(Context);

  async function changeFont({ target }) {
    const head = document.querySelector('head');
    const fontLinkTag = head.querySelector('link[rel="stylesheet"]');
    const option = target.options[target.selectedIndex];
    const font = option.value;
    const fontWeight = option.getAttribute('data-font-weight');

    await WebFont.load({
      google: { families: [`${font}:${fontWeight}`] },
      fontloading: () => {
        document.documentElement.className = '';
        if (fontLinkTag !== null) head.removeChild(fontLinkTag);
      },
      fontactive: () => {
        document.body.style.setProperty('--copy', `${font}, sans-serif`);
      }
    });
  }

  function renderFontOptions({ family, variant }, index) {
    return (
      <option key={index} value={family} data-font-weight={variant}>{family}</option>
    );
  }

  return (
    <SelectWrapper>
      <SelectStyles defaultValue="Select font" id="font" onChange={changeFont}>
        <option disabled>Select font</option>
        {fonts.map((font, index) => renderFontOptions(font, index))}
      </SelectStyles>
      <Chevron fill="currentColor" />
    </SelectWrapper>
  );
}

export default memo(Select);
