import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Dashboard } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardCard({ dashboard }: {dashboard: Dashboard;}) {
	const router = useRouter();
	return (
		<Link href={`${router.asPath}/dashboard/${dashboard.id}`}>
			<div className="card shadow-lg">
				<div className="card-body">
					<h3 className="card-title">{dashboard.title}</h3>
					<div className="card-actions flex w-full justify-between">
						<div className="flex space-x-2">
							{dashboard.private &&
                        <div className="tooltip" data-tip="Private"><LockClosedIcon className="w-4 h-4 text-gray-500" /></div>
							}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
