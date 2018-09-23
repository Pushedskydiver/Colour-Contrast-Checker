import React, { Component } from 'react';
import round from 'lodash.round';
import Label from '../../01-Atoms/Label/Label.styles';
import Range from '../../01-Atoms/Range/Range.styles';
import ControlStyles from './Controls.styles';
import { hslToHex } from '../../Utils';

const nanH = h => isNaN(h) ? 0 : h;

class Controls extends Component {
  state = {
    hex: hslToHex(this.props.value)
  };

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
    const [h, s, l] = this.props.value;

    return (
      <ControlStyles>
        <Label bold htmlFor={`${this.props.id}Hue`}>Hue {Math.round(nanH(h))}°</Label>
        <Range
          type="range"
          max="360"
          value={nanH(h)}
          id={`${this.props.id}Hue`}
          color={this.props.color}
          onChange={this.handleChange(0)}
        />

        <Label bold htmlFor={`${this.props.id}Saturation`}>Saturation {round(s, 2)}</Label>
        <Range
          type="range"
          max="1"
          step={1 / 256}
          value={s}
          id={`${this.props.id}Saturation`}
          color={this.props.color}
          onChange={this.handleChange(1)}
        />

        <Label bold htmlFor={`${this.props.id}Lightness`}>Lightness {round(l, 2)}</Label>
        <Range
          type="range"
          max="1"
          step={1 / 256}
          value={l}
          id={`${this.props.id}Lightness`}
          color={this.props.color}
          onChange={this.handleChange(2)}
        />
      </ControlStyles>
    );
  }
}

export default Controls;