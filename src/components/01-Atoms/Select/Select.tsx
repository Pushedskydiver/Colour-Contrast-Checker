import { memo, useContext } from 'react';
import WebFont from 'webfontloader';
import SelectStyles, { SelectWrapper } from './Select.styles';
import { Chevron } from '../Icon/Icon';
import Context, { FontsProps } from '../../Context';

function Select() {
  const { fonts } = useContext(Context);

  function changeFont({ target }: { target: HTMLSelectElement }) {
    const head = document.querySelector('head') as HTMLHeadElement;
    const fontLinkTag = head.querySelector('link[rel="stylesheet"]');
    const option = target.options[target.selectedIndex];
    const font = option.value;
    const fontWeight = option.getAttribute('data-font-weight');

    WebFont.load({
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

  const renderFontOptions = ({ family, variant }: FontsProps, index: number) => (
    <option key={index} value={family} data-font-weight={variant}>{family}</option>
  );

  return (
    <SelectWrapper>
      <SelectStyles defaultValue="Select font" id="font" onChange={changeFont}>
        <option disabled>Select font</option>
        {fonts && fonts.map((font, index) => renderFontOptions(font, index))}
      </SelectStyles>
      <Chevron />
    </SelectWrapper>
  );
}

export default memo(Select);
