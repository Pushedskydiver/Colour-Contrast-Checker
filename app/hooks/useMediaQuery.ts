import { useState, useEffect } from 'react';
import {
	addMediaListener,
	removeMediaListener,
} from '~/utils/media-listener-utils';

export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		if (window.matchMedia) {
			const media = window?.matchMedia(query);

			if (media.matches !== matches) {
				setMatches(media.matches);
			}

			const listener = (): void => {
				setMatches(media.matches);
			};

			addMediaListener(media, 'change', listener);

			return () => removeMediaListener(media, 'change', listener);
		}
	}, [matches, query]);

	return matches;
};
