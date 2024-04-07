import type { List, Space } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    space: Space;
    list?: List;
};

export default function BreadCrumb({ space, list }: Props) {
    const currPath = usePathname();

    const parts = currPath.split('/').filter((p) => p);
    const [base] = parts;
    if (base !== 'space') {
        return <></>;
    }

    const items: Array<{ text: string; link: string }> = [];

    items.push({ text: 'Home', link: '/' });
    items.push({ text: space.name || '', link: `/space/${space.slug}` });

    if (list) {
        items.push({
            text: list?.title || '',
            link: `/space/${space.slug}/${list.id}`,
        });
    }

    return (
        <div className="text-sm text-gray-600 breadcrumbs">
            <ul>
                {items.map((item, i) => (
                    <li key={i}>
                        <Link href={item.link}>{item.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
