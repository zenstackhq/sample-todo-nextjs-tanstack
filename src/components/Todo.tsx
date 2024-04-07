import { TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteTodo, useUpdateTodo } from '@lib/hooks';
import type { Todo, User } from '@prisma/client';
import type { ChangeEvent } from 'react';
import Avatar from './Avatar';
import TimeInfo from './TimeInfo';

type Props = {
    value: Todo & { owner: User };
    optimistic?: boolean;
};

export default function TodoComponent({ value, optimistic }: Props) {
    const { mutate: updateTodo } = useUpdateTodo({ optimisticUpdate: true }); // optimistic
    const { mutate: deleteTodo } = useDeleteTodo({ optimisticUpdate: true }); // optimistic

    const onDelete = () => {
        deleteTodo({ where: { id: value.id } });
    };

    const onToggleCompleted = (completed: boolean) => {
        if (completed === !!value.completedAt) {
            return;
        }
        updateTodo({
            where: { id: value.id },
            data: { completedAt: completed ? new Date() : null },
        });
    };

    return (
        <div className="border rounded-lg px-8 py-4 shadow-lg flex flex-col items-center w-full lg:w-[480px]">
            <div className="flex justify-between w-full mb-4">
                <h3
                    className={`text-xl line-clamp-1 flex items-center
                        ${value.completedAt ? 'line-through text-gray-400 italic' : 'text-gray-700'}
                    }`}
                >
                    {value.title}
                    {optimistic && <span className="loading loading-spinner loading-sm ml-1"></span>}
                </h3>
                <div className="flex">
                    <input
                        type="checkbox"
                        className="checkbox mr-2"
                        checked={!!value.completedAt}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onToggleCompleted(e.currentTarget.checked)}
                    />
                    <TrashIcon className="w-6 h-6 text-gray-500 cursor-pointer" onClick={onDelete} />
                </div>
            </div>
            <div className="flex justify-end w-full space-x-2">
                <TimeInfo value={value} />
                <Avatar user={value.owner} size={18} />
            </div>
        </div>
    );
}
