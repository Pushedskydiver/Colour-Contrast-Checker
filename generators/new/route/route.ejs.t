---
to: "app/routes/<%= filename %>.tsx"
---
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

export const loader = async () => {
	return json();
};

export const <%= name %>: React.FC = () => {
	const posts = useLoaderData<typeof loader>();
	return (
		<>
			
		</>
	);
};

export default <%= name %>;
