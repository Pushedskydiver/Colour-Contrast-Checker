import { lazy, Suspense } from 'react';
import GlobalStyles from '../styles/settings.global.styles';
import { Container } from '../styles/generic.container.styles';
import { Heading2, Span } from './01-Atoms/Heading/Heading.styles';
import Ratio from './01-Atoms/Ratio/Ratio';
import Copy from './01-Atoms/Copy/Copy';
import Label from './01-Atoms/Label/Label.styles';
import Divider from './01-Atoms/Divider/Divider.styles';
import Input from './01-Atoms/Input/Input';
import Header from './02-Molecules/Header/Header';
import { BlockSection, BlockDiv } from './02-Molecules/Block/Block.styles';
import Example from './02-Molecules/Example/Example.styles';
import Controls from './02-Molecules/Controls/Controls';
import Footer from './02-Molecules/Footer/Footer';
import Flex, { JustifyContentProps, AlignItemsProps } from './03-Organisms/Flex/Flex.styles';
import Wcag from './03-Organisms/Wcag/Wcag';
import Swatch from './01-Atoms/Swatch/Swatch';
import ColourContrastProvider from './Context';

const Select = lazy(() => import('./01-Atoms/Select/Select'));

function App() {
  return (
    <ColourContrastProvider>
      <GlobalStyles />
      <Container>
        <Header />

        <BlockSection aria-label="Colour contrast results" flex spaceBetween>
          <div>
            <Span grade noMargin>Aa</Span>
            <Ratio />
          </div>

          <Wcag id="grades" />
        </BlockSection>

        <Flex
          aria-label="Colour controls"
          justify={JustifyContentProps['between']}
          align={AlignItemsProps['center']}
        >
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

        <Flex align={AlignItemsProps['center']}>
          <Swatch />
        </Flex>

        <Divider />

        <Flex justify={JustifyContentProps['between']}>
          <BlockDiv noMargin select>
            <Label htmlFor="font" select bold>Typeface:</Label>

            <Suspense fallback={<span>Loading Fonts...</span>}>
              <Select />
            </Suspense>
          </BlockDiv>
        </Flex>

        <Heading2 medium>Example Copy</Heading2>

        <Flex justify={JustifyContentProps['between']}>
          <Example>
            <Label htmlFor="largeCopy" heading bold>Large Text - 18pt/24px</Label>
            <Copy
              rows={5}
              id="largeCopy"
              size="large"
            />
          </Example>

          <Example>
            <Label htmlFor="normalCopy" heading bold>Normal Text - 16px</Label>
            <Copy
              rows={5}
              id="normalCopy"
              size="normal"
            />
          </Example>
        </Flex>

        <Footer />
      </Container>
    </ColourContrastProvider>
  );
}

export default App;
