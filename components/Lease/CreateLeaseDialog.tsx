import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useCreateLease } from "@lib/hooks";
import NumericInput from "react-numeric-input";

export function CreateLeaseDialog({ propertyId }: {propertyId: string;}) {

	const [modalOpen, setModalOpen] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [rentAmount, setRentAmount] = useState(0);

	const create = useCreateLease();

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		toast.dismiss();
		try {
			await create.mutateAsync({
				data: {
					propertyId,
					startDate: new Date(startDate),
					endDate: endDate ? new Date(endDate) : null,
					rentAmount
				}
			});
		} catch (err) {
			toast.error("Failed to create lease");
			return;
		}

		toast.success("Lease created successfully!");
		setStartDate("");
		setEndDate("");
		setRentAmount(0);
		setModalOpen(false);
	};

	return (
		<>
			<input
				type="checkbox"
				id="create-lease-modal"
				className="modal-toggle"
				checked={modalOpen}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setModalOpen(e.currentTarget.checked)}
			/>
			{modalOpen &&
<div className="modal">
	<div className="modal-box">
		<h3 className="font-bold text-xl mb-8">Lease</h3>
		<form onSubmit={(e) => void onSubmit(e)}>
			<div className="flex flex-col space-y-4">
				<div className="flex items-center">
					<label htmlFor="startDate" className="text-lg inline-block w-20">
Start Date
					</label>
					<input
						id="startDate"
						type="date"
						required
						className="input input-bordered w-full max-w-xs mt-2"
						value={startDate}
						onChange={(e: FormEvent<HTMLInputElement>) => setStartDate(e.currentTarget.value)}
					/>
				</div>
				<div className="flex items-center">
					<label htmlFor="endDate" className="text-lg inline-block w-20">
End Date
					</label>
					<input
						id="endDate"
						type="date"
						className="input input-bordered w-full max-w-xs mt-2"
						value={endDate}
						onChange={(e: FormEvent<HTMLInputElement>) => setEndDate(e.currentTarget.value)}
					/>
				</div>
				<div className="flex items-center">
					<label htmlFor="rentAmount" className="text-lg inline-block w-20">
Rent Amount
					</label>
					<NumericInput
						id="rentAmount"
						type="number"
						required
						placeholder="Rent Amount"
						className="input input-bordered w-full max-w-xs mt-2"
						value={rentAmount}
						onChange={(e) => e === null ? null : setRentAmount(e)}
					/>
				</div>
			</div>
			<div className="modal-action">
				<input className="btn btn-primary" type="submit" value="Create" />
				<label htmlFor="create-lease-modal" className="btn btn-outline">
Cancel
				</label>
			</div>
		</form>
	</div>
</div>
			}
		</>
	);
}
