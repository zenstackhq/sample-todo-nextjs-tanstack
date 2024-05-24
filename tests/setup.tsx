import { vi } from "vitest";
import { ReactNode } from "react";

vi.mock("next-auth/react", () => ({
	SessionProvider: ({ children }: { children: ReactNode; }) =>
		<>{children}</>
	,
	useSession: () => ({
		user: "test-user"
	})
}));

