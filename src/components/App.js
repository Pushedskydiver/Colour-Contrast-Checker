import React, { Component, createRef } from 'react';
import { Container } from '../styles/generic.container.styles';
import { Heading1, Heading2, Span } from '../components/01-Atoms/Heading/Heading.styles';
import Ratio from '../components/01-Atoms/Ratio/Ratio.styles';
import Grade from '../components/01-Atoms/Grade/Grade.styles';
import Copy from '../components/01-Atoms/Copy/Copy.styles';
import Label from '../components/01-Atoms/Label/Label.styles';
import Input from '../components/01-Atoms/Input/Input';
import Header from '../components/02-Molecules/Header/Header.styles';
import Block from '../components/02-Molecules/Block/Block.styles';
import Example from '../components/02-Molecules/Example/Example.styles';
import Flex from '../components/03-Organisms/Flex/Flex.styles';
import { isHsl, isDark, hexToHsl, hslToHex, hexToRgb, getContrast, getLevel, updatePath } from '../components/Utils';

class App extends Component {
  backgroundRef = createRef();
  foregroundRef = createRef();

  state = {
    background: [49.73, 1, 0.71],
    foreground: [NaN, 0, 0.133],
    contrast: 12.72,
    level: 'AAA'
  };

  checkContrast = (background, foreground) => {
    const backgroundRgb = hexToRgb(background);
    const foregroundRgb = hexToRgb(foreground);
    const contrast = getContrast(backgroundRgb, foregroundRgb);
    const level = getLevel(contrast);
    
    this.setState({ contrast, level });
  }

  handleContrastCheck = async (value, name) => {
    await this.setState({ [name]: value });

    const { background, foreground } = this.state;

    document.body.style.setProperty(`--${name}`, hslToHex(value));
    this.checkContrast(hslToHex(background), hslToHex(foreground));
    updatePath(this.state);
  }

  updateView = (background, foreground) => {
    this.checkContrast(hslToHex(background), hslToHex(foreground));
    this.setState({ background, foreground });
  }

  async componentDidMount() {
    const path = this.props.location.pathname.split('/');
    const background = hexToHsl(path[1]);
    const foreground = hexToHsl(path[2]);

    if (!isHsl(background) || !isHsl(foreground)) {
      return;
    }
    
    document.body.style.setProperty('--background', hslToHex(background));
    document.body.style.setProperty('--foreground', hslToHex(foreground));
    await this.updateView(background, foreground);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.background !== nextState.background) {
      return true;
    }

    if (this.state.foreground !== nextState.foreground) {
      return true;
    }

    if (this.state.contrast !== nextState.contrast) {
      return true;
    }

    if (this.state.level !== nextState.level) {
      return true;
    }

    return false;
  }

  render() {
    const { background } = this.state;
    const colorState = isDark(background) ? '#ffffff' : '#222222';

    return (
      <Container fullHeight>
        <Header>
          <Heading1 medium noMargin>Colour Contrast Checker</Heading1>
        </Header>

        <Block color={colorState}>
          <Span grade noMargin>Aa</Span>
          <Ratio>{this.state.contrast.toFixed(2)}</Ratio>
          <Grade>{this.state.level}</Grade>
        </Block>

        <Flex justify="between">
          <Example>
            <Heading2 regular>Large Text</Heading2>
            <Copy large>That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn't for him- Yes, yes, I'm George, George McFly, and I'm your density. I mean, I'm your destiny. Right. Alright, take it up, go. Doc. Something wrong with the starter, so I hid it.</Copy>
          </Example>

          <Example>
            <Heading2 regular>Normal Text</Heading2>
            <Copy normal>That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn't for him- Yes, yes, I'm George, George McFly, and I'm your density. I mean, I'm your destiny. Right. Alright, take it up, go. Doc. Something wrong with the starter, so I hid it.</Copy>
          </Example>
        </Flex>

        <Flex justify="between" align="center">
          <Block inputs color={colorState}>
            <Label htmlFor="background">Background Hex Colour</Label>
            <Input
              value={this.state.background}
              id="background"
              name="background"
              ref={this.backgroundRef}
              color={colorState}
              onChange={this.handleContrastCheck}
            />
          </Block>

          <Block inputs color={colorState}>
            <Label htmlFor="foreground">Foreground Hex Colour</Label>
            <Input
              value={this.state.foreground}
              id="foreground"
              name="foreground"
              ref={this.foregroundRef}
              color={colorState}
              onChange={this.handleContrastCheck}
            />
          </Block>
        </Flex>
      </Container>
    );
  }
}

export default App;
