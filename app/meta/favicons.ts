import type { LinkDescriptor } from "@remix-run/node";

export const favicons: LinkDescriptor[] = [
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '48x48',
		href: '/favicons/favicon-48x48.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '72x72',
		href: '/favicons/favicon-72x72.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '96x96',
		href: '/favicons/favicon-96x96.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '144x144',
		href: '/favicons/favicon-144x144.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '256x256',
		href: '/favicons/favicon-256x256.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '512x512',
		href: '/favicons/favicon-512x512.png',
	},
]
