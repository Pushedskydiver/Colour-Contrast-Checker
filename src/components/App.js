import React, { Component, lazy, Suspense } from 'react';
import WebFont from 'webfontloader';
import { Container } from '../styles/generic.container.styles';
import { Heading2, Span } from '../components/01-Atoms/Heading/Heading.styles';
import { Button } from '../components/01-Atoms/Button/Button.styles';
import Ratio from '../components/01-Atoms/Ratio/Ratio';
import Copy from '../components/01-Atoms/Copy/Copy.styles';
import Label from '../components/01-Atoms/Label/Label.styles';
import Swatch from '../components/01-Atoms/Swatch/Swatch';
import Divider from '../components/01-Atoms/Divider/Divider.styles';
import Input from '../components/01-Atoms/Input/Input';
import Header from '../components/02-Molecules/Header/Header';
import { BlockSection, BlockDiv } from '../components/02-Molecules/Block/Block.styles';
import Example from '../components/02-Molecules/Example/Example.styles';
import Controls from '../components/02-Molecules/Controls/Controls';
import Footer from '../components/02-Molecules/Footer/Footer';
import Flex from '../components/03-Organisms/Flex/Flex.styles';
import Wcag from '../components/03-Organisms/Wcag/Wcag';
import { fetchData, isHsl, isDark, hexToHsl, hslToHex, hexToRgb, getContrast, getLevel, updatePath } from '../components/Utils';

const Select = lazy(() => import('../components/01-Atoms/Select/Select'));

const defaultText = 'Click/Tap to edit me. That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn\'t for him - Yes, yes, I\'m George, George McFly, and I\'m your density. I mean, I\'m your destiny. Right. Alright, take it up, go. Doc. Something wrong with the starter, so I hid it.';

class App extends Component {
  state = {
    colors: JSON.parse(localStorage.getItem('colors')) || [],
    fonts: JSON.parse(localStorage.getItem('fonts')) || [],
    background: [49.73, 1, 0.71],
    foreground: [NaN, 0, 0.133],
    contrast: 12.72,
    level: { AALarge: 'Pass', AA: 'Pass', AAALarge: 'Pass', AAA: 'Pass' }
  };

  storeFontsData = ({ items }) => {
    const families = items.slice(0, 50);
    const fonts = [];

    families.forEach(item => {
      const { family, variants } = item;
      const weight = variants.sort();
      const variant = weight[weight.length - 1];

      fonts.push({ family, variant });
    });

    localStorage.setItem('fonts', JSON.stringify(families));
    this.setState({ fonts });
  }

  fetchGoogleFontsData = () => {
    const apiKey = process.env.REACT_APP_GOOGLE_FONT_API_KEY;
    const googleFontsApi = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`;

    fetchData(googleFontsApi)
      .then(data => this.storeFontsData(data))
      .catch(error => console.error(error));
  }

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

    colors.unshift({ background, foreground });

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

  changeFont = ({ target }) => {
    const head = document.querySelector('head');
    const fontLinkTag = head.querySelector('link[rel="stylesheet"]');
    const option = target.options[target.selectedIndex];
    const font = option.value;
    const fontWeight = option.getAttribute('data-font-weight');

    WebFont.load({
      google: { families: [`${font}:${fontWeight}`] },
      fontloading: () => {
        document.documentElement.className = '';
        if (fontLinkTag !== null) head.removeChild(fontLinkTag);
      },
      fontactive: () => {
        document.body.style.setProperty('--copy', `${font}, sans-serif`);
      }
    });
  }

  async componentDidMount() {
    const path = this.props.location.pathname.split('/');
    const fontsData = localStorage.getItem('fonts');
    const background = hexToHsl(path[1]);
    const foreground = hexToHsl(path[2]);

    if (fontsData === null) {
      this.fetchGoogleFontsData();
    }

    if (!isHsl(background) || !isHsl(foreground)) {
      return;
    }

    await this.updateView(background, foreground);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.colors !== nextState.colors) {
  //     return true;
  //   }

  //   if (this.state.fonts !== nextState.fonts) {
  //     return true;
  //   }

  //   if (this.state.background !== nextState.background) {
  //     return true;
  //   }

  //   if (this.state.foreground !== nextState.foreground) {
  //     return true;
  //   }

  //   return false;
  // }

  renderSwatch = ({ background, foreground }, index) => (
    <Swatch key={index} background={background} foreground={foreground} onClick={this.appendColors} />
  )

  renderFontOptions = ({ family, variant }, index) => (
    <option key={index} value={family} data-font-weight={variant}>{family}</option>
  )

  render() {
    const { colors, fonts, background, foreground, contrast } = this.state;
    const colorState = contrast < 3 ? isDark(background) ? '#ffffff' : '#222222' : hslToHex(foreground);

    return (
      <Container>
        <Header colorState={colorState} />

        <BlockSection flex color={colorState}>
          <Span grade noMargin>Aa</Span>
          <Ratio contrast={contrast} />

          <Wcag id="grades" colorState={colorState} level={this.state.level} />
        </BlockSection>

        <Flex justify="between" align="center">
          <BlockDiv inputs color={colorState}>
            <Label medium htmlFor="background">Background Colour</Label>
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
            <Label medium htmlFor="foreground">Foreground Colour</Label>
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

        {fonts.length === 0 ? '' :
          <Flex justify="between">
            <BlockDiv noMargin select>
              <Label htmlFor="font" select bold>Typeface:</Label>

              <Suspense fallback={<span>Loading Fonts...</span>}>
                <Select onChange={this.changeFont} fonts={fonts} renderFontOptions={this.renderFontOptions} />
              </Suspense>
            </BlockDiv>
          </Flex>
        }

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

        <Footer colorState={colorState} />
      </Container>
    );
  }
}

export default App;
