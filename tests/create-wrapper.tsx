import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider"

const createQueryWrapper = (children: React.ReactNode) =>
{
	const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
	return <QueryClientProvider client={queryClient}>
		{children}
	</QueryClientProvider>;
};


export const createWrapper = () =>
{
	return ({ children }: { children: React.ReactNode; }) => createQueryWrapper(<MemoryRouterProvider><SessionProvider>{children}</SessionProvider></MemoryRouterProvider>);
};
