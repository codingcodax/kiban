import '~/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from '~/components/theme-provider';
import { env } from '~/env';
import { cn } from '~/lib/utils';
import { TRPCReactProvider } from '~/trpc/react';

export const metadata: Metadata = {
	metadataBase: new URL(
		env.VERCEL_ENV === 'production'
			? 'https://kiban.codingcodax.dev'
			: 'https://kiban.localhost'
	),
	title: 'Kiban - Template Moderno para Aplicaciones Full-stack',
	description:
		'Kiban es un template de aplicación full-stack moderno, diseñado para ofrecer una base sólida, segura y escalable. Utiliza Next.js, tRPC, Drizzle ORM y Better Auth para acelerar el desarrollo de tus proyectos.',
	openGraph: {
		title: 'Kiban - Template Moderno para Aplicaciones Full-stack',
		description:
			'Kiban es un template de aplicación full-stack moderno, diseñado para ofrecer una base sólida, segura y escalable. Utiliza Next.js, tRPC, Drizzle ORM y Better Auth para acelerar el desarrollo de tus proyectos.',
		url: 'https://kiban.codingcodax.dev',
		siteName: 'Kiban',
		images: [
			{
				url: '/og.png',
				width: 1200,
				height: 630,
				alt: 'Kiban - Template Moderno para Aplicaciones Full-stack',
				type: 'image/png',
			},
		],
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
		title: 'Kiban',
		startupImage: [
			{
				url: '/web-app-manifest-512x512.png',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@codingcodax',
		creator: '@codingcodax',
	},
};

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
		{ media: '(prefers-color-scheme: dark)', color: '#0E172A' },
	],
	maximumScale: 1,
	userScalable: false,
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<html
		className={cn(
			'antialiased',
			fontMono.variable,
			'font-sans',
			geist.variable
		)}
		data-scroll-behavior='smooth'
		lang='en'
		suppressHydrationWarning
	>
		<head>
			{env.NODE_ENV === 'development' && (
				<Script
					crossOrigin='anonymous'
					integrity='sha384-9R80nES+SMS2/gQ42P+Pw818FgW6VtchUxT6IjF8SHzIJSZdWDjLnr/NTCL8n28Q'
					src='//unpkg.com/react-grab@0.1.44/dist/index.global.js'
					strategy='beforeInteractive'
				/>
			)}
			{env.NODE_ENV === 'development' && (
				<Script
					crossOrigin='anonymous'
					integrity='sha384-XSYLwy0/dkDwkCK2b+VOV4Jo4F9JbFMvIxK+pAV414GVJbm9M1R4mLQeXr2848kJ'
					src='//unpkg.com/@react-grab/mcp@0.1.37/dist/client.global.js'
					strategy='lazyOnload'
				/>
			)}
		</head>
		<body>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</ThemeProvider>
		</body>
	</html>
);

export default RootLayout;
