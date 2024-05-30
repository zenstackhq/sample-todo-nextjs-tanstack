import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";

export default function AutoFormDate({
	label,
	isRequired,
	fieldConfigItem,
	fieldProps
}: AutoFormInputComponentProps) {
	return (
		<FormItem>
			<AutoFormLabel
				label={fieldConfigItem?.label || label}
				isRequired={isRequired}
			/>
			<FormControl>
				<Input type={"date"} required {...fieldProps} />
			</FormControl>
			<AutoFormTooltip fieldConfigItem={fieldConfigItem} />

			<FormMessage />
		</FormItem>
	);
}
