import { useMemo } from "react";
import { PropertyElementType } from "@prisma/client";
import { useCreateLease } from "@lib/hooks";
import { CreateForm } from "./CreateForm";
import { Property } from "@zenstackhq/runtime/models";


export function PropertyModal({ propertyElementType, onClose, property }: {propertyElementType: PropertyElementType; onClose: () => void; property: Property;}) {
	const createLease = useCreateLease();
	const formContent = useMemo(() => {
		const children = <div className="modal-action">
			<input className="btn btn-primary" type="submit" value="Create" />
			<label htmlFor="create-property-modal" className="btn btn-outline" onClick={onClose}>
				Cancel
			</label>
		</div>;
		switch (propertyElementType) {
			case "Lease":
			{
				return <CreateForm fields={[
					{
						id: "startDate",
						type: "date"
					},
					{
						id: "endDate",
						type: "date"
					},
					{
						id: "rentAmount",
						type: "number"
					}
				]} onSubmitData={async ({ data }) => {
					await createLease.mutateAsync({
						data: {
							...data,
							propertyId: property.id
						}
					});
				}} onClose={onClose} showPrivate={false}>
					{children}
				</CreateForm>;
			}
			default:
				throw "unsupported propertyElementType";
		}
	}, [createLease, onClose, propertyElementType, property.id]);
	return (
		<div className="modal modal-open">
			<div className="modal-box">
				{formContent}
			</div>
		</div>
	);
}
