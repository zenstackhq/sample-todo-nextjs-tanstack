'use client';

import 'assets/styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <div className="h-screen flex flex-col">{children}</div>
                </Providers>
                <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />{' '}
            </body>
        </html>
    );
}
