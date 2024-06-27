import { Suspense, lazy } from 'react';
import ColourContrastProvider from './contexts';

import { Divider } from './01-atomss/divider/divider';
import { Actions } from './02-moleculess/actions/actions';
import { Footer } from './02-moleculess/footer/footer';
import { Header } from './02-moleculess/header/header';
import { ColorControls } from './03-organismss/color-controls/color-controls';
import { CopyExamples } from './03-organismss/copy-examples/copy-examples';
import { Score } from './03-organismss/score/score';

import '../styles/globals.css';

const Typeface = lazy(() =>
  import('./02-moleculess/typeface/typeface').then(module => ({
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
