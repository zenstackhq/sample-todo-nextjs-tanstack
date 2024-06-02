import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthGuard from "components/AuthGuard";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider as ZenStackHooksProvider } from "../zmodel/lib/hooks";
import "../styles/globals.css";
import { ReactElement } from "react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient();

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (

		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools /> */}
			<SessionProvider session={session}>
				<TooltipProvider>
					<ZenStackHooksProvider value={{ endpoint: "/api/model", logging: true }}>
						<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
							<AppContent>
								<div className="h-100 grow">
									<Component {...pageProps} />
									<ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />
								</div>
							</AppContent>
						</ThemeProvider>
					</ZenStackHooksProvider>
				</TooltipProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
}

function AppContent(props: { children: ReactElement | ReactElement[]; }) {
	return (
		<AuthGuard>
			<div className="flex h-screen flex-col">{props.children}</div>
		</AuthGuard>
	);
}

export default App;
