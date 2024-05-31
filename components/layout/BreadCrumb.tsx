import { useCurrentSpace, useCurrentSpaceComponent } from "@/lib/context";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function BreadCrumb() {
	const space = useCurrentSpace();
	const spaceComponent = useCurrentSpaceComponent();
	if (!space) {
		return <></>;
	}

	const items: Array<{ text: string; link: string; }> = [];

	items.push({ text: "Home", link: "/" });
	items.push({ text: space.name || "", link: `/space/${space.slug}` });

	const baseLink = `/space/${space.slug}/`;
	if (spaceComponent) {
		items.push({
			text: spaceComponent.name,
			link: `${baseLink}${spaceComponent.type}/${spaceComponent.id}`
		});
	}

	return <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">{items.map((item, index) =>
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
		</>)}
	</div>;
}
