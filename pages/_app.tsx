import { SpaceContext, useCurrentSpace, useCurrentUser, UserContext } from '@lib/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthGuard from 'components/AuthGuard';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as ZenStackHooksProvider } from '../lib/hooks';
import '../styles/globals.css';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools /> */}
            <SessionProvider session={session}>
                <ZenStackHooksProvider value={{ endpoint: '/api/model', logging: true }}>
                    <AppContent>
                        <div className="flex-grow h-100">
                            <Component {...pageProps} />
                            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />
                        </div>
                    </AppContent>
                </ZenStackHooksProvider>
            </SessionProvider>
        </QueryClientProvider>
    );
}

function AppContent(props: { children: JSX.Element | JSX.Element[] }) {
    const user = useCurrentUser();
    const space = useCurrentSpace();

    return (
        <AuthGuard>
            <UserContext.Provider value={user}>
                <SpaceContext.Provider value={space}>
                    <div className="h-screen flex flex-col">{props.children}</div>
                </SpaceContext.Provider>
            </UserContext.Provider>
        </AuthGuard>
    );
}

export default App;
