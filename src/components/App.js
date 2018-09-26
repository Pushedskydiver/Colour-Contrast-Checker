import React, { Component } from 'react';
import { Container } from '../styles/generic.container.styles';
import { Heading1, Heading2, Span } from '../components/01-Atoms/Heading/Heading.styles';
import Ratio from '../components/01-Atoms/Ratio/Ratio.styles';
import Badge from '../components/01-Atoms/Badge/Badge.styles';
import Grade from '../components/01-Atoms/Grade/Grade.styles';
import Copy from '../components/01-Atoms/Copy/Copy.styles';
import Label from '../components/01-Atoms/Label/Label.styles';
import Divider from '../components/01-Atoms/Divider/Divider.styles';
import Input from '../components/01-Atoms/Input/Input';
import Header from '../components/02-Molecules/Header/Header.styles';
import Block from '../components/02-Molecules/Block/Block.styles';
import Result from '../components/02-Molecules/Result/Result.styles';
import Example from '../components/02-Molecules/Example/Example.styles';
import Controls from '../components/02-Molecules/Controls/Controls';
import Flex from '../components/03-Organisms/Flex/Flex.styles';
import Wcag from '../components/03-Organisms/Wcag/Wcag.styles';
import { isHsl, isDark, hexToHsl, hslToHex, hexToRgb, getContrast, getLevel, updatePath } from '../components/Utils';

const defaultText = 'Click/Tap to edit me. That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn\'t for him - Yes, yes, I\'m George, George McFly, and I\'m your density. I mean, I\'m your destiny. Right. Alright, take it up, go. Doc. Something wrong with the starter, so I hid it.';

class App extends Component {
  state = {
    background: [49.73, 1, 0.71],
    foreground: [NaN, 0, 0.133],
    contrast: 12.72,
    level: [{ AALarge: 'Pass' }, { AA: 'Pass' }, { AAALarge: 'Pass' }, { AAA: 'Pass' }]
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

  checkDataInput = ({ target }) => {
    if (target.value.length === 0) {
      return target.value = defaultText;
    }
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
    const { background, foreground, contrast, level } = this.state;
    const colorState = isDark(background) ? '#ffffff' : '#222222';

    return (
      <Container>
        <Header>
          <Heading1 medium noMargin>Colour Contrast Checker</Heading1>
        </Header>

        <Block flex color={colorState}>
          <Span grade noMargin>Aa</Span>
          <Ratio>{contrast.toFixed(2)}</Ratio>

          <Wcag>
            <Result>
              <Badge color={colorState}>{level[0].AALarge}</Badge>
              <Grade>AA Large</Grade>
            </Result>
            <Result>
              <Badge color={colorState}>{level[2].AAALarge}</Badge>
              <Grade>AAA Large</Grade>
            </Result>
            <Result>
              <Badge color={colorState}>{level[1].AA}</Badge>
              <Grade color={colorState}>AA Normal</Grade>
            </Result>
            <Result>
              <Badge color={colorState}>{level[3].AAA}</Badge>
              <Grade>AAA Normal</Grade>
            </Result>
          </Wcag>
        </Block>

        <Flex justify="between" align="center">
          <Block inputs color={colorState}>
            <Label htmlFor="background">Background Hex Colour</Label>
            <Input
              value={background}
              id="background"
              name="background"
              color={colorState}
              onChange={this.handleContrastCheck}
            />

            <Controls
              value={background}
              id="background"
              name="background"
              color={colorState}
              onChange={this.handleContrastCheck}
            />
          </Block>

          <Block inputs color={colorState}>
            <Label htmlFor="foreground">Foreground Hex Colour</Label>
            <Input
              value={foreground}
              id="foreground"
              name="foreground"
              color={colorState}
              onChange={this.handleContrastCheck}
            />

            <Controls
              value={foreground}
              id="foreground"
              name="foreground"
              color={colorState}
              onChange={this.handleContrastCheck}
            />
          </Block>
        </Flex>

        <Divider color={colorState} />

        <Heading2 medium>Example Copy</Heading2>

        <Flex justify="between">
          <Example>
            <Label htmlFor="largeCopy" heading bold>Large Text - 14pt</Label>
            <Copy
              columns="1"
              rows="5"
              defaultValue={defaultText}
              id="largeCopy"
              onBlur={this.checkDataInput}
              large
            />
          </Example>

          <Example>
            <Label htmlFor="normalCopy" heading bold>Normal Text - 16px</Label>
            <Copy
              columns="1"
              rows="5"
              defaultValue={defaultText}
              id="normalCopy"
              onBlur={this.checkDataInput}
              normal
            />
          </Example>
        </Flex>
      </Container>
    );
  }
}

export default App;
