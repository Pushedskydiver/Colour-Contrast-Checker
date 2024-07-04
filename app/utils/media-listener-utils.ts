export const addMediaListener = (
	element: MediaQueryList,
	type: string,
	cb: () => void,
): void => {
	try {
		element.addEventListener(type, cb);
	} catch {
		console.error('addEventListener not supported');
	}
};

export const removeMediaListener = (
	element: MediaQueryList,
	type: string,
	cb: () => void,
): void => {
	try {
		element.removeEventListener(type, cb);
	} catch {
		console.error('addEventListener not supported');
	}
};
