import React, { Component, createRef } from 'react';
import { Container } from '../styles/generic.container.styles';
import { Heading1, Heading2, Span } from '../components/01-Atoms/Heading/Heading.styles';
import Ratio from '../components/01-Atoms/Ratio/Ratio.styles';
import Grade from '../components/01-Atoms/Grade/Grade.styles';
import Copy from '../components/01-Atoms/Copy/Copy.styles';
import Label from '../components/01-Atoms/Label/Label.styles';
import Input from '../components/01-Atoms/Input/Input.styles';
import Header from '../components/02-Molecules/Header/Header.styles';
import Block from '../components/02-Molecules/Block/Block.styles';
import Example from '../components/02-Molecules/Example/Example.styles';
import Flex from '../components/03-Organisms/Flex/Flex.styles';
import { isHex, isDark, hexToRgb, getContrast, getLevel } from '../components/Utils';

class App extends Component {
  backgroundRef = createRef();
  foregroundRef = createRef();

  state = {
    background: '#ffe66d',
    foreground: '#222222',
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

  handleContrastCheck = (target, name) => {
    const backgroundPath = this.state.background.split('#').join('');
    const foregroundPath = this.state.foreground.split('#').join('');

    document.body.style.setProperty(`--${name}`, target.value);
    this.props.history.push(`/${backgroundPath}/${foregroundPath}`);
    this.checkContrast(this.state.background, this.state.foreground);
  }

  handleHexChange = async({ target }) => {
    const name = target.getAttribute('id');

    await this.setState({ [name]: target.value });

    if (target.value.length !== 7) {
      return;
    }

    this.handleContrastCheck(target, name);
  }

  updateView = (background, foreground) => {
    this.checkContrast(background, foreground);
    this.setState({ background, foreground });
  }

  async componentDidMount() {
    const path = this.props.location.pathname.split('/');
    const background = `#${path[1]}`;
    const foreground = `#${path[2]}`;

    if (!isHex(background) || !isHex(foreground)) {
      return;
    }
    
    document.body.style.setProperty('--background', background);
    document.body.style.setProperty('--foreground', foreground);
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
    const isBgDark = isDark(background) && background.length === 7;
    const colorState = isBgDark ? '#fff' : '#222';

    return (
      <Container fullHeight>
        <Header>
          <Heading1 medium noMargin>Colour Contrast Checker</Heading1>
        </Header>

        <Block color={colorState}>
          <Span grade>Aa</Span>
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
              type="text"
              maxLength="7"
              id="background"
              value={this.state.background}
              ref={this.backgroundRef}
              onChange={this.handleHexChange}
            />
          </Block>

          <Block inputs color={colorState}>
            <Label htmlFor="foreground">Foreground Hex Colour</Label>
            <Input
              type="text"
              maxLength="7"
              id="foreground"
              value={this.state.foreground}
              ref={this.foregroundRef}
              onChange={this.handleHexChange}
            />
          </Block>
        </Flex>
      </Container>
    );
  }
}

export default App;
