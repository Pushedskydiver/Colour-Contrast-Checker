import React, { Component } from 'react';
import InputStyles from './Input.styles';
import { hslToHex } from '../../Utils';

class Input extends Component {
  state = {
    hex: hslToHex(this.props.value)
  };

  handleHexChange = async ({ target }) => {
    const name = target.getAttribute('id');

    await this.setState({ hex: target.value });

    if (target.value.length !== 7) {
      return;
    }

    this.props.handleContrastCheck(target, name);
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
        maxLength="7"
        value={this.state.hex}
        id={this.props.id}
        onChange={this.handleHexChange}
      />
    );
  }
}

export default Input;