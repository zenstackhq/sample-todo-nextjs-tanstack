import { useCurrentUser } from "@lib/context";
import NavBar from "./NavBar";
import { ReactNode } from "react";

type Props = {
	children: ReactNode | ReactNode[] | undefined;
};

export default function WithNavBar({ children }: Props) {
	const user = useCurrentUser();

	return (
		<>
			<NavBar user={user} />
			{children}
		</>
	);
}
