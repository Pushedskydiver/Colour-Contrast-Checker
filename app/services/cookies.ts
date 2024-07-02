export const decodeCookie = (
	cookieName: string,
	allCookies: string,
): string | null => {
	const re = new RegExp(cookieName + '=([^;]+)');
	const value = re.exec(allCookies);

	return value !== null ? decodeURIComponent(value[1]) : null;
};

export const getCookie = (name: string): string | null => {
	if (typeof document === 'undefined') return null;

	return decodeCookie(name, document.cookie);
};

export const setCookie = (name: string, value: string, days: number): void => {
	if (typeof document === 'undefined') return;

	const expires = new Date();

	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

	const cookieString = `${name}=${encodeURIComponent(
		value,
	)};expires=${expires.toUTCString()};path=/`;

	document.cookie = cookieString;
};
