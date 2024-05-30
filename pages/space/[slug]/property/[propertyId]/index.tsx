import { useCurrentSpace } from "@/lib/context";
import { useCreateLease, useFindUniqueProperty  } from "@/lib/hooks";
import BreadCrumb from "@/components/BreadCrumb";
import LeaseDetail from "components/Lease/LeaseList";
import WithNavBar from "components/WithNavBar";
import { useRouter } from "next/router";
import { LeaseCreateScalarSchema } from "@zenstackhq/runtime/zod/models";
import { CreateForm } from "@/components/Form/CreateForm";

export default function PropertyDetails() {

	const space = useCurrentSpace();
	const router = useRouter();
	const { data: property } = useFindUniqueProperty(
		{
			where: {
				id: router.query.propertyId as string
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
			enabled: !!router.query.propertyId
		}
	);

	const createLease = useCreateLease();

	if (!space || !property) {
		return <></>;
	}

	return (
		<WithNavBar>
			<div className="px-8 py-2">
				<BreadCrumb property={property} />
			</div>
			<div className="container w-full flex flex-col items-center py-12 mx-auto">
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
			</div>
		</WithNavBar>
	);
}
