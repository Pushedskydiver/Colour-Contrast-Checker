import React, { useEffect, useState, memo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import InputStyles from './Input.styles';
import { Clipboard } from '../Icon/Icon';
import { CopyButton } from '../Button/Button.styles';
import Tooltip from '../Tooltip/Tooltip.styles';
import { BlockDiv } from '../../02-Molecules/Block/Block.styles';
import { isHex, hexToHsl, hslToHex } from '../../Utils';

const InputMemo = props => (
  <InputStyles
    type="text"
    minLength="7"
    value={props.hex}
    id={props.id}
    spellCheck="false"
    onChange={props.onChange}
  />
);

const Input = props => {
  const [hex, setHexState] = useState(hslToHex(props.value));
  const [copied, setCopiedState] = useState(false);

  const updateState = value => {
    setHexState(hslToHex(value));
    setCopiedState(false);
  };

  function handleHexChange({ target }) {
    const name = target.getAttribute('id');
    const valueHasHash = target.value.indexOf('#') !== -1;
    const isHexCode = isHex(target.value);
    const isNum = /^\d+$/.test(target.value);
    const isShortHand = /(^#[0-9a-f]{3}|[0-9a-f]{3])$/gim.test(target.value);
    const isRed = target.value.toLowerCase() === 'red';

    setHexState(target.value);
    setCopiedState(false);

    if (target.value.length === 6 && !valueHasHash && isHexCode && isNum) {
      target.value = `#${target.value}`;
    }

    if (target.value.length <= 3 && !valueHasHash && !isRed) {
      return;
    }

    if (isShortHand && !isRed) {
      return;
    }

    if (target.value.length < 7 && !isHexCode) {
      return;
    }

    if (!isHexCode) {
      return;
    }

    props.onChange(hexToHsl(target.value), name);
  }

  function setCopyState() {
    setCopiedState(true);

    const delaySetState = setTimeout(() => {
      setCopiedState(false);
      clearTimeout(delaySetState);
    }, 2000);
  }

  useEffect(() => {
    updateState(props.value);
  }, [props.value]);

  return (
    <BlockDiv noMargin>
      <InputMemo
        hex={hex}
        id={props.id}
        onChange={handleHexChange}
      />

      <CopyToClipboard text={hex} onCopy={setCopyState}>
        <CopyButton
          type="button"
          aria-labelledby={`${props.id}CopiedSate`}
        >
          <Clipboard fill={props.color} />

          <Tooltip
            id={`${props.id}CopiedSate`}
            aria-hidden={copied}
            aria-live="polite"
            role="tooltip"
            color={props.color}
            visible={copied}
          >

            {copied ? 'Copied' : `Copy ${hex} to clipboard`}
          </Tooltip>
        </CopyButton>
      </CopyToClipboard>
    </BlockDiv>
  );
};

export default memo(Input);
