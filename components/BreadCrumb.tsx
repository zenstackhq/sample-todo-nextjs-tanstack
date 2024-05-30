import { useCurrentSpace } from "@/lib/context";
import { cn } from "@/lib/utils";
import { List, Property, Dashboard } from "@prisma/client";
import { ChevronRightIcon } from "@radix-ui/react-icons";
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

	return items.map((item, index) =>
		<>
			{index !== 0 && <ChevronRightIcon className="h-4 w-4" />}
			<Link
				href={item.link}
				className={cn(
					"font-medium",
					index === items.length - 1
						? "pointer-events-none text-foreground"
						: "text-muted-foreground"
				)}
			>
				{item.text}
			</Link>
		</>);
}
