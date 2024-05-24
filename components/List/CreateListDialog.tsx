import { useCreateList } from "@lib/hooks";
import { SpaceHomeProps } from "components/Space/SpaceHome";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

export function CreateListDialog(props: SpaceHomeProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const [title, setTitle] = useState("");
	const [_private, setPrivate] = useState(false);

	const create = useCreateList();

	const inputRef = useRef<HTMLInputElement>(null);

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			await create.mutateAsync({
				data: {
					title,
					private: _private,
					space: { connect: { id: props.space.id } }
				}
			});
		} catch (err) {
			toast.error("Failed to create list");
			return;
		}

		toast.success("List created successfully!");

		// reset states
		setTitle("");
		setPrivate(false);

		// close modal
		setModalOpen(false);
	};

	return (
		<>
			<input
				type="checkbox"
				id="create-list-modal"
				className="modal-toggle"
				checked={modalOpen}
				onChange={(e: ChangeEvent<HTMLInputElement>) => {
					setModalOpen(e.currentTarget.checked);
				}}
			/>
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-xl mb-8">Create a Todo list</h3>
					<form onSubmit={(e) => void onSubmit(e)}>
						<div className="flex flex-col space-y-4">
							<div className="flex items-center">
								<label htmlFor="title" className="text-lg inline-block w-20">
                                    Title
								</label>
								<input
									id="title"
									type="text"
									required
									placeholder="Title of your list"
									ref={inputRef}
									className="input input-bordered w-full max-w-xs mt-2"
									value={title}
									onChange={(e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
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
							<label htmlFor="create-list-modal" className="btn btn-outline">
                                Cancel
							</label>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
