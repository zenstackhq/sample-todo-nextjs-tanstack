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
import { PropertyCreateScalarSchema, SpaceComponentCreateScalarSchema } from "@zenstackhq/runtime/zod/models";
import { z } from "zod";
import { Applications } from "@/components/Application/Applications";

export function SpaceHomeComponent({ space }: {space: Space & {components: (SpaceComponent & {
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
						formSchema={z.object({ spaceComponent: SpaceComponentCreateScalarSchema.omit({ type: true }) })}
						onSubmitData={async (data) => {
							await createSpaceComponent.mutateAsync({
								data: {
									...data.spaceComponent,
									type: "List",
									spaceId: space.id,
									list: { create: {  } }
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
						formSchema={z.object({ spaceComponent: SpaceComponentCreateScalarSchema.omit({ type: true }) })}
						onSubmitData={async (data) => {
							await createSpaceComponent.mutateAsync({
								data: {
									...data.spaceComponent,
									spaceId: space.id,
									type: "Dashboard",
									dashboard: { create: {  } }
								}
							});
						}} title={"Create Dashboard"}/>
					<GenerateDemonstration/>
					<SpaceMembers />
					<Applications/>
				</div>

				<h2 className="text-xl font-semibold mb-4">Components</h2>
				<ul className="flex flex-wrap gap-6 mb-8">
					{space?.components?.map((component) =>
						<li key={component.id}>
							{component.list && <TodoList list={component.list} owner={component.owner} spaceComponent={component} />}
							{component.dashboard && <DashboardCard spaceComponent={component}/>}
							{component.property && <PropertyCard property={component.property} spaceComponent={component}/>}
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
				components: {
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

