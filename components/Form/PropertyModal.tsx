import { useMemo } from "react";
import { PropertyElementType } from "@prisma/client";
import { useCreateLease } from "@lib/hooks";
import { CreateForm } from "./CreateForm";
import { Lease, Property } from "@zenstackhq/runtime/models";


export function PropertyModal({ type, onClose, property }: {type: PropertyElementType; onClose: () => void; property: Property;}) {
	const createLease = useCreateLease();
	const formContent = useMemo(() => {
		switch (type) {
			case "Lease":
			{
				return <CreateForm<Lease> fields={[
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
				}} onClose={onClose} showPrivate={false} title={"Lease"}/>;
			}
			default:
				throw "unsupported propertyElementType";
		}
	}, [createLease, onClose, type, property.id]);
	return formContent;
}
