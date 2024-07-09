import type { MetaDescriptor } from '@remix-run/node';

export const twitterCard: MetaDescriptor[] = [
	{
		name: 'twitter:card',
		content: 'summary_large_image',
	},
	{
		name: 'twitter:site',
		content: '@AlexMClapperton',
	},
	{
		name: 'twitter:creator',
		content: '@AlexMClapperton',
	},
	{
		name: 'twitter:url',
		content: 'https://colourcontrast.cc',
	},
	{
		name: 'twitter:title',
		content: 'Colour Contrast Checker',
	},
	{
		name: 'twitter:description',
		content:
			'Check the contrast between different colour combinations against WCAG standards.',
	},
	{
		name: 'twitter:image',
		content: '/favicons/favicon-256x256.png',
	},
];
