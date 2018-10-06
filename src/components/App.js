import React, { Component } from 'react';
import { Container } from '../styles/generic.container.styles';
import SkipLink from '../components/01-Atoms/SkipLink/SkipLink.styles';
import { Heading1, Heading2, Span } from '../components/01-Atoms/Heading/Heading.styles';
import Ratio from '../components/01-Atoms/Ratio/Ratio.styles';
import Badge from '../components/01-Atoms/Badge/Badge.styles';
import Grade from '../components/01-Atoms/Grade/Grade.styles';
import Copy from '../components/01-Atoms/Copy/Copy.styles';
import Label from '../components/01-Atoms/Label/Label.styles';
import { Button } from '../components/01-Atoms/Button/Button.styles';
import Swatch from '../components/01-Atoms/Swatch/Swatch.styles';
import Divider from '../components/01-Atoms/Divider/Divider.styles';
import Input from '../components/01-Atoms/Input/Input';
import Link from '../components/01-Atoms/Link/Link.styles';
import { GitHub, Twitter } from '../components/01-Atoms/Icon/Icon';
import Header from '../components/02-Molecules/Header/Header.styles';
import { BlockSection, BlockDiv } from '../components/02-Molecules/Block/Block.styles';
import Result from '../components/02-Molecules/Result/Result.styles';
import Example from '../components/02-Molecules/Example/Example.styles';
import Controls from '../components/02-Molecules/Controls/Controls';
import Footer from '../components/02-Molecules/Footer/Footer.styles';
import Flex from '../components/03-Organisms/Flex/Flex.styles';
import Wcag from '../components/03-Organisms/Wcag/Wcag.styles';
import { isHsl, isDark, hexToHsl, hslToHex, hexToRgb, getContrast, getLevel, updatePath } from '../components/Utils';

const defaultText = 'Click/Tap to edit me. That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn\'t for him - Yes, yes, I\'m George, George McFly, and I\'m your density. I mean, I\'m your destiny. Right. Alright, take it up, go. Doc. Something wrong with the starter, so I hid it.';

class App extends Component {
  state = {
    colors: JSON.parse(localStorage.getItem('colors')) || [],
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
    updatePath(background, foreground);
  }

  updateView = (background, foreground) => {
    const backgroundHex = hslToHex(background);
    const foregroundHex = hslToHex(foreground);

    document.body.style.setProperty('--background', backgroundHex);
    document.body.style.setProperty('--foreground', foregroundHex);

    this.checkContrast(backgroundHex, foregroundHex);
    this.setState({ background, foreground });
  }

  saveColors = () => {
    const colors = JSON.parse(localStorage.getItem('colors')) || [];
    const background = hslToHex(this.state.background);
    const foreground = hslToHex(this.state.foreground);
    const sameColors = colors.filter(color => color.background === background && color.foreground === foreground).length > 0;

    if (colors.length > 0 && sameColors) {
      return;
    }

    if (colors.length > 5) {
      colors.pop();
    }

    colors.unshift({
      background,
      foreground
    });

    localStorage.setItem('colors', JSON.stringify(colors));
    this.setState({ colors });
  }

  reverseColors = () => {
    const background = this.state.foreground;
    const foreground = this.state.background;

    this.updateView(background, foreground);
    updatePath(background, foreground);
  }

  checkDataInput = ({ target }) => {
    if (target.value.length === 0) {
      return target.value = defaultText;
    }
  }

  appendColors = async ({ target }) => {
    const background = hexToHsl(target.getAttribute('data-background'));
    const foreground = hexToHsl(target.getAttribute('data-foreground'));

    await this.updateView(background, foreground);
    updatePath(background, foreground);
  }

  async componentDidMount() {
    const path = this.props.location.pathname.split('/');
    const background = hexToHsl(path[1]);
    const foreground = hexToHsl(path[2]);

    if (!isHsl(background) || !isHsl(foreground)) {
      return;
    }

    await this.updateView(background, foreground);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.colors !== nextState.colors) {
      return true;
    }

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

  renderSwatch = ({ background, foreground } = {}, index) => (
    <Swatch
      key={index}
      background={background}
      foreground={foreground}
      data-background={background}
      data-foreground={foreground}
      onClick={this.appendColors}
      aria-label={`Swatch - Background = ${background}. Foreground = ${foreground}. Append these colour values`}
    >A</Swatch>
  )

  render() {
    const { colors, background, foreground, contrast, level } = this.state;
    const colorState = contrast < 3 ? isDark(background) ? '#ffffff' : '#222222' : hslToHex(foreground);

    return (
      <Container>
        <Header>
          <Heading1 medium noMargin>Colour Contrast Checker</Heading1>

          <SkipLink href="#ratio" color={colorState}>Skip to colour contrast ratio</SkipLink>
          <SkipLink href="#grades" color={colorState}>Skip to colour contrast grades</SkipLink>
          <SkipLink href="#background" color={colorState}>Skip to background colour input</SkipLink>
          <SkipLink href="#foreground" color={colorState}>Skip to foreground colour input</SkipLink>
          <SkipLink href="#largeCopy" color={colorState}>Skip to large text example copy</SkipLink>
          <SkipLink href="#normalCopy" color={colorState}>Skip to normal text example copy</SkipLink>
        </Header>

        <BlockSection flex color={colorState}>
          <Span grade noMargin>Aa</Span>
          <Ratio id="ratio">{contrast.toFixed(2)}</Ratio>

          <Wcag id="grades">
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
        </BlockSection>

        <Flex justify="between" align="center">
          <BlockDiv inputs color={colorState}>
            <Label htmlFor="background">Background Colour</Label>
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
          </BlockDiv>

          <BlockDiv inputs color={colorState}>
            <Label htmlFor="foreground">Foreground Colour</Label>
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
          </BlockDiv>
        </Flex>

        <Flex align="center">
          <Button type="button" color={colorState} onClick={this.reverseColors}>Reverse Colours</Button>
          <Button type="button" color={colorState} onClick={this.saveColors}>Save Colours</Button>

          {colors.map((color, index) => this.renderSwatch(color, index))}
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

        <Footer>
          <Link
            href="https://github.com/Pushedskydiver/Colour-Contrast-Checker"
            title="Go to GitHub project"
            iconLink
          >
            <GitHub fill={colorState} />
          </Link>

          <Link
            href="https://twitter.com/alexmclapperton"
            title="Go to Alex's Twitter profile"
            iconLink
          >
            <Twitter fill={colorState} />
          </Link>
        </Footer>
      </Container>
    );
  }
}

export default App;
