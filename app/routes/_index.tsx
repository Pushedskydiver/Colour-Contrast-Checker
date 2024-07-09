import { Suspense } from 'react';
import { useRouteLoaderData } from '@remix-run/react';
import { loader } from '~/root';
import { Divider } from '~/components/01-atoms/divider/divider';
import { Actions } from '~/components/02-molecules/actions/actions';
import { Footer } from '~/components/02-molecules/footer/footer';
import { Header } from '~/components/02-molecules/header/header';
import { Typeface } from '~/components/02-molecules/typeface/typeface';
import { ColorControls } from '~/components/03-organisms/color-controls/color-controls';
import { CopyExamples } from '~/components/03-organisms/copy-examples/copy-examples';
import { Score } from '~/components/03-organisms/score/score';

const Homepage: React.FC = () => {
	const data = useRouteLoaderData<typeof loader>('root');

	return (
		<>
			<Header />

			<main id="main">
				<Score />

				<ColorControls />

				<Actions />

				<Divider />

				{data?.GOOGLE_FONTS_APIKEY ? (
					<Suspense fallback={<span>Loading Fonts...</span>}>
						<Typeface
							GOOGLE_FONTS_APIKEY={data.GOOGLE_FONTS_APIKEY}
						/>
					</Suspense>
				) : null}

				<CopyExamples />
			</main>

			<Footer />
		</>
	);
};

export default Homepage;
