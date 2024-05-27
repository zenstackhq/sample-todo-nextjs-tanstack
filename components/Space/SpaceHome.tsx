import { useFindManyDashboard, useFindManyList, useFindManyProperty } from "@lib/hooks";
import { Space } from "@prisma/client";
import BreadCrumb from "components/BreadCrumb";
import SpaceMembers from "components/SpaceMembers";
import TodoList from "components/TodoList";
import WithNavBar from "components/WithNavBar";
import PropertyCard from "components/Property/PropertyCard";
import { GenerateDemonstration } from "components/Demonstration/GenerateDemonstration";
import DashboardCard from "components/Dashboard/DashboardCard";
import { SpaceElementType } from "@zenstackhq/runtime/models";
import { useState } from "react";
import { Modal } from "components/Form/Modal";

export type SpaceHomeProps = {space: Space;};
export function SpaceHome(props: SpaceHomeProps) {
	const { data: lists } = useFindManyList(
		{
			where: {
				space: {
					slug: props.space.slug
				}
			},
			include: {
				owner: true
			},
			orderBy: {
				updatedAt: "desc"
			}
		},
		{
			enabled: !!props.space.slug
		}
	);


	const { data: properties } = useFindManyProperty(
		{
			where: {
				space: {
					slug: props.space.slug
				}
			},
			include: {
				owner: true,
				leases: true
			},
			orderBy: {
				updatedAt: "desc"
			}
		},
		{
			enabled: !!props.space.slug
		}
	);


	const { data: dashboards } = useFindManyDashboard(
		{
			where: {
				space: {
					slug: props.space.slug
				}
			},
			include: {
				owner: true,
				panelRows: true
			},
			orderBy: {
				updatedAt: "desc"
			}
		},
		{
			enabled: !!props.space.slug
		}
	);

	const [spaceElementType, setSpaceElementType] = useState<SpaceElementType>();

	return (
		<WithNavBar>
			<div className="px-8 py-2">
				<BreadCrumb />
			</div>
			<div className="p-8">
				<div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
					<label htmlFor="create-list-modal" className="btn btn-primary btn-wide modal-button" onClick={() => setSpaceElementType("List")}>
                        Create a list
					</label>
					<label htmlFor="create-property-modal" className="btn btn-primary btn-wide modal-button" onClick={() => setSpaceElementType("Property")}>
                        Create a property
					</label>
					<label htmlFor="create-property-modal" className="btn btn-primary btn-wide modal-button" onClick={() => setSpaceElementType("Dashboard")}>
                        Create a dashboard
					</label>
					<GenerateDemonstration/>
					<SpaceMembers />
				</div>

				<h2 className="text-xl font-semibold mb-4">Lists</h2>
				<ul className="flex flex-wrap gap-6 mb-8">
					{lists?.map((list) =>
						<li key={list.id}>
							<TodoList value={list} />
						</li>
					)}
				</ul>

				<h2 className="text-xl font-semibold mb-4">Properties</h2>
				<ul className="flex flex-wrap gap-6 mb-8">
					{properties?.map((property) =>
						<li key={property.id}>
							<PropertyCard value={property}/>
						</li>
					)}
				</ul>

				<h2 className="text-xl font-semibold mb-4">Dashboards</h2>
				<ul className="flex flex-wrap gap-6 mb-8">
					{dashboards?.map((dashboard) =>
						<li key={dashboard.id}>
							<DashboardCard dashboard={dashboard}/>
						</li>
					)}
				</ul>
				{spaceElementType && <Modal spaceElementType={spaceElementType} onClose={() => setSpaceElementType(void 0)}/>}
			</div>
		</WithNavBar>
	);
}
