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
			: 'http://localhost:3000'
	),
	title: 'Kiban - Sistema Moderno de Punto de Venta para Tu Negocio',
	description:
		'Kiban es un software de punto de venta diseñado especialmente para minoristas que buscan una gestión de ventas eficiente, confiable y segura. Ya sea que manejes múltiples empleados o una gran variedad de productos, Kiban brinda datos en tiempo real y automatiza tus flujos de trabajo.',
	openGraph: {
		title: 'Kiban - Sistema Moderno de Punto de Venta para Tu Negocio',
		description:
			'Kiban es un software de punto de venta diseñado especialmente para minoristas que buscan una gestión de ventas eficiente, confiable y segura..',
		url: 'https://kiban.codingcodax.dev',
		siteName: 'Kiban',
		images: [
			{
				url: '/og.png',
				width: 1200,
				height: 630,
				alt: 'Kiban - Sistema Moderno de Punto de Venta para Tu Negocio',
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
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
}
