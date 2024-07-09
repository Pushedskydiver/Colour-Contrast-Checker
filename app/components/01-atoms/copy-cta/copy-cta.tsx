import { useState } from 'react';
import clsx from 'clsx';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useColourContrast } from '~/context';
import { Clipboard } from '../icon/icon';
import { Text } from '../text/text';

import styles from './copy-cta.module.css';

export type TCopyCta = {
	id: string;
	value: string;
};

export const CopyCta: React.FC<TCopyCta> = ({ id, value }) => {
	const [copied, setCopiedState] = useState(false);
	const { isBackgroundDark, isPoorContrast } = useColourContrast();

	const setCopyState = (): void => {
		setCopiedState(true);

		const delaySetState = setTimeout(() => {
			setCopiedState(false);
			clearTimeout(delaySetState);
		}, 2000);
	};

	return (
		<span className={styles.ctaWrapper}>
			<Text
				id={id}
				size="pulse"
				weight="medium"
				className={clsx(
					styles.tooltip,
					isPoorContrast && !isBackgroundDark
						? styles.tooltipDark
						: undefined,
					isPoorContrast && isBackgroundDark
						? styles.tooltipLight
						: undefined,
					copied ? styles.tooltipFadeInOut : undefined,
				)}
			>
				{copied ? 'Copied' : `Copy ${value} to clipboard`}
			</Text>

			<CopyToClipboard text={value} onCopy={setCopyState}>
				<button
					type="button"
					aria-labelledby={id}
					className={clsx(
						styles.cta,
						isPoorContrast && !isBackgroundDark
							? styles.ctaDark
							: undefined,
						isPoorContrast && isBackgroundDark
							? styles.ctaLight
							: undefined,
					)}
				>
					<Clipboard size={28} />
				</button>
			</CopyToClipboard>
		</span>
	);
};
