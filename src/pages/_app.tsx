import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<SWRConfig
				value={{
					fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
				}}
			>
				<ChakraProvider resetCSS theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</SWRConfig>
		</SessionProvider>
	);
}
