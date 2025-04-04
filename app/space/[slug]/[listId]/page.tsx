'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import BreadCrumb from 'components/BreadCrumb';
import TodoComponent from 'components/Todo';
import WithNavBar from 'components/WithNavBar';
import { useCurrentSpace } from 'lib/context';
import { useCreateTodo, useFindManyTodo, useFindUniqueList } from 'lib/hooks';
import { useParams } from 'next/navigation';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

export default function TodoList() {
    const [title, setTitle] = useState('');
    const { mutate: createTodo } = useCreateTodo({ optimisticUpdate: true });
    const params = useParams<{ listId: string }>();
    const space = useCurrentSpace();

    const { data: list } = useFindUniqueList({ where: { id: params.listId } });

    const { data } = useFindManyTodo({
        where: { listId: params.listId },
        include: {
            owner: true,
        },
        orderBy: {
            createdAt: 'desc' as const,
        },
    });

    const onCreateTodo = () => {
        if (!title) {
            return;
        }
        setTitle('');
        createTodo({
            data: {
                title,
                list: { connect: { id: params.listId } },
            },
        });
    };

    if (!space || !list) {
        return <></>;
    }

    return (
        <WithNavBar>
            <div className="px-8 py-2">
                <BreadCrumb space={space} list={list} />
            </div>
            <div className="container w-full flex flex-col items-center py-12 mx-auto">
                <h1 className="text-2xl font-semibold mb-4">{list.title}</h1>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Type a title and press enter"
                        className="input input-bordered w-72 max-w-xs mt-2"
                        value={title}
                        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                onCreateTodo();
                            }
                        }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setTitle(e.currentTarget.value);
                        }}
                    />
                    <button onClick={() => onCreateTodo()}>
                        <PlusIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <ul className="flex flex-col space-y-4 py-8 w-11/12 md:w-auto">
                    {data?.map((todo) => (
                        <TodoComponent key={todo.id} value={todo} optimistic={todo.$optimistic} />
                    ))}
                </ul>
            </div>
        </WithNavBar>
    );
}
