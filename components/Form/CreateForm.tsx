import { useCurrentSpace } from "@lib/context";
import { BaseSyntheticEvent, ReactElement } from "react";
import { FieldValues, FieldPath, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type FormField<T extends FieldValues> = {
	id: FieldPath<T>;
} & ({
	type: "checkbox" | "text" | "date" | "number";
} | {
	type: "select";
	values: Record<string, string>;
});

export function CreateForm<T extends FieldValues>({ children, onSubmitData, onClose, fields }: {
	children: ReactElement;
	onSubmitData: (data: T) => Promise<void>;
	onClose: () => void;
	fields: FormField<T>[];
}) {
	const space = useCurrentSpace();

	const { handleSubmit, register } = useForm<T>();

	if (!space) {
		return <></>;
	}
	const onSubmit = async (data: T, e?: BaseSyntheticEvent) => {
		e?.preventDefault();
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
		<>
			<h3 className="font-bold text-xl mb-8">Property</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col space-y-4">
					{fields.map(field => {
						const label = <label htmlFor={field.id} className="text-lg inline-block w-20">
							{field.id}
						</label>;
						const buildInput = () => {
							switch (field.type) {
								case "select":
									return <select
										required
										className="select select-bordered w-full max-w-xs mt-2"
										id={field.id}
										{...register(field.id)}
									>
										{Object.entries(field.values).map(([option, value]) => <option key={option} value={option}>{value}</option>)}
									</select>;
								case "text":
									return <input
										required
										id={field.id}
										placeholder={`placeholder_${field.id}`}
										className="input input-bordered w-full max-w-xs mt-2"
										{...register(field.id)}
									/>;
								case "checkbox":
									return <input
										type="checkbox"
										id={field.id}
										className="checkbox"
										{...register(field.id)}
									/>;
								case "date":
									return <input
										type="date"
										id={field.id}
										required
										className="input input-bordered w-full max-w-xs mt-2"
										{...register(field.id, { valueAsDate: true })}
									/>;
								case "number":
									return <input
										type="number"
										id={field.id}
										required
										className="input input-bordered w-full max-w-xs mt-2"
										{...register(field.id, { valueAsNumber: true })}
									/>;
								default:
									throw "unsupported type";
							}
						};
						return <div key={field.id} className="flex items-center">{label}{buildInput()}</div>;

					})}
				</div>
				{children}
			</form>
		</>
	);
}
