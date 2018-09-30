import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import InputStyles from './Input.styles';
import { Clipboard } from '../Icon/Icon';
import { CopyButton } from '../Button/Button.styles';
import { BlockDiv } from '../../02-Molecules/Block/Block.styles';
import { isHex, hexToHsl, hslToHex } from '../../Utils';

class Input extends Component {
  state = {
    hex: hslToHex(this.props.value),
    copied: false
  };

  handleHexChange = async ({ target }) => {
    const name = target.getAttribute('id');
    const valueHasHash = target.value.indexOf('#') !== -1;
    const isHexCode = isHex(target.value);
    const isnum = /^\d+$/.test(target.value);

    await this.setState({ hex: target.value, copied: false });

    if (target.value.length === 6 && !valueHasHash && isHexCode && isnum) {
      target.value = `#${target.value}`;
    }

    if (target.value.length < 7 && !isHex(target.value)) {
      return;
    }

    if (!isHex(target.value)) {
      return;
    }

    this.props.onChange(hexToHsl(target.value), name);
  }

  updateState = value => {
    this.setState({ hex: hslToHex(value) });
  }

  setCopiedState = () => {
    this.setState({ copied: true });
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    
    if (value !== prevProps.value) {
      this.updateState(value);
    }
  }

  render() {
    return (
      <BlockDiv noMargin>
        <InputStyles
          type="text"
          minLength="7"
          value={this.state.hex}
          id={this.props.id}
          onChange={this.handleHexChange}
        />

        <CopyToClipboard text={this.state.hex} onCopy={this.setCopiedState}>
          <CopyButton type="button" aria-label={`Copy ${this.state.hex} to clibboard`}>
            <Clipboard fill={this.props.color} />
          </CopyButton>
        </CopyToClipboard>
      </BlockDiv>
    );
  }
}

export default Input;