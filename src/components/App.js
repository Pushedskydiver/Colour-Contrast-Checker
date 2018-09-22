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

class App extends Component {
  backgroundRef = createRef();
  foregroundRef = createRef();

  state = {
    background: '#ffe66d',
    foreground: '#222222'
  };

  getContrast = ({ target }) => {
    if (target.value.length < 4) {
      return;
    }

    console.log(target, 'getContrast');
  }

  render() {
    return (
      <Container fullHeight>
        <Header>
          <Heading1 medium noMargin>Colour Contrast Checker</Heading1>
        </Header>

        <Block>
          <Span grade>Aa</Span>
          <Ratio>12.72</Ratio>
          <Grade>AAA</Grade>
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
          <Block inputs>
            <Label htmlFor="background">Background Hex Colour</Label>
            <Input type="text" id="background" defaultValue={this.state.background} data-hex-color="background" ref={this.backgroundRef} onChange={this.getContrast} />
          </Block>

          <Block inputs>
            <Label htmlFor="foreground">Foreground Hex Colour</Label>
            <Input type="text" id="foreground" defaultValue={this.state.foreground} data-hex-color="foreground" ref={this.foregroundRef} onChange={this.getContrast} />
          </Block>
        </Flex>
      </Container>
    );
  }
}

export default App;
