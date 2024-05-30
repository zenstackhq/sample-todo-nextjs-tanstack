import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Property } from "@prisma/client";
import { SpaceComponent } from "@zenstackhq/runtime/models";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PropertyCard({ property, spaceComponent }: {property: Property; spaceComponent: SpaceComponent;}) {
	const router = useRouter();
	return (
		<Link href={`${router.asPath}/component/${spaceComponent.id}`}>
			<div className="card shadow-lg">
				<div className="card-body">
					<h3 className="card-title">{property.address}</h3>
					<p>Type: {property.type}</p>
					<p>City: {property.city}</p>
					<p>Postal Code: {property.postalCode}</p>
					<p>Country: {property.country}</p>

					<div className="card-actions flex w-full justify-between">
						<div className="flex space-x-2">
							{spaceComponent.private &&
                        <div className="tooltip" data-tip="Private"><LockClosedIcon className="w-4 h-4 text-gray-500" /></div>
							}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
