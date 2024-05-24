
import { Lease } from "@prisma/client";
import { format } from "date-fns";

export default function LeaseDetail({ lease }: {lease: Lease;}) {
	return (
		<div className="card shadow-lg">
			<div className="card-body">
				<h3 className="card-title">Lease</h3>
				<p>Start Date: {format(lease.startDate, "yyyy-MM-dd")}</p>
				<p>End Date: {lease.endDate ? format(new Date(lease.endDate), "yyyy-MM-dd") : "N/A"}</p>
				<p>Rent Amount: ${lease.rentAmount}</p>
			</div>
		</div>
	);
}
