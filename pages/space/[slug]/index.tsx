import { useCreateSpaceComponent, useFindUniqueSpace } from "@lib/hooks";
import BreadCrumb from "components/BreadCrumb";
import SpaceMembers from "components/SpaceMembers";
import TodoList from "components/TodoList";
import WithNavBar from "components/WithNavBar";
import PropertyCard from "components/Property/PropertyCard";
import { GenerateDemonstration } from "components/Demonstration/GenerateDemonstration";
import DashboardCard from "components/Dashboard/DashboardCard";
import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { CreateForm } from "components/Form/CreateForm";
import { Property, PropertyType, List, Dashboard, Space, User } from "@prisma/client";
import { SpaceComponent } from "@zenstackhq/runtime/models";

export function SpaceHomeComponent({ space }: {space: Space & {spaceComponents: (SpaceComponent & {
	owner: User;
	dashboard?: Dashboard | null;
	list?: List | null;
	property?: Property | null;
})[];};}) {

	const [modalForm, setModalForm] = useState<ReactElement | undefined>();
	const onClose = () => setModalForm(void 0);
	const createSpaceComponent = useCreateSpaceComponent();

	return (
		<WithNavBar>
			<div className="px-8 py-2">
				<BreadCrumb />
			</div>
			<div className="p-8">
				<div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
					<label htmlFor="create-list-modal" className="btn btn-primary btn-wide modal-button" onClick={() => setModalForm(<CreateForm fields={[
						{
							id: "title",
							type: "text"
						}
					]} onSubmitData={async ({ data, _private }) => {
						await createSpaceComponent.mutateAsync({
							data: {
								spaceId: space.id,
								private: _private,
								type: "List",
								list: { create: { ...data } }
							}
						});
					}} onClose={onClose} showPrivate={true} title={"List"}/>)}>
                        Create a list
					</label>
					<label className="btn btn-primary btn-wide modal-button" onClick={() => setModalForm(<CreateForm fields={[
						{
							id: "type",
							type: "select",
							values: PropertyType
						},
						{
							id: "address",
							type: "text"
						},
						{
							id: "city",
							type: "text"
						},
						{
							id: "postalCode",
							type: "text"
						},
						{
							id: "country",
							type: "text"
						}
					]} onSubmitData={async ({ data, _private }) => {
						await createSpaceComponent.mutateAsync({
							data: {
								spaceId: space.id,
								private: _private,
								type: "Property",
								property: { create: {
									...data
								} }
							}
						});
					}} onClose={onClose} showPrivate={true} title={"Property"}/>)}>
                        Create a property
					</label>
					<label className="btn btn-primary btn-wide modal-button" onClick={() => setModalForm(<CreateForm fields={[
						{
							id: "title",
							type: "text"
						}
					]} onSubmitData={async ({ data, _private }) => {
						await createSpaceComponent.mutateAsync({
							data: {
								spaceId: space.id,
								private: _private,
								type: "Dashboard",
								dashboard: { create: { ...data } }
							}
						});
					}} onClose={onClose} showPrivate={true} title={"Dashboard"}/>)}>
                        Create a dashboard
					</label>
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
				{modalForm && modalForm}
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

