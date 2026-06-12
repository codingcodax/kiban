import '~/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
		<body>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</ThemeProvider>
		</body>
	</html>
);

export default RootLayout;
