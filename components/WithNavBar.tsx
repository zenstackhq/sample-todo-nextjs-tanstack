import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { ReactNode } from "react";


type Props = {
	children: ReactNode | ReactNode[] | undefined;
};

export default function WithNavBar({ children }: Props) {
	return (
		<>
			<Header />
			<div className="flex h-screen overflow-hidden">
				<Sidebar />
				<main className="w-full pt-16">{children}</main>
			</div>
		</>
	);
}
