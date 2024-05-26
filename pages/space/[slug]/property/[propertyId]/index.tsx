import { useFindManyLease  } from "@lib/hooks";
import { Property, Space, Charge } from "@prisma/client";
import BreadCrumb from "components/BreadCrumb";
import { CreateLeaseDialog } from "components/Lease/CreateLeaseDialog";
import LeaseDetail from "components/Lease/LeaseList";
import WithNavBar from "components/WithNavBar";
import { GetServerSideProps } from "next";
import { getEnhancedPrisma } from "server/enhanced-db";

type Props = {
	space: Space;
	property: Property;
};

export default function PropertyDetails(props: Props) {

	const { data } = useFindManyLease({
		where: { propertyId: props.property.id },
		include: {
			owner: true
		},
		orderBy: {
			createdAt: "desc" as const
		}
	});

	if (!props.space || !props.property) {
		return <></>;
	}

	return (
		<WithNavBar>
			<div className="px-8 py-2">
				<BreadCrumb property={props.property} />
			</div>
			<div className="container w-full flex flex-col items-center py-12 mx-auto">
				<h1 className="text-2xl font-semibold mb-4">{props.property?.address}</h1>
				<div className="flex space-x-2">
					<div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
						<label htmlFor="create-lease-modal" className="btn btn-primary btn-wide modal-button">
                        Create a lease
						</label>
					</div>
				</div>
				<ul className="flex flex-col space-y-4 py-8 w-11/12 md:w-auto">
					{data?.map((lease) =>
						<LeaseDetail key={lease.id} {...{ lease }}/>
					)}
				</ul>
			</div>
			<CreateLeaseDialog propertyId={props.property.id}/>
		</WithNavBar>
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res, params }) => {
	const db = await getEnhancedPrisma({ req, res });
	const space = await db.space.findUnique({
		where: { slug: params!.slug as string }
	});
	if (!space) {
		return {
			notFound: true
		};
	}

	const property = await db.property.findUnique({
		where: { id: params!.propertyId as string }
	});
	if (!property) {
		return {
			notFound: true
		};
	}

	return {
		props: { space, property }
	};
};
