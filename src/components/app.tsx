import { Suspense, lazy } from 'react';
import ColourContrastProvider from './context';

import { Divider } from './01-atomss/divider/divider';
import { Actions } from './02-molecules/actions/actions';
import { Footer } from './02-molecules/footer/footer';
import { Header } from './02-molecules/header/header';
import { ColorControls } from './03-organisms/color-controls/color-controls';
import { CopyExamples } from './03-organisms/copy-examples/copy-examples';
import { Score } from './03-organisms/score/score';

import '../styles/globals.css';

const Typeface = lazy(() =>
  import('./02-molecules/typeface/typeface').then(module => ({
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
