import React, { Component, Fragment } from 'react';
import round from 'lodash.round';
import InputStyles from './Input.styles';
import Label from '../Label/Label.styles';
import Range from '../Range/Range.styles';
import { isHex, hexToHsl, hslToHex } from '../../Utils';

const nanH = h => isNaN(h) ? 0 : h;
class Input extends Component {
  state = {
    hex: hslToHex(this.props.value)
  };

  handleHexChange = async ({ target }) => {
    const name = target.getAttribute('id');
    const valueHasHash = target.value.indexOf('#') !== -1;

    await this.setState({ hex: target.value });

    if (target.value.length === 6 && !valueHasHash && isHex(target.value)) {
      target.value = `#${target.value}`;
    }

    if (target.value.length !== 7) {
      return;
    }

    this.props.onChange(hexToHsl(target.value), name);
  }

  handleChange = i => ({ target }) => {
    const { value, name } = this.props;
    const hsl = [...value];

    hsl[i] = parseFloat(target.value);

    this.props.onChange(hsl, name);
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
    const [h, s, l ] = this.props.value;
    
    return (
      <Fragment>
        <InputStyles
          type="text"
          maxLength="7"
          value={this.state.hex}
          id={this.props.id}
          onChange={this.handleHexChange}
        />

        <Label htmlFor={`${this.props.id}Hue`}>Hue {Math.round(nanH(h))}°</Label>
        <Range
          type="range"
          max="360"
          value={nanH(h)}
          id={`${this.props.id}Hue`}
          color={this.props.color}
          onChange={this.handleChange(0)}
        />

        <Label htmlFor={`${this.props.id}Saturation`}>Saturation {round(s, 2)}</Label>
        <Range
          type="range"
          max="1"
          step={1 / 256}
          value={s}
          id={`${this.props.id}Saturation`}
          color={this.props.color}
          onChange={this.handleChange(1)}
        />

        <Label htmlFor={`${this.props.id}Lightness`}>Lightness {round(l, 2)}</Label>
        <Range
          type="range"
          max="1"
          step={1 / 256}
          value={l}
          id={`${this.props.id}Lightness`}
          color={this.props.color}
          onChange={this.handleChange(2)}
        />
      </Fragment>
    );
  }
}

export default Input;