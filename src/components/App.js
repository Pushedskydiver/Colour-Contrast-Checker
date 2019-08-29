import React, { lazy, Suspense } from 'react';
import GlobalStyles from '../styles/settings.global.styles';
import { Container } from '../styles/generic.container.styles';
import { Heading2, Span } from '../components/01-Atoms/Heading/Heading.styles';
import Ratio from '../components/01-Atoms/Ratio/Ratio';
import Copy from '../components/01-Atoms/Copy/Copy.styles';
import Label from '../components/01-Atoms/Label/Label.styles';
import Divider from '../components/01-Atoms/Divider/Divider.styles';
import Input from '../components/01-Atoms/Input/Input';
import Header from '../components/02-Molecules/Header/Header';
import { BlockSection, BlockDiv } from '../components/02-Molecules/Block/Block.styles';
import Example from '../components/02-Molecules/Example/Example.styles';
import Controls from '../components/02-Molecules/Controls/Controls';
import Footer from '../components/02-Molecules/Footer/Footer';
import Flex from '../components/03-Organisms/Flex/Flex.styles';
import Wcag from '../components/03-Organisms/Wcag/Wcag';
import { ContextProvider } from './Context';
import Swatch from './01-Atoms/Swatch/Swatch';

const Select = lazy(() => import('../components/01-Atoms/Select/Select'));

const defaultText = 'Click/Tap to edit me. That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn\'t for him - Yes, yes, I\'m George, George McFly, and I\'m your density. I mean, I\'m your destiny. Right. Alright, take it up, go. Doc. Something wrong with the starter, so I hid it.';

function checkDataInput({ target }) {
  if (target.value.length === 0) {
    return target.value = defaultText;
  }
}

function App() {
  return (
    <ContextProvider>
      <GlobalStyles />
      <Container>
        <Header />

        <BlockSection flex>
          <Span grade noMargin>Aa</Span>
          <Ratio />

          <Wcag id="grades" />
        </BlockSection>

        <Flex justify="between" align="center">
          <BlockDiv inputs>
            <Label medium htmlFor="background">Background Colour</Label>
            <Input id="background" name="background" />

            <Controls id="background" name="background" />
          </BlockDiv>

          <BlockDiv inputs>
            <Label medium htmlFor="foreground">Foreground Colour</Label>
            <Input id="foreground" name="foreground" />

            <Controls id="foreground" name="foreground" />
          </BlockDiv>
        </Flex>

        <Flex align="center">
          <Swatch />
        </Flex>

        <Divider />

        <Flex justify="between">
          <BlockDiv noMargin select>
            <Label htmlFor="font" select bold>Typeface:</Label>

            <Suspense fallback={<span>Loading Fonts...</span>}>
              <Select />
            </Suspense>
          </BlockDiv>
        </Flex>

        <Heading2 medium>Example Copy</Heading2>

        <Flex justify="between">
          <Example>
            <Label htmlFor="largeCopy" heading bold>Large Text - 14pt</Label>
            <Copy
              columns="1"
              rows="5"
              defaultValue={defaultText}
              id="largeCopy"
              onBlur={checkDataInput}
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
              onBlur={checkDataInput}
              normal
            />
          </Example>
        </Flex>

        <Footer />
      </Container>
    </ContextProvider>
  );
}

export default App;
