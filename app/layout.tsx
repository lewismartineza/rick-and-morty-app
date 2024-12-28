import "@/styles/global-sass.scss";
import "@/styles/globals.css";

import { Navbar } from "@/components/navbar";
import { QueryClientProvider } from "@/components/query-client";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { Suspense } from "react";
import { Providers } from "./providers";

const orbitron = Orbitron({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/rick-and-morty.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					`${orbitron.className} ${orbitron.className}`,
				)}
			>
				<QueryClientProvider>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						<div className="relative flex flex-col h-screen">
							<Suspense fallback={<div>Loading...</div>}>
								<Navbar />
							</Suspense>
							<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
								{children}
							</main>
							<footer className="w-full flex items-center justify-center py-3">
								<Link
									isExternal
									className="flex items-center gap-1 text-current"
									href="/"
								>
									<span className="text-default-600">Powered by</span>
									<p className="text-purple">Lewis Martinez Ahumada</p>
								</Link>
							</footer>
						</div>
					</Providers>
				</QueryClientProvider>
			</body>
		</html>
	);
}