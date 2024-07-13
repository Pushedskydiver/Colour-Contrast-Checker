import type { MetaDescriptor } from '@remix-run/node';

export const openGraph: MetaDescriptor[] = [
	{
		property: 'og:url',
		content: 'https://colourcontrast.cc',
	},
	{
		property: 'og:type',
		content: 'website',
	},
	{
		property: 'og:title',
		content: 'Colour Contrast Checker',
	},
	{
		property: 'og:image',
		content: '/favicons/favicon-256x256.png',
	},
	{
		property: 'og:description',
		content:
			'Check the contrast between different colour combinations against WCAG standards.',
	},
	{
		property: 'og:site_name',
		content: 'Colour Contrast Checker',
	},
	{
		property: 'og:locale',
		content: 'en_GB',
	},
];
