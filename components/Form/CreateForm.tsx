import { useCurrentSpace } from "@lib/context";
import { toast } from "react-toastify";
import { Modal } from "./Modal";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { z } from "zod";
import { ZodObjectOrWrapped } from "@/components/ui/auto-form/utils";

export function CreateForm<SchemaType extends ZodObjectOrWrapped>({ onSubmitData, onClose, formSchema, title }: {
	onSubmitData: (data: z.infer<SchemaType>) => Promise<void>;
	onClose: () => void;
	title: string;
	formSchema: SchemaType;
}) {
	const space = useCurrentSpace();

	if (!space) {
		return <></>;
	}

	const onSubmit = async (data: z.infer<SchemaType>) => {
		toast.dismiss();
		try {
			await onSubmitData(data);
			toast.success("Created successfully!");
			onClose();
		} catch (err) {
			toast.error("Failed to create");
		}
	};
	return (
		<Modal>
			<>
				<h3 className="font-bold text-xl mb-8">{title}</h3>
				<AutoForm formSchema={formSchema} onSubmit={onSubmit}>
					<div className="modal-action">
						<AutoFormSubmit className="btn btn-primary">Submit</AutoFormSubmit>
						<label className="btn btn-outline" onClick={onClose}>
				Cancel
						</label>
					</div>
				</AutoForm>

			</>
		</Modal>
	);
}
