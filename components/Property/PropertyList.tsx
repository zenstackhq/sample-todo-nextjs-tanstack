import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Property } from "@prisma/client";
import { User } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";


type Props = {
	value: Property & { owner: User; };
};

export default function PropertyList({ value }: Props) {
	const router = useRouter();
	return (
		<Link href={`${router.asPath}/property/${value.id}`}>
			<div className="card shadow-lg">
				<div className="card-body">
					<h3 className="card-title">{value.address}</h3>
					<p>Type: {value.type}</p>
					<p>City: {value.city}</p>
					<p>Postal Code: {value.postalCode}</p>
					<p>Country: {value.country}</p>

					<div className="card-actions flex w-full justify-between">
						<div className="flex space-x-2">
							{value.private &&
                        <div className="tooltip" data-tip="Private"><LockClosedIcon className="w-4 h-4 text-gray-500" /></div>
							}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
