import { CreateForm } from "@/components/Form/CreateForm";
import { Spaces } from "@/components/Home/Spaces";
import { WithNavBar } from "@/components/layout/WithNavBar";
import { useCurrentUser } from "@/lib/context";
import { useCreateSpace, useFindManySpace } from "@/zmodel/lib/hooks";
import { SpaceUserRole } from "@prisma/client";
import { SpaceCreateScalarSchema } from "@zenstackhq/runtime/zod/models";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { z } from "zod";


const Home: NextPage = () => {
	const user = useCurrentUser();
	const router = useRouter();
	const createSpace = useCreateSpace();
	const { data: spaces } = useFindManySpace();
	return (
		<WithNavBar>
			{user &&
				<div className="mt-8 text-center flex flex-col items-center w-full">
					<h1 className="text-xl">Welcome {user.name || user.email}!</h1>

					<div className="w-full p-8">
							Choose a space to start

						<div className="p-8">
							<div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
								<CreateForm
									formSchema={z.object({ space: SpaceCreateScalarSchema })}
									onSubmitData={async (data) => {

										const space = await createSpace.mutateAsync({
											data: {
												...data.space,
												members: {
													create: [
														{
															userId: user.id,
															role: SpaceUserRole.ADMIN
														}
													]
												}
											}
										});

										if (space) {
											void router.push(`/space/${space.slug}`);
										}

									}} title={"Create Space"}/>
							</div>
						</div>
						{spaces && <Spaces spaces={spaces} />}
					</div>
				</div>
			}
		</WithNavBar>
	);
};


export default Home;
