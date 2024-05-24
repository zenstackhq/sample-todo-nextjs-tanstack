import { SpaceContext } from "@lib/context";
import { useCreateProperty } from "@lib/hooks";
import { PropertyType } from "@zenstackhq/runtime/models";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";


export function CreatePropertyDialog() {
	const space = useContext(SpaceContext);

	const [modalOpen, setModalOpen] = useState(false);
	const [type, setType] = useState<PropertyType>("APARTMENT");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [country, setCountry] = useState("");
	const [_private, setPrivate] = useState(false);

	const create = useCreateProperty();

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		toast.dismiss();
		try {
			await create.mutateAsync({
				data: {
					type,
					address,
					city,
					postalCode,
					country,
					private: _private,
					space: { connect: { id: space!.id } }
				}
			});
		} catch (err) {
			toast.error("Failed to create property");
			return;
		}

		toast.success("Property created successfully!");

		// reset states
		setType("APARTMENT");
		setAddress("");
		setCity("");
		setPostalCode("");
		setCountry("");
		setPrivate(false);

		// close modal
		setModalOpen(false);
	};

	return (
		<>
			<input
				type="checkbox"
				id="create-property-modal"
				className="modal-toggle"
				checked={modalOpen}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setModalOpen(e.currentTarget.checked);
				}}
			/>
			{modalOpen && <div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-xl mb-8">Property</h3>
					<form onSubmit={(e) => void onSubmit(e)}>
						<div className="flex flex-col space-y-4">
							<div className="flex items-center">
								<label htmlFor="type" className="text-lg inline-block w-20">
                                    Type
								</label>
								<select
									id="type"
									required
									className="select select-bordered w-full max-w-xs mt-2"
									value={type}
									onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.currentTarget.value as PropertyType)}
								>
									<option value="APARTMENT">APARTMENT</option>
									<option value="HOUSE">HOUSE</option>
									<option value="COMMERCIAL">COMMERCIAL</option>
								</select>
							</div>
							<div className="flex items-center">
								<label htmlFor="address" className="text-lg inline-block w-20">
                                    Address
								</label>
								<input
									id="address"
									type="text"
									required
									placeholder="Address of the property"
									className="input input-bordered w-full max-w-xs mt-2"
									value={address}
									onChange={(e: FormEvent<HTMLInputElement>) => setAddress(e.currentTarget.value)}
								/>
							</div>
							<div className="flex items-center">
								<label htmlFor="city" className="text-lg inline-block w-20">
                                    City
								</label>
								<input
									id="city"
									type="text"
									required
									placeholder="City"
									className="input input-bordered w-full max-w-xs mt-2"
									value={city}
									onChange={(e: FormEvent<HTMLInputElement>) => setCity(e.currentTarget.value)}
								/>
							</div>
							<div className="flex items-center">
								<label htmlFor="postalCode" className="text-lg inline-block w-20">
                                    Postal Code
								</label>
								<input
									id="postalCode"
									type="text"
									required
									placeholder="Postal Code"
									className="input input-bordered w-full max-w-xs mt-2"
									value={postalCode}
									onChange={(e: FormEvent<HTMLInputElement>) => setPostalCode(e.currentTarget.value)}
								/>
							</div>
							<div className="flex items-center">
								<label htmlFor="country" className="text-lg inline-block w-20">
                                    Country
								</label>
								<input
									id="country"
									type="text"
									required
									placeholder="Country"
									className="input input-bordered w-full max-w-xs mt-2"
									value={country}
									onChange={(e: FormEvent<HTMLInputElement>) => setCountry(e.currentTarget.value)}
								/>
							</div>
							<div className="flex items-center">
								<label htmlFor="private" className="text-lg inline-block w-20">
                                    Private
								</label>
								<input
									id="private"
									type="checkbox"
									className="checkbox"
									onChange={(e: FormEvent<HTMLInputElement>) => setPrivate(e.currentTarget.checked)}
								/>
							</div>
						</div>
						<div className="modal-action">
							<input className="btn btn-primary" type="submit" value="Create" />
							<label htmlFor="create-property-modal" className="btn btn-outline">
                                Cancel
							</label>
						</div>
					</form>
				</div>
			</div>}
		</>
	);
}
