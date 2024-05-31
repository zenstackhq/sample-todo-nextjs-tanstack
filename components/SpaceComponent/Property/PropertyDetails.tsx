import { useCurrentSpace, useCurrentSpaceComponent } from "@/lib/context";
import { useCreateLease, useFindUniqueProperty  } from "@/zmodel/lib/hooks";
import LeaseDetail from "components/Lease/LeaseList";
import { LeaseCreateScalarSchema } from "@zenstackhq/runtime/zod/models";
import { CreateForm } from "@/components/Form/CreateForm";

export function PropertyDetails() {

	const space = useCurrentSpace();
	const spaceComponent = useCurrentSpaceComponent();

	const { data: property } = useFindUniqueProperty(
		{
			where: {
				spaceComponentId: spaceComponent?.id
			},
			include: {
				leases: {
					orderBy: {
						createdAt: "desc"
					},
					include: {
						owner: true
					}
				}
			}
		},
		{
			enabled: !!spaceComponent?.id
		}
	);

	const createLease = useCreateLease();

	if (!space || !property) {
		return <></>;
	}

	return <>
		<h1 className="text-2xl font-semibold mb-4">{property?.address}</h1>
		<div className="flex space-x-2">
			<div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
				<CreateForm formSchema={LeaseCreateScalarSchema.omit({ type: true })} onSubmitData={async (data) => {
					await createLease.mutateAsync({
						data: {
							...data,
							propertyId: property.id
						}
					});
				}} title={"Create Lease"}/>
			</div>
		</div>
		<ul className="flex flex-col space-y-4 py-8 w-11/12 md:w-auto">
			{property.leases?.map((lease) =>
				<LeaseDetail key={lease.id} {...{ lease }}/>
			)}
		</ul>
	</>;
}
