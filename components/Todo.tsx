import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeleteTodo, useUpdateTodo } from "@/zmodel/lib/hooks";
import { Todo, User } from "@prisma/client";
import { ChangeEvent } from "react";
import TimeInfo from "./TimeInfo";
import { UserAvatar } from "./UserAvatar";

type Props = {
	value: Todo & { owner: User; };
};

export default function TodoComponent({ value }: Props) {
	const { mutate: updateTodo } = useUpdateTodo({ optimisticUpdate: true });
	const { mutate: deleteTodo } = useDeleteTodo({ optimisticUpdate: true });

	const onDelete = () => {
		deleteTodo({ where: { id: value.id } });
	};

	const onToggleCompleted = (completed: boolean) => {
		if (completed === !!value.completedAt) {
			return;
		}
		updateTodo({
			where: { id: value.id },
			data: { completedAt: completed ? new Date() : null }
		});
	};

	return (
		<div className="flex w-full flex-col items-center rounded-lg border px-8 py-4 shadow-lg lg:w-[480px]">
			<div className="mb-4 flex w-full justify-between">
				<h3
					className={`line-clamp-1 flex items-center text-xl
                        ${value.completedAt ? "italic text-gray-400 line-through" : "text-gray-700"}
                    }`}
				>
					{value.title}
				</h3>
				<div className="flex">
					<input
						type="checkbox"
						className="checkbox mr-2"
						checked={!!value.completedAt}
						onChange={(e: ChangeEvent<HTMLInputElement>) => onToggleCompleted(e.currentTarget.checked)}
					/>
					<TrashIcon className="size-6 cursor-pointer text-gray-500" onClick={onDelete} />
				</div>
			</div>
			<div className="flex w-full justify-end space-x-2">
				<TimeInfo value={value} />
				<UserAvatar user={value.owner} size={18} />
			</div>
		</div>
	);
}
