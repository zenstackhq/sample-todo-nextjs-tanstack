import { LockClosedIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteList } from '@lib/hooks';
import type { List } from '@prisma/client';
import { customAlphabet } from 'nanoid';
import type { User } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from './Avatar';
import TimeInfo from './TimeInfo';

type Props = {
    value: List & { owner: User };
};

export default function TodoList({ value }: Props) {
    const currPath = usePathname();
    const { mutate: deleteList } = useDeleteList();

    const onDelete = () => {
        if (confirm('Are you sure to delete this list?')) {
            deleteList({ where: { id: value.id } });
        }
    };

    return (
        <div className="card w-80 bg-base-100 shadow-xl cursor-pointer hover:bg-gray-50">
            <Link href={`${currPath}/${value.id}`}>
                <figure>
                    <Image
                        src={`https://picsum.photos/300/200?r=${customAlphabet('0123456789')(4)}`}
                        className="rounded-t-2xl"
                        width={320}
                        height={200}
                        alt="Cover"
                    />
                </figure>
            </Link>
            <div className="card-body">
                <Link href={`${currPath}/${value.id}`}>
                    <h2 className="card-title line-clamp-1">{value.title || 'Missing Title'}</h2>
                </Link>
                <div className="card-actions flex w-full justify-between">
                    <div>
                        <TimeInfo value={value} />
                    </div>
                    <div className="flex space-x-2">
                        <Avatar user={value.owner} size={18} />
                        {value.private && (
                            <div className="tooltip" data-tip="Private">
                                <LockClosedIcon className="w-4 h-4 text-gray-500" />
                            </div>
                        )}
                        <TrashIcon className="w-4 h-4 text-gray-500 cursor-pointer" onClick={onDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
}
