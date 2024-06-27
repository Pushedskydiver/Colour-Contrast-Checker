import { Suspense, lazy } from 'react';
import ColourContrastProvider from './Context';

import { Divider } from '~/components/01-Atoms/divider/divider';
import { Actions } from '~/components/02-Molecules/actions/actions';
import { Footer } from '~/components/02-Molecules/footer/footer';
import { Header } from '~/components/02-Molecules/header/header';
import { ColorControls } from '~/components/03-Organisms/color-controls/color-controls';
import { CopyExamples } from '~/components/03-Organisms/copy-examples/copy-examples';
import { Score } from '~/components/03-Organisms/score/score';

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
