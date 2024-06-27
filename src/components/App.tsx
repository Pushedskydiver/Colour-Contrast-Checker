import { Suspense, lazy } from 'react';
import ColourContrastProvider from './Context';

import { Divider } from './01-Atoms/divider/divider';
import { Actions } from './02-Molecules/actions/actions';
import { Footer } from './02-Molecules/footer/footer';
import { Header } from './02-Molecules/header/header';
import { ColorControls } from './03-Organisms/color-controls/color-controls';
import { CopyExamples } from './03-Organisms/copy-examples/copy-examples';
import { Score } from './03-Organisms/score/score';

import '../styles/globals.css';

const Typeface = lazy(() =>
  import('./02-Molecules/typeface/typeface').then(module => ({
    default: module.Typeface,
  }))
);

const App = (): JSX.Element => (
  <ColourContrastProvider>
    <Header />

    <Score />

    <ColorControls />

    <Actions />

    <Divider />

    <Suspense fallback={<span>Loading Fonts...</span>}>
      <Typeface />
    </Suspense>

    <CopyExamples />

    <Footer />
  </ColourContrastProvider>
);

export default App;
