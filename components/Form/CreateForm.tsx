import { useCurrentSpace } from "@/lib/context";
import { toast } from "react-toastify";
import AutoForm from "@/components/ui/auto-form";
import { z } from "zod";
import { ZodObjectOrWrapped } from "@/components/ui/auto-form/utils";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";


export function CreateForm<SchemaType extends ZodObjectOrWrapped>({ onSubmitData, formSchema, title }: {
	onSubmitData: (data: z.infer<SchemaType>) => Promise<void>;
	title: string;
	formSchema: SchemaType;
}) {
	const space = useCurrentSpace();

	const [open, setOpen] = useState(false);
	if (!space) {
		return <></>;
	}

	const onSubmit = async (data: z.infer<SchemaType>) => {
		toast.dismiss();
		try {
			setOpen(false);
			await onSubmitData(data);
			toast.success("Created successfully!");
		} catch (err) {
			toast.error("Failed to create");
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">{title}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{title}</DialogDescription>
				</DialogHeader>
				<AutoForm formSchema={formSchema} onSubmit={onSubmit}>
					<div className="modal-action">
						<DialogFooter>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</div>
				</AutoForm>
			</DialogContent>
		</Dialog>
	);
}
