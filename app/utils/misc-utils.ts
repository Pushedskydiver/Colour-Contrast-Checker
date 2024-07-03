export const fetchData = async <T>(api: string): Promise<T> => {
	const response = await fetch(api);
	const body = await response.json();

	if (response.status !== 200) {
		throw new Error(`Error: ${body.message}`);
	}

	return body;
};
