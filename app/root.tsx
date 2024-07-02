import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	json,
	useLoaderData,
} from "@remix-run/react";
import chroma from "chroma-js";

import ColourContrastProvider from "./context";
import { favicons } from "./meta/favicons";
import { msTileIcons } from "./meta/ms-tile-icons";
import { openGraph } from "./meta/open-graph";
import { splashScreens } from "./meta/splash-screens";
import { twitterCard } from "./meta/twitter-card";
import { decodeCookie } from "./services/cookies";
import { getContrast, getLevel, hslToHex, isHex, isHsl } from "./utils";

import styles from './styles/globals.css?url';
import typography from './styles/typography.css?url';

import type {
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
	TypedResponse,
} from "@remix-run/node";
import type { TColors, TLevels } from "./global-types";

type TRoot = {
	background: [number, number, number];
	foreground: [number, number, number];
	colors: TColors[];
	contrast: number;
	levels: TLevels;
	GOOGLE_FONTS_APIKEY: string | undefined;
}

type CSSCustomProperties = {
	['--background-color']: string;
	['--foreground-color']: string;
} & React.CSSProperties;

const getColorValue = (
	path: string | null,
	fallback: string
) => {
	const isPathAndHex = path && isHex(path);
	const value = chroma(isPathAndHex ? path : fallback).hsl();

	return value;
}

const setContrast = (
	bg: [number, number, number],
	fg: [number, number, number],
	fallback: number,
) => {
	const isBgHsl = isHsl(bg);
	const isFgHsl = isHsl(fg);

	if (isBgHsl && isFgHsl) {
		const bgHex = hslToHex(bg);
		const fgHex = hslToHex(fg);
		
		return getContrast(bgHex, fgHex);
	}

	return fallback;
}

export const links: LinksFunction = () => [
	{
		rel: 'dns-prefetch',
		href: 'https://www.googleapis.com',
	},
	{
		rel: 'preconnect',
		href: 'https://www.googleapis.com',
	},
	{
		rel: 'preload',
		href: typography,
		as: 'style',
	},
	{
		rel: 'preload',
		href: styles,
		as: 'style',
	},
	{
		rel: 'preload',
		href: '/fonts/avenir-next-variable.woff2',
		as: 'font',
		type: 'font/woff2',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'chrome-webstore-item',
		href: 'https://chrome.google.com/webstore/detail/nmmjeclfkgjdomacpcflgdkgpphpmnfe',
	},
	{
		rel: 'apple-touch-icon',
		href: '/favicons/apple-touch-icon.png',
	},
	{
		rel: 'mask-icon',
		href: '/favicons/safari-pinned-tab.svg',
		color: '#222',
	},
	...favicons,
	...splashScreens,
	{ rel: 'stylesheet', href: typography },
	{ rel: 'stylesheet', href: styles },
]

export const meta: MetaFunction = () => [
	{
		title: 'Colour Contrast Checker',
	},
	{
		name: 'description',
		content: 'Check the contrast between different colour combinations against WCAG standards.',
	},
	...openGraph,
	...twitterCard,
	...msTileIcons,
];

export const loader = async ({
	request,
}: LoaderFunctionArgs): Promise<TypedResponse<TRoot>> => {
	const url = new URL(request.url);
	const cookies = request.headers.get('cookie') ?? '';
	const colorsCookie = decodeCookie('colors', cookies) ?? '[]';

	const bgParam = url.searchParams.get('background');
	const fgParam = url.searchParams.get('foreground');

	const background = getColorValue(bgParam, '#ffe66d');
	const foreground = getColorValue(fgParam, '#222222');

	const colors: TColors[] = JSON.parse(colorsCookie);
	const contrast = setContrast(background, foreground, 12.72);
	const levels = getLevel(contrast);
	const GOOGLE_FONTS_APIKEY = process.env.GOOGLE_FONT_API_KEY;

	return json({
		background,
		foreground,
		colors,
		contrast,
		levels,
		GOOGLE_FONTS_APIKEY,
	});
}

export function Layout({ children }: { children: React.ReactNode }) {
	const data = useLoaderData<typeof loader>();

	const style: CSSCustomProperties = {
		'--background-color': hslToHex(data.background),
		'--foreground-color': hslToHex(data.foreground),
	}

	return (
		<html lang="en-GB">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,minimum-scale=1,user-scalable=yes,initial-scale=1,viewport-fit=cover"
				/>

				<Meta />
				<Links />
			</head>

			<body style={style}>
				<ColourContrastProvider
					background={data.background}
					foreground={data.foreground}
					colors={data.colors}
					contrast={data.contrast}
					levels={data.levels}
				>
					{children}
				</ColourContrastProvider>

				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
