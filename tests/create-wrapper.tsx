import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { render } from "@testing-library/react";

const createQueryWrapper = (children: React.ReactNode) => {
	const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
	return <QueryClientProvider client={queryClient}>
		<SessionProvider>
			<TooltipProvider>
				<MemoryRouterProvider>
					{children}
				</MemoryRouterProvider>
			</TooltipProvider>
		</SessionProvider>
	</QueryClientProvider>;
};


const createWrapper = () => {
	return ({ children }: { children: ReactNode; }) => createQueryWrapper(children);
};

export function renderProvide(node: ReactNode) {
	return render(node, { wrapper: createWrapper() });
}
