import { useCreateSpaceComponent, useFindUniqueSpace } from "@/lib/hooks";
import BreadCrumb from "@/components/BreadCrumb";
import SpaceMembers from "components/SpaceMembers";
import TodoList from "components/TodoList";
import WithNavBar from "components/WithNavBar";
import PropertyCard from "components/Property/PropertyCard";
import { GenerateDemonstration } from "components/Demonstration/GenerateDemonstration";
import DashboardCard from "components/Dashboard/DashboardCard";
import { useRouter } from "next/router";
import { CreateForm } from "components/Form/CreateForm";
import { Property, List, Dashboard, Space, User } from "@prisma/client";
import { SpaceComponent } from "@zenstackhq/runtime/models";
import { PropertyCreateScalarSchema, ListCreateScalarSchema, DashboardCreateScalarSchema, SpaceComponentCreateScalarSchema } from "@zenstackhq/runtime/zod/models";
import { z } from "zod";

export function SpaceHomeComponent({ space }: {space: Space & {spaceComponents: (SpaceComponent & {
	owner: User;
	dashboard?: Dashboard | null;
	list?: List | null;
	property?: Property | null;
})[];};}) {

	const createSpaceComponent = useCreateSpaceComponent();

	return (
		<WithNavBar>
			<div className="px-8 py-2">
				<BreadCrumb />
			</div>
			<div className="p-8">
				<div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
					<CreateForm
						formSchema={z.object({ list: ListCreateScalarSchema, spaceComponent: SpaceComponentCreateScalarSchema.omit({ type: true }) })}
						onSubmitData={async (data) => {
							await createSpaceComponent.mutateAsync({
								data: {
									...data.spaceComponent,
									type: "List",
									spaceId: space.id,
									list: { create: { ...data.list } }
								}
							});
						}} title={"Create List"}/>
					<CreateForm
						formSchema={z.object({ property: PropertyCreateScalarSchema, spaceComponent: SpaceComponentCreateScalarSchema.omit({ type: true }) })}
						onSubmitData={async (data) => {
							await createSpaceComponent.mutateAsync({
								data: {
									...data.spaceComponent,
									type: "Property",
									spaceId: space.id,
									property: { create: {
										...data.property
									} }
								}
							});
						}} title={"Create Property"}/>
					<CreateForm
						formSchema={z.object({ dashboard: DashboardCreateScalarSchema, spaceComponent: SpaceComponentCreateScalarSchema.omit({ type: true }) })}
						onSubmitData={async (data) => {
							await createSpaceComponent.mutateAsync({
								data: {
									...data.spaceComponent,
									spaceId: space.id,
									type: "Dashboard",
									dashboard: { create: { ...data.dashboard } }
								}
							});
						}} title={"Create Dashboard"}/>
					<GenerateDemonstration/>
					<SpaceMembers />
				</div>

				<h2 className="text-xl font-semibold mb-4">Components</h2>
				<ul className="flex flex-wrap gap-6 mb-8">
					{space?.spaceComponents?.map((spaceComponent) =>
						<li key={spaceComponent.id}>
							{spaceComponent.list && <TodoList list={spaceComponent.list} owner={spaceComponent.owner} spaceComponent={spaceComponent} />}
							{spaceComponent.dashboard && <DashboardCard dashboard={spaceComponent.dashboard} spaceComponent={spaceComponent}/>}
							{spaceComponent.property && <PropertyCard property={spaceComponent.property} spaceComponent={spaceComponent}/>}
						</li>
					)}
				</ul>
			</div>
		</WithNavBar>
	);
}
export default function SpaceHome() {
	const router = useRouter();
	const { data: space } = useFindUniqueSpace(
		{
			where: {
				slug: router.query.slug as string
			},
			include: {
				spaceComponents: {
					include: {
						owner: true,
						dashboard: true,
						list: true,
						property: true
					},
					orderBy: {
						updatedAt: "desc"
					}
				}
			}
		},
		{
			enabled: !!router.query.slug
		}
	);
	if (!space) {
		return <></>;
	}

	return <SpaceHomeComponent space={space}/>;
}

