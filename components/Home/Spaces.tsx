import { useCountSpaceComponent } from "@/zmodel/lib/hooks";
import { Space } from "@prisma/client";
import Link from "next/link";

type Props = {
	spaces: Space[];
};

function SpaceItem({ space }: { space: Space; }) {
	const { data: spaceComponentCount } = useCountSpaceComponent({
		where: { spaceId: space.id }
	});
	return (
		<Link href={`/space/${space.slug}`}>
			<div className="w-full h-full flex relative justify-center items-center">
				<div className="badge badge-outline badge-accent badge-sm absolute top-4 right-4">{spaceComponentCount}</div>
				<div className="card-body" title={`${space.name} ${spaceComponentCount ? ": " + spaceComponentCount + " space component" : ""}`}>
					<h2 className="card-title line-clamp-1">{space.name}</h2>
				</div>
			</div>
		</Link>
	);
}

export function Spaces({ spaces }: Props) {
	return (
		<ul className="flex flex-wrap gap-4">
			{spaces?.map((space) =>
				<li
					className="card w-80 h-32 shadow-xl text-gray-600 cursor-pointer hover:bg-gray-50 border"
					key={space.id}
				>
					<SpaceItem space={space} />
				</li>
			)}
		</ul>
	);
}
