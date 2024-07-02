import clsx from 'clsx';
import { useColourContrast } from '~/context';
import { Text } from '~/components/01-atoms/text/text';
import { BuyMeACoffeeCTA } from '~/components/01-atoms/bmc-cta/bmc-cta';
import { ChromeWebStoreCta } from '~/components/01-atoms/cws-cta/cws-cta';
import { SkipLink } from '~/components/01-atoms/skip-link/skip-link';

import styles from './header.module.css';

export const Header: React.FC = () => {
	const { isBackgroundDark, isPoorContrast } = useColourContrast();

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<SkipLink href="#ratio" bodyText="Skip to colour contrast ratio" />
				<SkipLink href="#grades" bodyText="Skip to colour contrast grades" />
				<SkipLink href="#background" bodyText="Skip to background colour input" />
				<SkipLink href="#foreground" bodyText="Skip to foreground colour input" />
				<SkipLink href="#largeCopy" bodyText="Skip to large text example copy" />
				<SkipLink href="#normalCopy" bodyText="Skip to normal text example copy" />

				<Text
					tag="h1"
					size="landmark"
					weight="semiBold"
					className={clsx(
						styles.title,
						isPoorContrast && !isBackgroundDark ? styles.titleDark : undefined,
						isPoorContrast && isBackgroundDark ? styles.titleLight : undefined,
					)}
				>
					Colour contrast checker
				</Text>

				<div className={styles.meta}>
					<BuyMeACoffeeCTA />

					<ChromeWebStoreCta />
				</div>
			</div>
		</header>
	);
}
