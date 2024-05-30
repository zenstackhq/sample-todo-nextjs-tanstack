import { useCurrentUser } from "@/lib/context";
import { useFindManySpace } from "@/lib/hooks";
import Spaces from "components/Spaces";
import WithNavBar from "components/WithNavBar";
import type { NextPage } from "next";
import Link from "next/link";


const Home: NextPage = () => {
	const user = useCurrentUser();

	const { data: spaces } = useFindManySpace();
	return (
		<WithNavBar>
			{user &&
				<div className="mt-8 text-center flex flex-col items-center w-full">
					<h1 className="text-2xl text-gray-800">Welcome {user.name || user.email}!</h1>

					<div className="w-full p-8">
						<h2 className="text-lg md:text-xl text-left mb-8 text-gray-700">
				Choose a space to start, or{" "}
							<Link href="/create-space" className="link link-primary">
				create a new one.
							</Link>
						</h2>
						{spaces && <Spaces spaces={spaces} />}
					</div>
				</div>
			}
		</WithNavBar>
	);
};


export default Home;
