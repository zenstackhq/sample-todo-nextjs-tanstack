import { List } from "@prisma/client";
import TimeInfo from "../../TimeInfo";

export function ListCard({ list }: {list: List;}) {

	return <>
		List
		<TimeInfo value={list} />
	</>;
}
