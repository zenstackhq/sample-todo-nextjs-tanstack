import { useCurrentSpace, useCurrentSpaceComponent } from '@/lib/context';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getSpaceUrl } from '@/lib/urls';

export function TopBreadCrumb() {
    const space = useCurrentSpace();
    const spaceComponent = useCurrentSpaceComponent();

    const items: Array<{ text: string; link: string }> = [];

    if (space) {
        items.push({ text: space.name || '', link: getSpaceUrl(space.slug) });

        const baseLink = getSpaceUrl(space.slug);
        if (spaceComponent) {
            items.push({
                text: spaceComponent.name,
                link: `${baseLink}${spaceComponent.type}/${spaceComponent.id}`,
            });
        }
    }

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {items.slice(0, -1).map((item) => (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={item.link}>{item.text}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                ))}

                {items.length > 0 && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{items[items.length - 1].text}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
