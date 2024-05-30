import { PlusIcon } from "@heroicons/react/24/outline";
import { useCurrentSpace } from "@/lib/context";
import { useCreateTodo, useFindUniqueList } from "@/lib/hooks";
import BreadCrumb from "@/components/BreadCrumb";
import TodoComponent from "components/Todo";
import WithNavBar from "components/WithNavBar";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useState } from "react";


export default function TodoList() {

	const space = useCurrentSpace();
	const router = useRouter();
	const { data: list } = useFindUniqueList(
		{
			where: {
				id: router.query.listId as string
			},
			include: {
				todos: {
					include: {
						owner: true
					},
					orderBy: {
						createdAt: "desc"
					}
				}
			}
		},
		{
			enabled: !!router.query.slug
		}
	);

	const [title, setTitle] = useState("");
	const { mutate: createTodo } = useCreateTodo({ optimisticUpdate: true });


	if (!space || !list) {
		return <></>;
	}


	const onCreateTodo = () => {
		if (!title) {
			return;
		}
		setTitle("");
		createTodo({
			data: {
				title,
				listId: list.id
			}
		});
	};


	return (
		<WithNavBar>
			<div className="px-8 py-2">
				<BreadCrumb list={list} />
			</div>
			<div className="container w-full flex flex-col items-center py-12 mx-auto">
				<h1 className="text-2xl font-semibold mb-4">{list?.title}</h1>
				<div className="flex space-x-2">
					<input
						type="text"
						placeholder="Type a title and press enter"
						className="input input-bordered w-72 max-w-xs mt-2"
						value={title}
						onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
							if (e.key === "Enter") {
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
					{list.todos?.map((todo) =>
						<TodoComponent key={todo.id} value={todo}  />
					)}
				</ul>
			</div>
		</WithNavBar>
	);
}
