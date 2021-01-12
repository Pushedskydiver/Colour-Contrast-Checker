import React, { useContext, useEffect, useState, memo } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import InputStyles from './Input.styles';
import { Clipboard } from '../Icon/Icon';
import { CopyButton } from '../Button/Button.styles';
import Tooltip from '../Tooltip/Tooltip.styles';
import { BlockDiv } from '../../02-Molecules/Block/Block.styles';
import { isHex, hexToHsl, hslToHex } from '../../Utils';
import Context from '../../Context';

export interface InputProps {
  id: string,
  name: string
}

function Input(props: InputProps) {
  const { id } = props;
  const { background, foreground, colorState, handleContrastCheck } = useContext(Context);
  const value = id === 'background' ? background : foreground;

  const [hex, setHexState] = useState(hslToHex(value as number[]));
  const [copied, setCopiedState] = useState(false);

  function updateState(value: number[]) {
    setHexState(hslToHex(value));
    setCopiedState(false);
  }

  function handleHexChange({ target }: { target: HTMLInputElement }) {
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

    if (handleContrastCheck) {
      handleContrastCheck(hexToHsl(target.value) as number[], name as string);
    }
  }

  function setCopyState() {
    setCopiedState(true);

    const delaySetState = setTimeout(() => {
      setCopiedState(false);
      clearTimeout(delaySetState);
    }, 2000);
  }

  useEffect(() => {
    updateState(value as number[]);
  }, [value]);

  return (
    <BlockDiv color={colorState} noMargin>
      <InputStyles
        type="text"
        minLength={7}
        value={hex}
        id={id}
        spellCheck="false"
        onChange={handleHexChange}
      />

      <CopyToClipboard text={hex} onCopy={setCopyState}>
        <CopyButton
          type="button"
          aria-labelledby={`${id}CopiedSate`}
        >
          <Clipboard />

          <Tooltip
            id={`${id}CopiedSate`}
            aria-hidden={copied}
            aria-live="polite"
            role="tooltip"
            visible={copied}
            color={colorState}
          >

            {copied ? 'Copied' : `Copy ${hex} to clipboard`}
          </Tooltip>
        </CopyButton>
      </CopyToClipboard>
    </BlockDiv>
  );
}

export default memo(Input);
