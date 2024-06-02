import { getSpaceUrl } from '@/lib/urls';
import { useCountSpaceComponent, useFindManySpace } from '@/zmodel/lib/hooks';
import { Space } from '@prisma/client';
import Link from 'next/link';

function SpaceItem({ space }: { space: Space }) {
    const { data: spaceComponentCount } = useCountSpaceComponent({
        where: { spaceId: space.id },
    });
    return (
        <Link href={getSpaceUrl(space.slug)}>
            <div className="relative flex size-full items-center justify-center">
                <div className="badge badge-outline badge-accent badge-sm absolute right-4 top-4">
                    {spaceComponentCount}
                </div>
                <div
                    className="card-body"
                    title={`${space.name} ${spaceComponentCount ? ': ' + spaceComponentCount + ' space component' : ''}`}
                >
                    <h2 className="card-title line-clamp-1">{space.name}</h2>
                </div>
            </div>
        </Link>
    );
}

export function Spaces() {
    const { data: spaces } = useFindManySpace();
    return (
        <ul className="flex flex-wrap gap-4">
            {spaces?.map((space) => (
                <li
                    className="card h-32 w-80 cursor-pointer border text-gray-600 shadow-xl hover:bg-gray-50"
                    key={space.id}
                >
                    <SpaceItem space={space} />
                </li>
            ))}
        </ul>
    );
}
