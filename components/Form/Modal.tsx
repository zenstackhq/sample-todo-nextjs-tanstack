import { useMemo } from "react";
import { SpaceElementType, Property, PropertyType, List, Dashboard } from "@prisma/client";
import { useCreateDashboard, useCreateList, useCreateProperty } from "@lib/hooks";
import { useCurrentSpace } from "@lib/context";
import { CreateForm } from "./CreateForm";


export function Modal({ spaceElementType, onClose }: {spaceElementType: SpaceElementType; onClose: () => void;}) {
	const space = useCurrentSpace();
	if (!space) {
		throw "not space";
	}
	const createProperty = useCreateProperty();
	const createList = useCreateList();
	const createDashboard = useCreateDashboard();
	const formContent = useMemo(() => {
		const children = <div className="modal-action">
			<input className="btn btn-primary" type="submit" value="Create" />
			<label htmlFor="create-property-modal" className="btn btn-outline" onClick={onClose}>
				Cancel
			</label>
		</div>;
		switch (spaceElementType) {
			case "List":
			{
				return <CreateForm fields={[
					{
						id: "title",
						type: "text"
					},
					{
						id: "private",
						type: "checkbox"
					}
				]} onSubmitData={async (data: List) => {
					await createList.mutateAsync({
						data: {
							...data,
							spaceElementType: "List",
							spaceId: space.id
						}
					});
				}} onClose={onClose}>
					{children}
				</CreateForm>;
			}
			case "Property":
			{
				return <CreateForm fields={[
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
					},
					{
						id: "private",
						type: "checkbox"
					}
				]} onSubmitData={async (data: Property) => {
					await createProperty.mutateAsync({
						data: {
							...data,
							spaceElementType: "Property",
							spaceId: space.id
						}
					});
				}} onClose={onClose}>
					{children}
				</CreateForm>;
			}
			case "Dashboard":
			{
				return <CreateForm fields={[
					{
						id: "title",
						type: "text"
					},
					{
						id: "private",
						type: "checkbox"
					}
				]} onSubmitData={async (data: Dashboard) => {
					await createDashboard.mutateAsync({
						data: {
							...data,
							spaceElementType: "Dashboard",
							spaceId: space.id
						}
					});
				}} onClose={onClose}>
					{children}
				</CreateForm>;
			}
			default:
				throw "unsupported spaceElementType";
		}
	}, [createDashboard, createList, createProperty, onClose, space.id, spaceElementType]);
	return (
		<div className="modal modal-open">
			<div className="modal-box">
				{formContent}
			</div>
		</div>
	);
}
