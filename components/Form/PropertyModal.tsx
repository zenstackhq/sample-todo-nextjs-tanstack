import { useMemo } from "react";
import { PropertyElementType } from "@prisma/client";
import { useCreateLease } from "@lib/hooks";
import { CreateForm } from "./CreateForm";
import { Property } from "@zenstackhq/runtime/models";
import { LeaseCreateScalarSchema } from "@zenstackhq/runtime/zod/models";


export function PropertyModal({ type, onClose, property }: {type: PropertyElementType; onClose: () => void; property: Property;}) {
	const createLease = useCreateLease();
	const formContent = useMemo(() => {
		switch (type) {
			case "Lease":
			{
				return <CreateForm formSchema={LeaseCreateScalarSchema.omit({ type: true })} onSubmitData={async (data) => {
					await createLease.mutateAsync({
						data: {
							...data,
							propertyId: property.id
						}
					});
				}} onClose={onClose} title={"Lease"}/>;
			}
			default:
				throw "unsupported propertyElementType";
		}
	}, [createLease, onClose, type, property.id]);
	return formContent;
}
