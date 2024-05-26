import { useCurrentSpace } from "@lib/context";
import { List, Property, Dashboard } from "@prisma/client";
import Link from "next/link";

type Props = {
	list?: List;
	property?: Property;
	dashboard?: Dashboard;
};

export default function BreadCrumb({ list, property, dashboard }: Props) {
	const space = useCurrentSpace();
	if (!space) {
		return <></>;
	}

	const items: Array<{ text: string; link: string; }> = [];

	items.push({ text: "Home", link: "/" });
	items.push({ text: space.name || "", link: `/space/${space.slug}` });

	const baseLink = `/space/${space.slug}/`;
	if (list) {
		items.push({
			text: list.title,
			link: `${baseLink}list/${list.id}`
		});
	}

	if (property) {
		items.push({
			text: property.address,
			link: `${baseLink}property/${property.id}`
		});
	}

	if (dashboard) {
		items.push({
			text: dashboard.title,
			link: `${baseLink}dashboard/${dashboard.id}`
		});
	}

	return (
		<div className="text-sm text-gray-600 breadcrumbs">
			<ul>
				{items.map((item, i) =>
					<li key={i}>
						<Link href={item.link}>{item.text}</Link>
					</li>
				)}
			</ul>
		</div>
	);
}
