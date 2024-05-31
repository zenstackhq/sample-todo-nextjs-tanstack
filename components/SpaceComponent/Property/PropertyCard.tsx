import { Property } from "@prisma/client";

export function PropertyCard({ property }: {property: Property;}) {
	return <div><p>Type: {property.type}</p>
		<p>Address: {property.address}</p>
		<p>City: {property.city}</p>
		<p>Postal Code: {property.postalCode}</p>
		<p>Country: {property.country}</p></div>;
}
