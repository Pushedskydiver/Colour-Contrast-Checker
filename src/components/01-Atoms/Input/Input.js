import React, { Component } from 'react';
import InputStyles from './Input.styles';
import { isHex, hexToHsl, hslToHex } from '../../Utils';

class Input extends Component {
  state = {
    hex: hslToHex(this.props.value)
  };

  handleHexChange = async ({ target }) => {
    const name = target.getAttribute('id');
    const valueHasHash = target.value.indexOf('#') !== -1;
    const isHexCode = isHex(target.value);
    const isnum = /^\d+$/.test(target.value);

    await this.setState({ hex: target.value });

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

  updateState = (value) => {
    this.setState({ hex: hslToHex(value) });
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props;
    
    if (value !== prevProps.value) {
      this.updateState(value);
    }
  }

  render() {
    return (
      <InputStyles
        type="text"
        minLength="7"
        value={this.state.hex}
        id={this.props.id}
        onChange={this.handleHexChange}
      />
    );
  }
}

export default Input;